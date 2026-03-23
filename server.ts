import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let prisma: PrismaClient | null = null;

function getPrisma() {
  if (!prisma) {
    const url = process.env.DATABASE_URL;
    if (!url || url.includes("localhost") || url.includes("password") || url.includes("mydb")) {
      if (!(global as any).prismaWarned) {
        console.warn("⚠️ DATABASE_URL não configurado. Funcionalidades do banco desabilitadas.");
        (global as any).prismaWarned = true;
      }
      return null;
    }
    prisma = new PrismaClient();
  }
  return prisma;
}

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // ───── Stories ─────
  app.get("/api/stories", async (req, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.json([]);
      const stories = await db.story.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
      });
      res.json(stories);
    } catch (error: any) {
      console.error("Erro ao buscar stories:", error.message);
      res.json([]);
    }
  });

  app.get("/api/admin/stories", async (req, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.json([]);
      const stories = await db.story.findMany({ orderBy: { createdAt: "desc" } });
      res.json(stories);
    } catch (error: any) {
      console.error("Erro ao buscar stories (admin):", error.message);
      res.status(500).json({ error: "Falha ao buscar histórias" });
    }
  });

  app.post("/api/admin/stories", async (req, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.status(503).json({ error: "Banco não configurado" });
      const { title, content, author, lang, published } = req.body;
      const story = await db.story.create({
        data: { title, content, author, lang: lang || "it", published: published ?? false },
      });
      res.json(story);
    } catch (error: any) {
      console.error("Erro ao criar story:", error.message);
      res.status(500).json({ error: error.message || "Falha ao criar história" });
    }
  });

  app.put("/api/admin/stories/:id", async (req, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.status(503).json({ error: "Banco não configurado" });
      const { title, content, author, lang, published } = req.body;
      const story = await db.story.update({
        where: { id: req.params.id },
        data: { title, content, author, lang, published },
      });
      res.json(story);
    } catch (error: any) {
      console.error("Erro ao atualizar story:", error.message);
      res.status(500).json({ error: error.message || "Falha ao atualizar história" });
    }
  });

  app.delete("/api/admin/stories/:id", async (req, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.status(503).json({ error: "Banco não configurado" });
      await db.story.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (error: any) {
      console.error("Erro ao deletar story:", error.message);
      res.status(500).json({ error: error.message || "Falha ao deletar história" });
    }
  });

  // ───── Settings ─────
  const fallbackSettings = {
    id: "global",
    companyName: "Moura",
    publicLang: "it",
    phone: "",
    email: "",
    address: "",
    instagram: "",
    facebook: "",
  };

  app.get("/api/settings", async (req, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.json(fallbackSettings);
      let settings = await db.settings.findUnique({ where: { id: "global" } });
      if (!settings) {
        settings = await db.settings.create({ data: { id: "global" } });
      }
      res.json(settings);
    } catch (error: any) {
      console.error("Erro ao buscar settings:", error.message);
      res.json(fallbackSettings);
    }
  });

  app.post("/api/settings", async (req, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.status(503).json({ error: "Banco não configurado" });
      const { companyName, publicLang, phone, email, address, instagram, facebook } = req.body;
      const settings = await db.settings.upsert({
        where: { id: "global" },
        update: { companyName, publicLang, phone, email, address, instagram, facebook },
        create: { id: "global", companyName, publicLang, phone, email, address, instagram, facebook },
      });
      res.json(settings);
    } catch (error: any) {
      console.error("Erro ao salvar settings:", error.message);
      res.status(500).json({ error: error.message || "Falha ao salvar configurações" });
    }
  });

  // ───── Contato público ─────
  app.post("/api/contact", async (req, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.status(503).json({ error: "Banco não configurado" });
      const { name, email, phone, message, lang } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Campos obrigatórios: nome, email, mensagem" });
      }
      const msg = await db.contactMessage.create({
        data: { name, email, phone, message, lang: lang || "it" },
      });
      res.json({ success: true, id: msg.id });
    } catch (error: any) {
      console.error("Erro ao salvar contato:", error.message);
      res.status(500).json({ error: error.message || "Falha ao enviar mensagem" });
    }
  });

  // ───── Mensagens admin ─────
  app.get("/api/admin/messages", async (req, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.json([]);
      const messages = await db.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
      res.json(messages);
    } catch (error: any) {
      console.error("Erro ao buscar mensagens:", error.message);
      res.status(500).json({ error: "Falha ao buscar mensagens" });
    }
  });

  app.put("/api/admin/messages/:id/read", async (req, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.status(503).json({ error: "Banco não configurado" });
      await db.contactMessage.update({ where: { id: req.params.id }, data: { read: true } });
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ───── Vite / Static ─────
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);

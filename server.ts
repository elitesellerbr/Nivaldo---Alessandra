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
        console.warn("⚠️ DATABASE_URL não configurado.");
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

  // Health
  app.get("/api/health", (_, res) => res.json({ status: "ok" }));

  // ── Settings (público) ──
  const fallback = {
    id: "global", companyName: "Moura", ownerName: "Nivaldo Moura Da Silva",
    publicLang: "it", phone: "328 064 2160", email: "", whatsapp: "3280642160",
    address: "Via Piacenza, 2 - Limbiate (MB)", vatNumber: "IT05142890960",
    instagram: "", facebook: "",
  };

  app.get("/api/settings", async (_, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.json(fallback);
      let s = await db.settings.findUnique({ where: { id: "global" } });
      if (!s) s = await db.settings.create({ data: { id: "global" } });
      res.json(s);
    } catch { res.json(fallback); }
  });

  app.post("/api/settings", async (req, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.status(503).json({ error: "DB não configurado" });
      const data = req.body;
      const s = await db.settings.upsert({
        where: { id: "global" }, update: data,
        create: { id: "global", ...data },
      });
      res.json(s);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── Pedido de orçamento (público) ──
  app.post("/api/quote", async (req, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.status(503).json({ error: "DB não configurado" });
      const { name, email, phone, address, serviceType, description, budget, lang } = req.body;
      if (!name || !phone || !serviceType) return res.status(400).json({ error: "Campos obrigatórios: nome, telefone, serviço" });
      const q = await db.quoteRequest.create({
        data: { name, email: email || "", phone, address: address || "", serviceType, description, budget, lang: lang || "it" },
      });
      res.json({ success: true, id: q.id });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── Admin: Orçamentos ──
  app.get("/api/admin/quotes", async (_, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.json([]);
      res.json(await db.quoteRequest.findMany({ orderBy: { createdAt: "desc" } }));
    } catch { res.json([]); }
  });

  app.put("/api/admin/quotes/:id", async (req, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.status(503).json({ error: "DB não configurado" });
      const { status, notes } = req.body;
      res.json(await db.quoteRequest.update({ where: { id: req.params.id }, data: { status, notes } }));
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.delete("/api/admin/quotes/:id", async (req, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.status(503).json({ error: "DB não configurado" });
      await db.quoteRequest.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── Contato ──
  app.post("/api/contact", async (req, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.status(503).json({ error: "DB não configurado" });
      const { name, email, phone, message, lang } = req.body;
      if (!name || !message) return res.status(400).json({ error: "Nome e mensagem obrigatórios" });
      await db.contactMessage.create({ data: { name, email: email || "", phone, message, lang: lang || "it" } });
      res.json({ success: true });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.get("/api/admin/messages", async (_, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.json([]);
      res.json(await db.contactMessage.findMany({ orderBy: { createdAt: "desc" } }));
    } catch { res.json([]); }
  });

  app.put("/api/admin/messages/:id/read", async (req, res) => {
    try {
      const db = getPrisma();
      if (!db) return res.status(503).json({ error: "DB não configurado" });
      await db.contactMessage.update({ where: { id: req.params.id }, data: { read: true } });
      res.json({ success: true });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── Vite / Static ──
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  app.listen(PORT, "0.0.0.0", () => console.log(`✅ Servidor em http://localhost:${PORT}`));
}

startServer().catch(console.error);

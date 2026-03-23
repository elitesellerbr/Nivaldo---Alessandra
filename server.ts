import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prisma = new PrismaClient();

// BigInt serialization fix
(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Stories CRUD
  app.get("/api/stories", async (req, res) => {
    try {
      const stories = await prisma.story.findMany({
        orderBy: { createdAt: 'desc' }
      });
      res.json(stories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stories" });
    }
  });

  app.post("/api/stories", async (req, res) => {
    try {
      const { title, content, author, createdAt } = req.body;
      const story = await prisma.story.create({
        data: { title, content, author, createdAt: BigInt(createdAt) }
      });
      res.json(story);
    } catch (error) {
      res.status(500).json({ error: "Failed to create story" });
    }
  });

  app.delete("/api/stories/:id", async (req, res) => {
    try {
      await prisma.story.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete story" });
    }
  });

  // Settings CRUD
  app.get("/api/settings", async (req, res) => {
    try {
      let settings = await prisma.settings.findUnique({ where: { id: "global" } });
      if (!settings) {
        settings = await prisma.settings.create({
          data: { id: "global", companyName: "My Company" }
        });
      }
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  app.post("/api/settings", async (req, res) => {
    try {
      const { publicLanguage, companyName } = req.body;
      const settings = await prisma.settings.upsert({
        where: { id: "global" },
        update: { publicLanguage, companyName },
        create: { id: "global", publicLanguage, companyName }
      });
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to update settings" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

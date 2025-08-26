import express, { Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // 👈 allow all origins for testing
    methods: ["GET", "POST"]
  }
});

interface JudgeScore {
  judge: "j1" | "j2" | "j3";
  side: "red" | "blue";
}

// Root endpoint (optional)
app.get("/", (_req: Request, res: Response) => {
  res.send("✅ Socket.IO + TypeScript server is running");
});

// Handle socket connections
io.on("connection", (socket: Socket) => {
  console.log("⚡ A client connected:", socket.id);

  // When a judge sends a score
  socket.on("judge-score", (data: JudgeScore) => {
    console.log("📩 Score received:", data);
    io.emit("judge-score", data); // broadcast to all clients
  });

  // Reset event
  socket.on("reset-scores", () => {
    console.log("🧹 Reset command received");
    io.emit("reset-scores");
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

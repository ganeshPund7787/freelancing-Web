import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

// Create HTTP server and initialize Socket.IO with CORS options
const server = http.createServer(app);
const FRONTEND_PORT = process.env.FRONTEND_URL as string;

const io = new Server(server, {
  cors: {
    origin: [FRONTEND_PORT], 
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store user socket IDs mapped by userId
const userSocketMap: Record<string, string> = {};

// Utility function to get the socket ID of a specific receiver
export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap[receiverId];
};

// Handle new socket connections
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId as string;

  // If a valid userId is provided, store the socket ID
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // Broadcast the list of online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    // Remove the disconnected user's socket ID from the map
    if (userId && userSocketMap[userId] === socket.id) {
      delete userSocketMap[userId];
    }

    // Broadcast the updated list of online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };

// dependencies
// 1> npm install express socket.io
// 2> npm install --save-dev @types/node @types/express @types/socket.io typescript ts-node

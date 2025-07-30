import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // The 9 Experiments platform uses local storage for persistence
  // No backend routes needed for core functionality
  
  // Optional: Add analytics or progress backup endpoints here
  
  const httpServer = createServer(app);
  return httpServer;
}

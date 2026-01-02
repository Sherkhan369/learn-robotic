import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { auth } from "./auth/better-auth-config";
import apiRouter from "./api";
import { testConnection, initializeDatabase } from "./config/database";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://sherkhan369.github.io/learn-robotic",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount Better Auth using the handler
app.use("/api/auth", auth.handler);

// Mount custom API routes
app.use("/api", apiRouter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Unhandled error:", error);
  res.status(500).json({ error: "Internal server error" });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection if URL is provided
    if (process.env.DATABASE_URL || process.env.NEON_DATABASE_URL) {
      const isConnected = await testConnection();
      if (!isConnected) {
        console.warn("Database connection failed, continuing without database");
      } else {
        // Initialize database tables
        await initializeDatabase();
        console.log("Database initialized successfully");
      }
    } else {
      console.log("No database URL provided, running in development mode");
    }

    // Start the server
    app.listen(PORT, () => {
      console.log(`Better Auth API server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`Better Auth endpoints available at /api/auth`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
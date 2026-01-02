import { Router } from "express";
import { authRoutes } from "./auth-routes";
import { personalizationRoutes } from "./personalization-routes";

export const apiRouter = Router();

// Mount authentication routes
apiRouter.use("/auth", authRoutes);

// Mount personalization routes
apiRouter.use("/personalization", personalizationRoutes);

// Health check endpoint
apiRouter.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

export default apiRouter;
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
  user?: any; // Better Auth user object
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // This middleware will be replaced by Better Auth's own session validation
  // For now, just pass through and let Better Auth handle it
  next();
};

// Middleware to check if user is authenticated
export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  // This middleware will be implemented after Better Auth integration
  // For now, just pass through
  next();
};

// Middleware to check specific user permissions
export const requireUser = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  // This middleware will be implemented after Better Auth integration
  // For now, just pass through
  next();
};
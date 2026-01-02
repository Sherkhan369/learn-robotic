/**
 * User model interface for the Robotic Book application
 * Represents a textbook user with authentication credentials and background information
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  authenticationMethod: string; // email/password, OAuth provider
  softwareBackgroundLevel: "beginner" | "intermediate" | "advanced";
  hardwareBackgroundLevel: "beginner" | "intermediate" | "advanced";
  lastLogin?: Date;
  isActive: boolean;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name?: string;
  softwareBackgroundLevel?: "beginner" | "intermediate" | "advanced";
  hardwareBackgroundLevel?: "beginner" | "intermediate" | "advanced";
}

export interface UpdateUserInput {
  name?: string;
  image?: string;
  softwareBackgroundLevel?: "beginner" | "intermediate" | "advanced";
  hardwareBackgroundLevel?: "beginner" | "intermediate" | "advanced";
}
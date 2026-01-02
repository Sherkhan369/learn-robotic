/**
 * UserBackground model for the Robotic Book application
 * Stores information about user's technical background using simple 3-tier levels
 */

export interface UserBackground {
  id: string;
  userId: string;
  softwareSkillLevel: "beginner" | "intermediate" | "advanced";
  hardwareSkillLevel: "beginner" | "intermediate" | "advanced";
  preferences?: Record<string, any>; // additional user preferences
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserBackgroundInput {
  userId: string;
  softwareSkillLevel: "beginner" | "intermediate" | "advanced";
  hardwareSkillLevel: "beginner" | "intermediate" | "advanced";
  preferences?: Record<string, any>;
}

export interface UpdateUserBackgroundInput {
  softwareSkillLevel?: "beginner" | "intermediate" | "advanced";
  hardwareSkillLevel?: "beginner" | "intermediate" | "advanced";
  preferences?: Record<string, any>;
}
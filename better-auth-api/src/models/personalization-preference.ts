/**
 * PersonalizationPreference model for the Robotic Book application
 * Stores user's content preference settings for each chapter/module
 */

export interface PersonalizationPreference {
  id: string;
  userId: string;
  chapterId: string;
  contentMode: "beginner" | "advanced" | "default";
  displayPreferences?: Record<string, any>; // display preferences
  lastUpdated: Date;
  createdAt: Date;
}

export interface CreatePersonalizationPreferenceInput {
  userId: string;
  chapterId: string;
  contentMode: "beginner" | "advanced" | "default";
  displayPreferences?: Record<string, any>;
}

export interface UpdatePersonalizationPreferenceInput {
  contentMode?: "beginner" | "advanced" | "default";
  displayPreferences?: Record<string, any>;
}
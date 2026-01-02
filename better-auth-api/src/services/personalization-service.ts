import { db } from "../config/database";
import {
  PersonalizationPreference,
  CreatePersonalizationPreferenceInput,
  UpdatePersonalizationPreferenceInput
} from "../models/personalization-preference";

/**
 * Get personalization preference for a specific user and chapter
 */
export const getPersonalizationPreference = async (
  userId: string,
  chapterId: string
): Promise<PersonalizationPreference | null> => {
  if (!db) {
    console.warn("Database not available, returning null for personalization preference");
    return null;
  }

  const query = `
    SELECT id, user_id as userId, chapter_id as chapterId, content_mode as contentMode,
           display_preferences as displayPreferences,
           created_at as createdAt, updated_at as updatedAt
    FROM personalization_preference
    WHERE user_id = $1 AND chapter_id = $2
  `;

  const result = await db.query(query, [userId, chapterId]);
  return result.rows[0] || null;
};

/**
 * Create a new personalization preference
 */
export const createPersonalizationPreference = async (
  input: CreatePersonalizationPreferenceInput
): Promise<PersonalizationPreference> => {
  if (!db) {
    console.warn("Database not available, returning mock personalization preference");
    // Return a mock object for development purposes
    return {
      id: "mock-id",
      userId: input.userId,
      chapterId: input.chapterId,
      contentMode: input.contentMode,
      displayPreferences: input.displayPreferences,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  const { userId, chapterId, contentMode, displayPreferences } = input;

  const query = `
    INSERT INTO personalization_preference (user_id, chapter_id, content_mode, display_preferences)
    VALUES ($1, $2, $3, $4)
    RETURNING id, user_id as userId, chapter_id as chapterId, content_mode as contentMode,
            display_preferences as displayPreferences,
            created_at as createdAt, updated_at as updatedAt
  `;

  const result = await db.query(query, [userId, chapterId, contentMode, displayPreferences]);
  return result.rows[0];
};

/**
 * Update personalization preference
 */
export const updatePersonalizationPreference = async (
  userId: string,
  chapterId: string,
  input: UpdatePersonalizationPreferenceInput
): Promise<PersonalizationPreference> => {
  if (!db) {
    console.warn("Database not available, returning mock updated personalization preference");
    // Return a mock object for development purposes
    return {
      id: "mock-id",
      userId,
      chapterId,
      contentMode: input.contentMode || "default",
      displayPreferences: input.displayPreferences || {},
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  const { contentMode, displayPreferences } = input;

  // Build dynamic query based on provided fields
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 3; // userId and chapterId are first two parameters

  if (contentMode) {
    fields.push(`content_mode = $${paramIndex}`);
    values.push(contentMode);
    paramIndex++;
  }

  if (displayPreferences) {
    fields.push(`display_preferences = $${paramIndex}`);
    values.push(displayPreferences);
    paramIndex++;
  }

  // Add updated_at and userId/chapterId to values
  fields.push(`updated_at = CURRENT_TIMESTAMP`);
  values.unshift(chapterId, userId); // userId and chapterId go first

  const query = `
    UPDATE personalization_preference
    SET ${fields.join(", ")}
    WHERE user_id = $1 AND chapter_id = $2
    RETURNING id, user_id as userId, chapter_id as chapterId, content_mode as contentMode,
            display_preferences as displayPreferences,
            created_at as createdAt, updated_at as updatedAt
  `;

  const result = await db.query(query, values);

  if (result.rows.length === 0) {
    // If no existing preference, create a new one
    return await createPersonalizationPreference({
      userId,
      chapterId,
      contentMode: contentMode || "default",
      displayPreferences: displayPreferences || {}
    });
  }

  return result.rows[0];
};

/**
 * Get all personalization preferences for a user
 */
export const getAllPersonalizationPreferences = async (
  userId: string
): Promise<PersonalizationPreference[]> => {
  if (!db) {
    console.warn("Database not available, returning empty array for personalization preferences");
    return []; // Return empty array for development purposes
  }

  const query = `
    SELECT id, user_id as userId, chapter_id as chapterId, content_mode as contentMode,
           display_preferences as displayPreferences,
           created_at as createdAt, updated_at as updatedAt
    FROM personalization_preference
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;

  const result = await db.query(query, [userId]);
  return result.rows;
};

/**
 * Create or update personalization preference
 */
export const upsertPersonalizationPreference = async (
  input: CreatePersonalizationPreferenceInput
): Promise<PersonalizationPreference> => {
  try {
    const existing = await getPersonalizationPreference(input.userId, input.chapterId);

    if (existing) {
      // Update existing preference
      return await updatePersonalizationPreference(input.userId, input.chapterId, {
        contentMode: input.contentMode,
        displayPreferences: input.displayPreferences
      });
    } else {
      // Create new preference
      return await createPersonalizationPreference(input);
    }
  } catch (error) {
    console.error("Error upserting personalization preference:", error);
    throw error;
  }
};
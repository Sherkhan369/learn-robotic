import { db } from "../config/database";
import { UserBackground, CreateUserBackgroundInput, UpdateUserBackgroundInput } from "../models/user-background";

/**
 * Create a new user background record
 */
export const createUserBackground = async (
  input: CreateUserBackgroundInput
): Promise<UserBackground> => {
  if (!db) {
    console.warn("Database not available, returning mock user background");
    // Return a mock object for development purposes
    return {
      id: "mock-id",
      userId: input.userId,
      softwareSkillLevel: input.softwareSkillLevel,
      hardwareSkillLevel: input.hardwareSkillLevel,
      preferences: input.preferences,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  const { userId, softwareSkillLevel, hardwareSkillLevel, preferences } = input;

  const query = `
    INSERT INTO user_background (user_id, software_skill_level, hardware_skill_level, preferences)
    VALUES ($1, $2, $3, $4)
    RETURNING id, user_id as userId, software_skill_level as softwareSkillLevel,
            hardware_skill_level as hardwareSkillLevel, preferences,
            created_at as createdAt, updated_at as updatedAt
  `;

  const result = await db.query(query, [userId, softwareSkillLevel, hardwareSkillLevel, preferences]);
  return result.rows[0];
};

/**
 * Get user background by user ID
 */
export const getUserBackground = async (userId: string): Promise<UserBackground | null> => {
  if (!db) {
    console.warn("Database not available, returning null for user background");
    return null;
  }

  const query = `
    SELECT id, user_id as userId, software_skill_level as softwareSkillLevel,
           hardware_skill_level as hardwareSkillLevel, preferences,
           created_at as createdAt, updated_at as updatedAt
    FROM user_background
    WHERE user_id = $1
  `;

  const result = await db.query(query, [userId]);
  return result.rows[0] || null;
};

/**
 * Update user background
 */
export const updateUserBackground = async (
  userId: string,
  input: UpdateUserBackgroundInput
): Promise<UserBackground> => {
  if (!db) {
    console.warn("Database not available, returning mock updated user background");
    // Return a mock object for development purposes
    return {
      id: "mock-id",
      userId,
      softwareSkillLevel: input.softwareSkillLevel || "beginner",
      hardwareSkillLevel: input.hardwareSkillLevel || "beginner",
      preferences: input.preferences,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  const { softwareSkillLevel, hardwareSkillLevel, preferences } = input;

  // Build dynamic query based on provided fields
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 2; // userId is first parameter

  if (softwareSkillLevel) {
    fields.push(`software_skill_level = $${paramIndex}`);
    values.push(softwareSkillLevel);
    paramIndex++;
  }

  if (hardwareSkillLevel) {
    fields.push(`hardware_skill_level = $${paramIndex}`);
    values.push(hardwareSkillLevel);
    paramIndex++;
  }

  if (preferences) {
    fields.push(`preferences = $${paramIndex}`);
    values.push(preferences);
    paramIndex++;
  }

  // Add updated_at and userId to values
  fields.push(`updated_at = CURRENT_TIMESTAMP`);
  values.unshift(userId); // userId goes first

  const query = `
    UPDATE user_background
    SET ${fields.join(", ")}
    WHERE user_id = $1
    RETURNING id, user_id as userId, software_skill_level as softwareSkillLevel,
            hardware_skill_level as hardwareSkillLevel, preferences,
            created_at as createdAt, updated_at as updatedAt
  `;

  const result = await db.query(query, values);

  if (result.rows.length === 0) {
    throw new Error("User background not found");
  }

  return result.rows[0];
};

/**
 * Create user background if it doesn't exist, otherwise update it
 */
export const upsertUserBackground = async (
  input: CreateUserBackgroundInput
): Promise<UserBackground> => {
  try {
    // Try to get existing background
    const existing = await getUserBackground(input.userId);

    if (existing) {
      // Update existing background
      return await updateUserBackground(input.userId, {
        softwareSkillLevel: input.softwareSkillLevel,
        hardwareSkillLevel: input.hardwareSkillLevel,
        preferences: input.preferences
      });
    } else {
      // Create new background
      return await createUserBackground(input);
    }
  } catch (error) {
    console.error("Error upserting user background:", error);
    throw error;
  }
};
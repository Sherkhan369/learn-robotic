import { Pool } from "@neondatabase/serverless";
import { env } from "process";

// Load environment variables
const DATABASE_URL = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;

// Create database connection pool
export const db = DATABASE_URL
  ? new Pool({
      connectionString: DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // Required for Neon serverless
      },
    })
  : null;

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  if (!DATABASE_URL) {
    console.warn("No database URL provided, skipping connection test");
    return true; // Return true in development when no database is configured
  }

  if (!db) {
    return false;
  }

  try {
    const client = await db.connect();
    await client.query("SELECT 1");
    client.release();
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
};

// Initialize database tables if needed
export const initializeDatabase = async (): Promise<void> => {
  if (!DATABASE_URL) {
    console.warn("No database URL provided, skipping database initialization");
    return;
  }

  if (!db) {
    throw new Error("Database not initialized");
  }

  try {
    const client = await db.connect();

    // Create user_background table
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_background (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES auth_user(id) ON DELETE CASCADE,
        software_skill_level VARCHAR(20) CHECK (software_skill_level IN ('beginner', 'intermediate', 'advanced')),
        hardware_skill_level VARCHAR(20) CHECK (hardware_skill_level IN ('beginner', 'intermediate', 'advanced')),
        preferences JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create personalization_preference table
    await client.query(`
      CREATE TABLE IF NOT EXISTS personalization_preference (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES auth_user(id) ON DELETE CASCADE,
        chapter_id VARCHAR(255),
        content_mode VARCHAR(20) CHECK (content_mode IN ('beginner', 'advanced', 'default')),
        display_preferences JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    client.release();
    console.log("Database tables initialized successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
};
import { betterAuth } from "better-auth";
import { env } from "process";

// Load environment variables
const DATABASE_URL = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET || "d1aa222832d22ee2e86e18968f7453a229501391eb26069390af23280c11e72b";

// Validate secret length (better-auth requires at least 32 characters)
if (!BETTER_AUTH_SECRET || BETTER_AUTH_SECRET.length < 32) {
  throw new Error("BETTER_AUTH_SECRET environment variable is required and must be at least 32 characters long");
}

// Use default database (SQLite) if no database URL is provided
export const auth = betterAuth({
  database: DATABASE_URL ? {
    url: DATABASE_URL,
    provider: "postgresql", // Use PostgreSQL if URL provided
  } : undefined, // Don't specify database for in-memory mode
  secret: BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
  },
  socialProviders: {
    // Configure OAuth providers if needed
    // google: {
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // },
  },
  user: {
    // Add custom fields to the user model
    additionalFields: {
      softwareBackgroundLevel: {
        type: "string",
        required: true,
        defaultValue: "beginner",
      },
      hardwareBackgroundLevel: {
        type: "string",
        required: true,
        defaultValue: "beginner",
      },
    }
  },
  session: {
    expiresIn: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  trustHostFromHeader: true, // Allow dynamic host determination from headers
});
import { Router } from "express";
import { authenticate, requireAuth, AuthenticatedRequest } from "../middleware/auth";
import {
  getPersonalizationPreference,
  updatePersonalizationPreference,
  getAllPersonalizationPreferences
} from "../services/personalization-service";

const router = Router();

// Get personalization settings for a specific chapter
router.get("/chapter/:chapterId", requireAuth, async (req, res) => {
  try {
    const authenticatedReq = req as AuthenticatedRequest;
    const user = authenticatedReq.user;
    const { chapterId } = req.params;

    const preference = await getPersonalizationPreference(user.id, chapterId);

    res.json({
      chapterId,
      defaultContentMode: "beginner", // Default for new users
      userContentMode: preference?.contentMode || null,
      contentVariations: {
        beginner: {},
        advanced: {}
      }
    });
  } catch (error) {
    console.error("Error getting chapter personalization:", error);
    res.status(500).json({ error: "Failed to get chapter personalization" });
  }
  return; // Ensure all code paths return a value
});

// Update personalization preferences for a specific chapter
router.put("/chapter/:chapterId", requireAuth, async (req, res) => {
  try {
    const authenticatedReq = req as AuthenticatedRequest;
    const user = authenticatedReq.user;
    const { chapterId } = req.params;
    const { contentMode, displayPreferences } = req.body;

    // Validate content mode
    const validModes = ["beginner", "advanced", "default"];
    if (contentMode && !validModes.includes(contentMode)) {
      return res.status(400).json({ error: "Invalid content mode provided" });
    }

    const updatedPreference = await updatePersonalizationPreference(user.id, chapterId, {
      contentMode: contentMode || "default",
      displayPreferences: displayPreferences || {}
    });

    res.json({
      preference: updatedPreference
    });
  } catch (error) {
    console.error("Error updating chapter personalization:", error);
    res.status(500).json({ error: "Failed to update chapter personalization" });
  }
  return; // Ensure all code paths return a value
});

// Get all personalization preferences for the current user
router.get("/preferences", requireAuth, async (req, res) => {
  try {
    const authenticatedReq = req as AuthenticatedRequest;
    const user = authenticatedReq.user;

    const preferences = await getAllPersonalizationPreferences(user.id);

    res.json({
      preferences
    });
  } catch (error) {
    console.error("Error getting personalization preferences:", error);
    res.status(500).json({ error: "Failed to get personalization preferences" });
  }
  return; // Ensure all code paths return a value
});

export { router as personalizationRoutes };
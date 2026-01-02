import { Router } from "express";
import { createUserBackground, getUserBackground, updateUserBackground } from "../services/user-background";
import { getUserProfile } from "../services/user-profile-service";
import { authenticate, requireAuth, AuthenticatedRequest } from "../middleware/auth";

const router = Router();

// Custom endpoints for user background and profile (Better Auth endpoints are handled separately)
router.get("/profile", requireAuth, async (req, res) => {
  try {
    const authenticatedReq = req as AuthenticatedRequest;
    const user = authenticatedReq.user;
    const profile = await getUserProfile(user.id);
    res.json(profile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

router.put("/background", requireAuth, async (req, res) => {
  try {
    const authenticatedReq = req as AuthenticatedRequest;
    const user = authenticatedReq.user;
    const { softwareBackgroundLevel, hardwareBackgroundLevel } = req.body;

    // Validate input
    const validLevels = ["beginner", "intermediate", "advanced"];
    if (!validLevels.includes(softwareBackgroundLevel) || !validLevels.includes(hardwareBackgroundLevel)) {
      return res.status(400).json({ error: "Invalid background level provided" });
    }

    const updatedBackground = await updateUserBackground(user.id, {
      softwareSkillLevel: softwareBackgroundLevel,
      hardwareSkillLevel: hardwareBackgroundLevel,
    });

    res.json({ userBackground: updatedBackground });
  } catch (error) {
    console.error("Error updating user background:", error);
    res.status(500).json({ error: "Failed to update user background" });
  }
  return; // Ensure all code paths return a value
});

router.get("/session", authenticate, async (req, res) => {
  try {
    const authenticatedReq = req as AuthenticatedRequest;
    if (!authenticatedReq.user) {
      return res.status(401).json({ error: "No active session" });
    }

    res.json({
      user: {
        id: authenticatedReq.user.id,
        email: authenticatedReq.user.email,
        name: authenticatedReq.user.name,
        softwareBackgroundLevel: authenticatedReq.user.softwareBackgroundLevel,
        hardwareBackgroundLevel: authenticatedReq.user.hardwareBackgroundLevel,
      },
      session: {
        token: req.headers.authorization?.split(" ")[1] || null,
        expiresAt: authenticatedReq.user.expiresAt ? authenticatedReq.user.expiresAt.toISOString() : null,
      }
    });
  } catch (error) {
    console.error("Error getting session:", error);
    res.status(500).json({ error: "Failed to get session information" });
  }
  return; // Ensure all code paths return a value
});

export { router as authRoutes };
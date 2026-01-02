import { getUserBackground } from "./user-background";

export interface UserProfile {
  user: {
    id: string;
    email: string;
    name?: string;
    registrationDate: Date;
    softwareBackgroundLevel: string;
    hardwareBackgroundLevel: string;
  };
  background: {
    id: string;
    softwareSkillLevel: "beginner" | "intermediate" | "advanced";
    hardwareSkillLevel: "beginner" | "intermediate" | "advanced";
    preferences?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}

/**
 * Get user profile including background information
 */
export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  try {
    // In a real implementation, this would fetch from your database
    // For now, we'll return a mock profile
    const mockUser = {
      id: userId,
      email: "user@example.com", // This would come from the database
      name: "Test User", // This would come from the database
      registrationDate: new Date(),
      softwareBackgroundLevel: "beginner", // This would come from the database
      hardwareBackgroundLevel: "beginner", // This would come from the database
    };

    // Get user background
    const background = await getUserBackground(userId);

    return {
      user: mockUser,
      background: background
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

/**
 * Update user profile information
 */
export const updateUserProfile = async (
  userId: string,
  updates: Partial<any>
): Promise<UserProfile> => {
  try {
    // In a real implementation, this would update the user in your database
    // For now, we'll just return the updated profile

    // Get updated profile
    return await getUserProfile(userId);
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
// User management and authentication service
import apiClient from "./api";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "viewer";
  status: "active" | "blocked" | "inactive";
  createdAt: string;
  lastLogin?: string;
  permissions: string[];
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  details: string;
  ipAddress: string;
}

class AuthenticationService {
  // Firebase login
  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("authToken", token);
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // Create new user
  async createUser(email: string, password: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("authToken", token);
      return userCredential.user;
    } catch (error) {
      console.error("User creation error:", error);
      throw error;
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(auth);
      localStorage.removeItem("authToken");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }

  // Get current user
  onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }

  // Get user list (admin only)
  async getUserList(limit: number = 100): Promise<AppUser[]> {
    try {
      const response = await apiClient.get("/users", { params: { limit } });
      return response.data;
    } catch (error) {
      console.error("Error fetching user list:", error);
      throw error;
    }
  }

  // Block/Unblock user
  async updateUserStatus(
    userId: string,
    status: "active" | "blocked" | "inactive",
  ): Promise<void> {
    try {
      await apiClient.patch(`/users/${userId}/status`, { status });
    } catch (error) {
      console.error("Error updating user status:", error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(userId: string): Promise<void> {
    try {
      await apiClient.delete(`/users/${userId}`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  // Get user activity logs
  async getUserActivityLogs(
    userId: string,
    limit: number = 100,
  ): Promise<UserActivity[]> {
    try {
      const response = await apiClient.get(`/users/${userId}/activity-logs`, {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user activity logs:", error);
      throw error;
    }
  }

  // Get all activity logs (admin only)
  async getAllActivityLogs(limit: number = 100): Promise<UserActivity[]> {
    try {
      const response = await apiClient.get("/activity-logs", {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching activity logs:", error);
      throw error;
    }
  }

  // Update user role
  async updateUserRole(
    userId: string,
    role: "admin" | "user" | "viewer",
  ): Promise<void> {
    try {
      await apiClient.patch(`/users/${userId}/role`, { role });
    } catch (error) {
      console.error("Error updating user role:", error);
      throw error;
    }
  }

  // Grant permissions
  async grantPermissions(userId: string, permissions: string[]): Promise<void> {
    try {
      await apiClient.post(`/users/${userId}/permissions/grant`, {
        permissions,
      });
    } catch (error) {
      console.error("Error granting permissions:", error);
      throw error;
    }
  }

  // Revoke permissions
  async revokePermissions(
    userId: string,
    permissions: string[],
  ): Promise<void> {
    try {
      await apiClient.post(`/users/${userId}/permissions/revoke`, {
        permissions,
      });
    } catch (error) {
      console.error("Error revoking permissions:", error);
      throw error;
    }
  }
}

export default new AuthenticationService();

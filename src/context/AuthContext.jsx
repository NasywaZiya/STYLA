import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { getProfile, updateProfile as apiUpdateProfile } from "../api/users";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [redirectPage, setRedirectPage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize session by verifying the token with the backend
  useEffect(() => {
    const initSession = async () => {
      const savedToken = localStorage.getItem("styla_token");

      if (savedToken) {
        try {
          // Verify token and fetch fresh user data
          setToken(savedToken);
          const userData = await getProfile();
          setUser(userData);
        } catch (error) {
          console.error("Session verification failed:", error);
          // Token is invalid or expired
          setUser(null);
          setToken(null);
          localStorage.removeItem("styla_token");
        }
      }
      setLoading(false);
    };

    initSession();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const data = response.data;
      const sessionUser = {
        user_id: data.user_id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      };

      setUser(sessionUser);
      setToken(data.token);
      localStorage.setItem("styla_token", data.token);

      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      return { success: false, message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      const data = response.data;
      const sessionUser = {
        user_id: data.user_id,
        name: data.name,
        email: data.email,
      };

      setUser(sessionUser);
      setToken(data.token);
      localStorage.setItem("styla_token", data.token);

      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Registration failed. Please try again.";
      return { success: false, message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("styla_token");
  };

  const updateProfile = async (updatedFields) => {
    if (!user) return { success: false, message: "Not authenticated" };

    try {
      // Send changes to the backend
      const updatedUser = await apiUpdateProfile(updatedFields);
      
      // Update local React state with the returned validated data
      setUser(prev => ({ ...prev, ...updatedUser }));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update profile";
      return { success: false, message };
    }
  };

  const openLogin = (targetPage = null) => {
    setRedirectPage(targetPage);
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
    setRedirectPage(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!user && !!token,
        isLoginOpen,
        redirectPage,
        loading,
        login,
        register,
        logout,
        updateProfile,
        openLogin,
        closeLogin,
        setRedirectPage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Authentication context for managing user login state in Teaching Team app.
// Provides login, logout, and user state using React Context with localStorage support.

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, DEFAULT_USERS } from "../types/User";

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => User | null;
  signout: () => void;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load users from localStorage or use default
    const storedUsers = localStorage.getItem("users");
    if (!storedUsers) {
      localStorage.setItem("users", JSON.stringify(DEFAULT_USERS));
      setUsers(DEFAULT_USERS);
    } else {
      setUsers(JSON.parse(storedUsers));
    }

    // Load current user session if available
    const User = localStorage.getItem("currentUser");
    if (User) {
      setCurrentUser(JSON.parse(User));
    }
  }, []);

  // Validate credentials and log in user
  const login = (email: string, password: string): User | null => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      return foundUser;
    } else {
      return null;
    }
  };

  // Clears the current user session
  const signout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, login, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to access authentication context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

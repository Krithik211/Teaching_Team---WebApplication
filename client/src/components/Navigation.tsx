// Navigation bar component for the Teaching Team app.
// Dynamically shows links based on props (Sign In/Up, Sign Out, or Home).

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router"; 

interface NavigationProps {
  showSignOut?: boolean;
  showHome?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ showSignOut = false, showHome = false }) => {
  const { signout } = useAuth();
  const router = useRouter();

  // Sign out and redirect to home
  const handleSignOut = () => {
    signout();
    console.log("current user: ", localStorage.getItem("currentUser"));
    router.push("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 fixed top-0 w-full z-50 shadow-md">
      <div className="flex justify-between items-center">
        
        {/* Logo and title (left side) */}
        <div className="flex items-center space-x-3">
          <img src="/images/logo3.png" alt="Logo" className="h-12 w-12 object-contain bg-gray-800 rounded" />
          <h1 className="text-xl font-bold">Teaching Team</h1>
        </div>

        {/* Conditional navigation links (right side) */}
        <div className="flex items-center space-x-6">
          {(!showSignOut && !showHome) && (
            <>
              <a href="#home" className="hover:underline">Home</a>
              <a href="#about" className="hover:underline">About</a>
              <Link
                href="/signIn"
                className="bg-white text-gray-800 px-3 py-1 rounded-full hover:bg-gray-300 font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/signUp"
                className="bg-white text-gray-800 px-3 py-1 rounded-full hover:bg-gray-300 font-medium"
              >
                Sign Up
              </Link>
            </>
          )}

          {(showSignOut && !showHome) && (
            <button
              onClick={handleSignOut}
              className="bg-white text-gray-800 px-3 py-1 rounded-full hover:bg-gray-300 font-medium"
            >
              Sign Out
            </button>
          )}

          {(showHome) && (
            <Link
              href="/"
              className="bg-white text-gray-800 px-3 py-1 rounded-full hover:bg-gray-300 font-medium"
            >
              Home
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

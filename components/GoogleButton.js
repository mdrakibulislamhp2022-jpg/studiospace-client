"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function GoogleButton({ callbackURL = "/" }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL,
      });

      if (error) {
        console.error("Google Sign-In Error:", error);
        toast.error(error.message || "Google Login failed.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Google Sign-In Exception:", error);
      toast.error(error.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="btn w-full border-base-300 bg-base-100"
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        <FcGoogle className="h-5 w-5" />
      )}
      Continue with Google
    </button>
  );
}

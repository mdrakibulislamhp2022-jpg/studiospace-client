"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

// Keeps the JWT cookie in step with the BetterAuth session:
// signed in -> issue a token, signed out -> remove it.
export default function AuthTokenSync() {
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (isPending) return;

    if (userId) {
      fetch("/api/token", { method: "POST" }).catch(() => {});
    } else {
      fetch("/api/token", { method: "DELETE" }).catch(() => {});
    }
  }, [userId, isPending]);

  return null;
}
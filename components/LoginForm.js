"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import GoogleButton from "./GoogleButton";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("redirect") || "/";
  const redirect = rawRedirect.startsWith("/") && !rawRedirect.startsWith("//") ? rawRedirect : "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!email || !password) {
      setFormError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const message = "Incorrect email or password. Please try again.";
      setFormError(message);
      toast.error(message);
      return;
    }

    toast.success("Welcome back to StudioSpace!");
    router.push(redirect);
    router.refresh();
  };

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {formError && (
          <div role="alert" className="alert alert-error alert-soft text-sm">
            {formError}
          </div>
        )}

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="input w-full"
          />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <button
              type="button"
              onClick={() => toast("Password reset is not available yet. Please contact support.")}
              className="text-sm font-medium underline-offset-2 hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Your password"
              className="input w-full pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="btn btn-ghost btn-sm btn-circle absolute right-2 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "Login"}
        </button>
      </form>

      <div className="divider text-sm">or</div>

      <GoogleButton callbackURL={redirect} />

      <p className="text-center text-sm">
        New to StudioSpace?{" "}
        <Link href="/register" className="font-semibold underline underline-offset-2">
          Create an account
        </Link>
      </p>
    </div>
  );
}
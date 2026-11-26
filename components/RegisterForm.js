"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff, FiCheckCircle, FiCircle } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { validatePassword, isValidUrl, isValidEmail } from "@/lib/validators";
import GoogleButton from "./GoogleButton";

const passwordRules = [
  { label: "At least 6 characters", test: (value) => value.length >= 6 },
  { label: "One uppercase letter", test: (value) => /[A-Z]/.test(value) },
  { label: "One lowercase letter", test: (value) => /[a-z]/.test(value) },
];

export default function RegisterForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const photoURL = String(form.get("photoURL") || "").trim();

    const nextErrors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) nextErrors.email = "Please enter your email address.";
    else if (!isValidEmail(email)) nextErrors.email = "Please enter a valid email address.";
    if (photoURL && !isValidUrl(photoURL)) {
      nextErrors.photoURL = "Please enter a valid image link starting with http or https.";
    }
    const passwordError = validatePassword(password);
    if (passwordError) nextErrors.password = passwordError;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error(Object.values(nextErrors)[0]);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoURL || undefined,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Could not create your account. Please try again.");
      return;
    }

    toast.success("Account created! Please log in to continue.");
    router.push("/login");
  };

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className="input w-full"
          />
          {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
        </div>

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
          {errors.email && <p className="mt-1 text-sm text-error">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="photoURL" className="mb-1 block text-sm font-medium">
            Photo URL
          </label>
          <input
            id="photoURL"
            name="photoURL"
            type="text"
            placeholder="https://example.com/your-photo.jpg"
            className="input w-full"
          />
          {errors.photoURL && <p className="mt-1 text-sm text-error">{errors.photoURL}</p>}
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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
          {errors.password && <p className="mt-1 text-sm text-error">{errors.password}</p>}
          <ul className="mt-3 space-y-1 text-sm">
            {passwordRules.map((rule) => {
              const passed = rule.test(password);
              return (
                <li
                  key={rule.label}
                  className={`flex items-center gap-2 ${passed ? "text-success" : "opacity-70"}`}
                >
                  {passed ? <FiCheckCircle /> : <FiCircle />}
                  {rule.label}
                </li>
              );
            })}
          </ul>
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "Register"}
        </button>
      </form>

      <div className="divider text-sm">or</div>

      <GoogleButton callbackURL="/" />

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold underline underline-offset-2">
          Login
        </Link>
      </p>
    </div>
  );
}
import { Suspense } from "react";
import AuthShell from "@/components/AuthShell";
import LoginForm from "@/components/LoginForm";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <AuthShell
      title="Login to your account"
      subtitle="Log in to book studios, manage your listings and track your bookings."
    >
      <Suspense fallback={<div className="skeleton h-80 w-full" />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
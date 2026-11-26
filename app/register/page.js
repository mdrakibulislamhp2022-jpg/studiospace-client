import AuthShell from "@/components/AuthShell";
import RegisterForm from "@/components/RegisterForm";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Join StudioSpace to book creative spaces or list your own studio."
    >
      <RegisterForm />
    </AuthShell>
  );
}
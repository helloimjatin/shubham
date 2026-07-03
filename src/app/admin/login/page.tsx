import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md">
        <h1 className="font-display text-3xl mb-2 text-center">Admin Login</h1>
        <p className="text-text-secondary text-sm text-center mb-8">
          Sign in to manage your studio website
        </p>
        <LoginForm />
      </div>
    </div>
  );
}

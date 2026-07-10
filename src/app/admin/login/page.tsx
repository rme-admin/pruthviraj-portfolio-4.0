import LoginForm from "@/components/admin/LoginForm";
import { Atom } from "lucide-react";

export const metadata = {
  title: "Admin Login | Portfolio",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#061a12] to-[#0b2d20]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <Atom size={28} className="text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">Admin Login</h1>
          <p className="text-sm text-emerald-400/50 mt-2">
            Sign in to manage portfolio content
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithMagicLink } = useAuthStore();
  const [email, setEmail] = useState("dr.harper@smiledental.com");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"password" | "magic">("password");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === "password") await login(email, password);
      else await loginWithMagicLink(email);
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "linear-gradient(180deg, #FBFBFD 0%, #F2F2F7 50%, #E8E8ED 100%)" }}>
      <div className="w-full max-w-[380px]">
        {/* Logo + title */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-[18px] bg-gradient-to-b from-[#0A84FF] to-[#0066CC] flex items-center justify-center shadow-lg mb-5">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
          </div>
          <h1 className="text-[28px] font-bold tracking-tighter text-[#1D1D1F]">InStock</h1>
          <p className="text-[15px] text-[#86868B] mt-1">Inventory management</p>
        </div>

        {/* Form card */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-[13px] font-medium text-[#6E6E73]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F5F5F7] rounded-[10px] px-4 py-3 text-[16px] text-[#1D1D1F] placeholder:text-[#C7C7CC] focus:outline-none focus:ring-[3px] focus:ring-[rgba(0,122,255,0.25)] transition-shadow"
                required
              />
            </div>

            {mode === "password" && (
              <div className="space-y-2">
                <label className="block text-[13px] font-medium text-[#6E6E73]">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F5F5F7] rounded-[10px] px-4 py-3 text-[16px] text-[#1D1D1F] placeholder:text-[#C7C7CC] focus:outline-none focus:ring-[3px] focus:ring-[rgba(0,122,255,0.25)] transition-shadow"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#0A84FF] to-[#0066CC] text-white font-semibold text-[16px] rounded-[10px] py-3 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,102,204,0.25)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.15),0_4px_16px_rgba(0,102,204,0.3)] active:scale-[0.98] transition-all disabled:opacity-40"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <><span>Sign In</span><ArrowRight size={16} /></>}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-[rgba(0,0,0,0.06)] text-center">
            <button
              type="button"
              onClick={() => setMode(mode === "password" ? "magic" : "password")}
              className="text-[14px] text-[#007AFF] hover:text-[#0066CC] font-medium transition-colors"
            >
              {mode === "password" ? "Use magic link instead" : "Use password instead"}
            </button>
          </div>
        </div>

        <p className="text-center text-[12px] text-[#AEAEB2] mt-8">
          Demo mode — any credentials work
        </p>
      </div>
    </div>
  );
}

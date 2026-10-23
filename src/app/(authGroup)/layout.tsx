import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-svh bg-[#f7faf7] text-[#173d2d] antialiased">
      {children}
    </div>
  );
}

import { Geist } from "next/font/google";
import { Toaster } from "sonner";

import { cn } from "@/lib/utils";
import Providers from "@/providers";
import DaanAIChatbot from "@/components/ai/daan-ai-chatbot";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", geist.variable)}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Toaster position="top-right" richColors />

        <Providers>
          {children}
        </Providers>

        {/* Daan AI Chatbot */}
        <DaanAIChatbot />
      </body>
    </html>
  );
}

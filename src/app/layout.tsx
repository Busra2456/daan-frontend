import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import "./globals.css";
import QueryProvider from "@/providers/query.provider";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-right" richColors />
        {/* Navbar */}
        <QueryProvider>{children}</QueryProvider>

        {/* Footer */}
      </body>
    </html>
  );
}

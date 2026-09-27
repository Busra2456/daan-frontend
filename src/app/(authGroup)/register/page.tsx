import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "../_components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col px-6 py-6 md:px-10 md:py-8">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/daanlogo.png"
              alt="Daan logo"
              width={42}
              height={42}
              className="rounded-full"
            />

            <div className="flex flex-col">
              <span className="text-lg font-bold leading-none">Daan</span>
              <span className="mt-1 text-xs text-muted-foreground">
                Donate with Trust
              </span>
            </div>
          </Link>
        </div>

        {/* Register Form */}
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <RegisterForm />
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          {new Date().getFullYear()} Daan. All rights reserved.
        </p>
      </div>

      {/* Right Side */}
      <div className="relative hidden overflow-hidden bg-muted lg:flex">
        {/* Background decoration */}
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-primary/10" />
        <div className="absolute -bottom-40 -left-40 size-[28rem] rounded-full bg-primary/10" />

        <div className="relative z-10 flex w-full flex-col items-center justify-center px-12 text-center">
          {/* Logo */}
          <div className="mb-8 rounded-3xl bg-background p-6 shadow-sm">
            <Image
              src="/daanlogo.png"
              alt="Daan logo"
              width={110}
              height={110}
              priority
            />
          </div>

          {/* Heading */}
          <h2 className="max-w-md text-4xl font-bold tracking-tight">
            Donate with Trust
          </h2>

          <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
            Daan connects generous donors with people who genuinely need support
            through a trusted and verified platform.
          </p>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-background px-4 py-3 shadow-sm">
              <p className="text-sm font-semibold">Verified</p>
              <p className="mt-1 text-xs text-muted-foreground">Requests</p>
            </div>

            <div className="rounded-xl bg-background px-4 py-3 shadow-sm">
              <p className="text-sm font-semibold">Trusted</p>
              <p className="mt-1 text-xs text-muted-foreground">Donations</p>
            </div>

            <div className="rounded-xl bg-background px-4 py-3 shadow-sm">
              <p className="text-sm font-semibold">Real</p>
              <p className="mt-1 text-xs text-muted-foreground">Stories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

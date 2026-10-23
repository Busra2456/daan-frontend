
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Heart,
  ShieldCheck,
  Mail,
  MapPin,
} from "lucide-react";

const footerLinks = {
  explore: [
    { label: "Home", href: "/" },
    { label: "Find a Cause", href: "/requests" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About Us", href: "/about" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Create an Account", href: "/register" },
    { label: "Log In", href: "/login" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-emerald-950/10 bg-[#fcfdfb] text-[#173d2d]">
      <div className="mx-auto max-w-[1440px] px-4 pb-6 pt-14 sm:px-6 lg:px-10 lg:pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand and mission */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="Daan homepage"
              className="inline-flex items-center gap-3"
            >
              <Image
                src="/daanlogo.png"
                alt="Daan logo"
                width={48}
                height={48}
                className="size-12 object-contain"
              />

              <span className="text-3xl font-black tracking-tight">
                daan<span className="text-emerald-600">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
              Donate with Trust. Daan connects people who want to help
              with people who need support, building a community where
              kindness can make a real difference.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
              <ShieldCheck className="size-4" />
              Giving with trust and care
            </div>
          </div>

          {/* Explore links */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[1.5px] text-[#173d2d]">
              Explore
            </h2>

            <ul className="mt-5 space-y-3.5">
              {footerLinks.explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 transition-colors hover:text-emerald-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[1.5px] text-[#173d2d]">
              Get Support
            </h2>

            <ul className="mt-5 space-y-3.5">
              {footerLinks.support.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 transition-colors hover:text-emerald-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Call to action */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[1.5px] text-[#173d2d]">
              Make a Difference
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              A small act of kindness can bring hope to someone who
              needs it. Explore requests and find a cause to support.
            </p>

            <Link
              href="/requests"
              className="group mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#145c40] px-5 text-sm font-bold text-white transition-all hover:bg-[#104a33]"
            >
              <Heart className="size-4" />
              Explore Requests
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/contact"
              className="mt-4 flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-emerald-700"
            >
              <Mail className="size-4 shrink-0" />
              Need help? Contact us
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-emerald-950/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-500">
            © {currentYear} Daan. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-xs font-medium text-slate-500">
            Made with
            <Heart className="size-3.5 fill-emerald-600 text-emerald-600" />
            for a kinder world
          </p>
        </div>
      </div>
    </footer>
  );
}

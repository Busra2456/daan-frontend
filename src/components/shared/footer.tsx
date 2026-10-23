
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Heart,
  ShieldCheck,
  Mail,
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
    <footer className="border-t border-[#dce8df] bg-[#fcfdfb] text-[#173d2d]">
      <div className="mx-auto max-w-[1440px] px-5 pb-7 pt-14 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20">
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
                width={52}
                height={52}
                className="size-[52px] object-contain"
              />

              <span className="text-3xl font-black tracking-tight text-[#123c2c]">
                daan<span className="text-emerald-600">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-base leading-8 text-[#52645a]">
              Donate with Trust. Daan connects people who want to help
              with people who need support, building a community where
              kindness can make a real difference.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#dce8df] bg-[#f0f7f1] px-4 py-2.5 text-sm font-semibold text-[#145c40]">
              <ShieldCheck className="size-5 shrink-0" />
              Giving with trust and care
            </div>
          </div>

          {/* Explore */}
          <div>
            <h2 className="text-base font-bold uppercase tracking-[1.2px] text-[#123c2c]">
              Explore
            </h2>

            <ul className="mt-5 space-y-4">
              {footerLinks.explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base font-medium text-[#52645a] transition-colors duration-200 hover:text-[#145c40]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h2 className="text-base font-bold uppercase tracking-[1.2px] text-[#123c2c]">
              Get Support
            </h2>

            <ul className="mt-5 space-y-4">
              {footerLinks.support.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base font-medium text-[#52645a] transition-colors duration-200 hover:text-[#145c40]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Call to action */}
          <div>
            <h2 className="text-base font-bold uppercase tracking-[1.2px] text-[#123c2c]">
              Make a Difference
            </h2>

            <p className="mt-5 text-base leading-8 text-[#52645a]">
              A small act of kindness can bring hope to someone who
              needs it. Explore requests and find a cause to support.
            </p>

            <Link
              href="/requests"
              className="group mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#145c40] px-5 text-base font-bold text-white transition-all duration-200 hover:bg-[#104a33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145c40] focus-visible:ring-offset-2"
            >
              <Heart className="size-5" />
              Explore Requests
              <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/contact"
              className="mt-5 flex items-center gap-2 text-base font-medium text-[#52645a] transition-colors duration-200 hover:text-[#145c40]"
            >
              <Mail className="size-5 shrink-0" />
              Need help? Contact us
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-[#dce8df] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-[#64746a]">
            © {currentYear} Daan. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-sm font-medium text-[#64746a]">
            Made with
            <Heart
              className="size-4 fill-emerald-600 text-emerald-600"
              aria-label="love"
            />
            for a kinder world
          </p>
        </div>
      </div>
    </footer>
  );
}

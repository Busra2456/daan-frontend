
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

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    symbol: "f",
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/",
    symbol: "𝕏",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/",
    symbol: "▶",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    symbol: "in",
  },
];

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

          {/* Explore links */}
          <div>
            <h2 className="text-base font-bold uppercase tracking-[1.2px] text-[#123c2c]">
              Explore
            </h2>

            <ul className="mt-5 space-y-4">
              {footerLinks.explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base font-medium text-[#52645a] transition-colors hover:text-[#145c40]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h2 className="text-base font-bold uppercase tracking-[1.2px] text-[#123c2c]">
              Get Support
            </h2>

            <ul className="mt-5 space-y-4">
              {footerLinks.support.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base font-medium text-[#52645a] transition-colors hover:text-[#145c40]"
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
              className="group mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#145c40] px-5 text-base font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#104a33] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145c40] focus-visible:ring-offset-2"
            >
              <Heart className="size-5" />
              Explore Requests
              <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <a
              href="mailto:YOUR_EMAIL@example.com"
              className="mt-5 flex items-center gap-2 text-base font-medium text-[#52645a] transition-colors hover:text-[#145c40]"
            >
              <Mail className="size-5 shrink-0" />
              Email Us
            </a>
          </div>
        </div>

        {/* Social media */}
        <div className="mt-12 flex flex-col gap-5 border-t border-[#dce8df] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#123c2c]">
              Connect with Daan
            </h2>

            <p className="mt-1 text-sm leading-6 text-[#64746a]">
              Follow our journey and help spread kindness.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Daan on ${social.name}`}
                title={social.name}
                className="flex size-11 items-center justify-center rounded-full border border-[#dce8df] bg-white text-[#315744] transition-all duration-200 hover:-translate-y-1 hover:border-[#145c40] hover:bg-[#145c40] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145c40] focus-visible:ring-offset-2"
              >
                <span
                  aria-hidden="true"
                  className={
                    social.name === "YouTube"
                      ? "flex size-6 items-center justify-center rounded-md text-base font-black"
                      : "text-base font-black"
                  }
                >
                  {social.symbol}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-4 border-t border-[#dce8df] pt-6 sm:flex-row sm:items-center sm:justify-between">
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

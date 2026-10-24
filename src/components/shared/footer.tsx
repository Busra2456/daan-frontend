import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Heart,
  Mail,
  ShieldCheck,
} from "lucide-react";

const navigation = {
  Explore: [
    { label: "Home", href: "/" },
    { label: "Find a Cause", href: "/requests" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About Daan", href: "/about" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Create an Account", href: "/register" },
    { label: "Log In", href: "/login" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    path: (
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.6 1.6-1.6h1.7V3.6c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.5v1.9H7v3.1h2.9v8h3.6Z" />
    ),
  },
  {
    name: "X",
    href: "https://x.com/",
    path: (
      <path d="M18.9 3H22l-6.8 7.8L23.2 21h-6.3l-4.9-6.4L6.4 21H3.2l7.3-8.4L2.8 3h6.5l4.4 5.9L18.9 3Zm-1.1 16h1.7L8.3 4.9H6.5L17.8 19Z" />
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/Busra2456",
    path: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 .9a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.77 2.03 3.43 1.54.1-.74.39-1.24.7-1.53-2.5-.29-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.13-1.45 3.07-1.15 3.07-1.15.62 1.55.23 2.69.12 2.98.72.79 1.15 1.79 1.15 3.02 0 4.33-2.63 5.28-5.14 5.56.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .9Z"
      />
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/hasna-hena-busra-586a69428/",
    path: (
      <path d="M6.5 8.5H3.2V21h3.3V8.5ZM4.9 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM21 13.8c0-3.8-2-5.6-4.7-5.6a4.1 4.1 0 0 0-3.7 2V8.5H9.3V21h3.3v-6.2c0-1.6.3-3.2 2.4-3.2s2.1 1.9 2.1 3.3V21h3.3l.6-7.2Z" />
    ),
  },
];

function SocialIcon({
  name,
  href,
  path,
}: {
  name: string;
  href: string;
  path: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit Daan on ${name}`}
      title={name}
      className="group flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:bg-emerald-400 hover:text-[#123c2c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#123c2c]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-[19px] fill-current"
      >
        {path}
      </svg>
    </a>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-[#123c2c] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 -z-10 size-[440px] rounded-full bg-emerald-400/[0.09] blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 size-[360px] rounded-full bg-emerald-600/[0.12] blur-[90px]"
      />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr] lg:gap-14 lg:py-20">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="Daan homepage"
              className="inline-flex items-center gap-3"
            >
              <Image
                src="/daanlogo.png"
                alt="Daan logo"
                width={50}
                height={50}
                className="size-[50px] object-contain"
              />
              <span className="text-3xl font-black tracking-tight text-white">
                daan<span className="text-emerald-400">.</span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-base leading-8 text-white/70">
              Donate with Trust. We connect people who need support
              with people who want to make a difference. Every act of
              kindness can help build a more caring community.
            </p>

            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-300/20 bg-emerald-400/[0.08] px-4 py-2.5 text-sm font-semibold text-emerald-200">
              <ShieldCheck className="size-5 shrink-0" />
              Giving with trust and care
            </div>
          </div>

          {/* Navigation */}
          {Object.entries(navigation).map(([heading, links]) => (
            <div key={heading}>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
                {heading}
              </h2>

              <ul className="mt-6 space-y-4">
                {links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center text-base leading-6 text-white/70 transition-colors duration-200 hover:text-emerald-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact and CTA */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
              Make a Difference
            </h2>

            <p className="mt-6 text-base leading-8 text-white/70">
              Your support can bring hope to someone facing a difficult
              time. Explore requests and discover where you can help.
            </p>

            <Link
              href="/requests"
              className="group mt-6 inline-flex min-h-[50px] items-center gap-2.5 rounded-full bg-emerald-400 px-5 text-base font-bold text-[#123c2c] transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#123c2c]"
            >
              Explore Requests
              <ArrowUpRight className="size-[18px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Replace with your real contact email */}
            <a
              href="mailto:YOUR_EMAIL@example.com"
              className="mt-6 flex items-center gap-3 text-base text-white/75 transition-colors hover:text-emerald-300"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.05]">
                <Mail className="size-[18px]" />
              </span>
              <span className="break-all">YOUR_EMAIL@example.com</span>
            </a>
          </div>
        </div>

        {/* Social links */}
        <div className="flex flex-col gap-6 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">
              Connect with Daan
            </h2>
            <p className="mt-1 text-sm leading-6 text-white/55">
              Follow our journey. Share kindness. Inspire hope.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <SocialIcon
                key={social.name}
                name={social.name}
                href={social.href}
                path={social.path}
              />
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Daan. All rights reserved.</p>

          <p className="flex items-center gap-2">
            Made with
            <Heart
              className="size-4 fill-emerald-400 text-emerald-400"
              aria-label="love"
            />
            <span>for a kinder world</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

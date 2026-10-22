
"use client";

import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
  UserRound,
  HandHeart,
  HelpCircle,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  CircleHelp,
} from "lucide-react";

const supportOptions = [
  {
    title: "Account Support",
    description:
      "Need help with registration, login, or accessing your Daan account? Start with your account.",
    icon: UserRound,
    link: "/login",
    linkText: "Go to Login",
  },
  {
    title: "Trust & Verification",
    description:
      "Learn how donation requests are reviewed so donors can make more informed decisions.",
    icon: ShieldCheck,
    link: "/how-it-works",
    linkText: "How It Works",
  },
  {
    title: "Donor Guidance",
    description:
      "Discover donation requests and learn how you can support people facing difficult situations.",
    icon: HandHeart,
    link: "/requests",
    linkText: "Find a Cause",
  },
  {
    title: "General Questions",
    description:
      "Learn about Daan's mission and our approach to connecting people through trusted giving.",
    icon: HelpCircle,
    link: "/about",
    linkText: "About Daan",
  },
];

const trustPoints = [
  "A focus on dignity and compassion",
  "A review process for donation requests",
  "A platform connecting donors with people in need",
];

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FAFAF5] text-[#173D2D]">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#E8F3E9] via-[#F8FAF4] to-[#F2F0E5]" />

        <div className="absolute -right-24 top-8 -z-10 h-72 w-72 rounded-full bg-[#C8E5CD]/50 blur-3xl" />

        <div className="absolute -left-24 bottom-0 -z-10 h-64 w-64 rounded-full bg-[#E3EEDC]/70 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:px-12">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C9DDCA] bg-white/80 px-4 py-2 text-sm font-semibold text-[#26734D] shadow-sm">
              <MessageCircle size={16} />
              We&aposre Here to Help
            </div>

            <h1 className="max-w-3xl text-4xl leading-tight font-bold tracking-tight text-[#153D2C] sm:text-5xl md:text-6xl">
              Let&apos make giving
              <span className="mt-1 block text-[#278052]">
                better together.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#587064] sm:text-lg">
              Have a question about Daan, need guidance using the platform, or
              want to understand how trusted giving works? Find the right
              resource and take your next step with confidence.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/how-it-works"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#176B45] px-6 py-3 font-semibold text-white shadow-lg shadow-[#176B45]/15 transition hover:-translate-y-0.5 hover:bg-[#115638]"
              >
                Explore How It Works
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#C8D9C9] bg-white/80 px-6 py-3 font-semibold text-[#244E39] transition hover:border-[#176B45] hover:bg-white"
              >
                Back to Home
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#567060]">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} className="text-[#278052]" />
                Compassion first
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} className="text-[#278052]" />
                Trust-focused giving
              </span>
            </div>
          </div>

          {/* Decorative Brand Card */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-[#D6E8D5]/60 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-7 shadow-2xl shadow-[#254B34]/10 sm:p-9">
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F4E8] text-[#23754A]">
                  <HeartHandshake size={27} />
                </div>

                <span className="rounded-full bg-[#EAF5E9] px-3 py-1.5 text-xs font-bold tracking-wide text-[#26734D]">
                  DAAN COMMUNITY
                </span>
              </div>

              <div className="mt-9">
                <p className="text-sm font-semibold tracking-wide text-[#638071]">
                  A LITTLE HELP CAN
                </p>

                <h2 className="mt-2 text-3xl leading-snug font-bold text-[#173D2D] sm:text-4xl">
                  Make a
                  <span className="block text-[#278052]">
                    meaningful difference.
                  </span>
                </h2>

                <p className="mt-4 leading-7 text-[#687D70]">
                  Behind every request is a person, a family, and a story that
                  deserves to be heard with dignity.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 rounded-2xl bg-[#F2F7EF] p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#278052] shadow-sm">
                  <HandHeart size={25} />
                </div>

                <div>
                  <p className="font-bold text-[#214B34]">
                    Give with understanding
                  </p>

                  <p className="mt-1 text-sm leading-5 text-[#6A8070]">
                    Learn about a person&apos situation before deciding to help.
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute -right-4 -bottom-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#176B45] text-white shadow-xl">
                <HeartHandshake size={30} />
              </div>
            </div>

            <div className="absolute -top-5 -right-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-white text-[#278052] shadow-lg sm:-right-5">
              <Sparkles size={25} />
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="px-5 py-20 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E7F2E6] px-4 py-2 text-sm font-semibold text-[#26734D]">
              <CircleHelp size={16} />
              How Can We Help?
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#173D2D] sm:text-4xl">
              Find the right place to start.
            </h2>

            <p className="mt-4 leading-7 text-[#687D70]">
              Choose the option that best matches what you need. Each resource
              will guide you to the relevant part of Daan.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {supportOptions.map((option) => {
              const Icon = option.icon;

              return (
                <article
                  key={option.title}
                  className="group flex h-full flex-col rounded-2xl border border-[#E0E9DD] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#B8D5BC] hover:shadow-xl hover:shadow-[#1A5034]/5 sm:p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF4E8] text-[#26764B] transition group-hover:bg-[#176B45] group-hover:text-white">
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#1A4932]">
                    {option.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-[#687D70]">
                    {option.description}
                  </p>

                  <Link
                    href={option.link}
                    className="mt-6 inline-flex items-center gap-2 border-t border-[#E8EEE5] pt-5 text-sm font-bold text-[#26764B] transition hover:text-[#124B30]"
                  >
                    {option.linkText}
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-5 pb-20 sm:px-8 md:pb-24 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#123D2D] px-6 py-12 text-white sm:px-10 sm:py-14 lg:px-14">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />

          <div className="absolute -right-8 -top-12 h-48 w-48 rounded-full border border-white/10" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#C7E8C8]">
                <ShieldCheck size={29} />
              </div>

              <h2 className="mt-6 max-w-xl text-3xl leading-tight font-bold sm:text-4xl">
                Trust, dignity, and compassion in every connection.
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-[#D0E1D4]">
                Daan aims to connect people who want to help with people who
                need support. Understanding the situation behind a request is
                an important step toward more thoughtful giving.
              </p>

              <Link
                href="/how-it-works"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#17452F] transition hover:bg-[#EAF4E8]"
              >
                Learn About Our Process
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <h3 className="text-lg font-bold">What Daan stands for</h3>

              <ul className="mt-6 space-y-5">
                {trustPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2
                      size={21}
                      className="mt-0.5 shrink-0 text-[#BDE6BF]"
                    />

                    <span className="leading-6 text-[#E0ECE2]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="border-t border-[#E5EDE1] bg-[#F0F5EB] px-5 py-16 sm:px-8 md:py-20 lg:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#26764B] shadow-sm">
            <HeartHandshake size={28} />
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#173D2D] sm:text-4xl">
            Ready to make a difference?
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-[#687D70]">
            Explore the causes shared on Daan and discover how thoughtful
            support can bring hope to someone who needs it.
          </p>

          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/requests"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#176B45] px-6 py-3 font-semibold text-white transition hover:bg-[#115638]"
            >
              Explore Donation Requests
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/register"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#C8D9C9] bg-white px-6 py-3 font-semibold text-[#244E39] transition hover:border-[#176B45]"
            >
              Join Daan
              <HeartHandshake size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

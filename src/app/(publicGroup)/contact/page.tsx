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
    <main className="min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/10 via-background to-amber-500/5"
        />

        <div
          aria-hidden="true"
          className="absolute -right-24 top-8 -z-10 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -left-24 bottom-0 -z-10 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-28">
          {/* Hero Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
              <MessageCircle size={16} aria-hidden="true" />
              We&apos;re Here to Help
            </div>

            <h1 className="max-w-3xl text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Let&apos;s make giving
              <span className="mt-1 block text-emerald-700 dark:text-emerald-400">
                better together.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Have a question about Daan, need guidance using the platform, or
              want to understand how trusted giving works? Find the right
              resource and take your next step with confidence.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/how-it-works"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg shadow-emerald-950/10 transition hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Explore How It Works
                <ArrowRight size={18} aria-hidden="true" />
              </Link>

              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-semibold text-card-foreground transition hover:-translate-y-0.5 hover:border-emerald-600/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Back to Home
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="shrink-0 text-emerald-700 dark:text-emerald-400"
                  aria-hidden="true"
                />
                Compassion first
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="shrink-0 text-emerald-700 dark:text-emerald-400"
                  aria-hidden="true"
                />
                Trust-focused giving
              </span>
            </div>
          </div>

          {/* Decorative Brand Card */}
          <div className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2.5rem] bg-emerald-500/10 blur-2xl"
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-7 text-card-foreground shadow-2xl shadow-emerald-950/10 sm:p-9">
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                  <HeartHandshake size={27} aria-hidden="true" />
                </div>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold tracking-wide text-emerald-800 dark:text-emerald-300">
                  DAAN COMMUNITY
                </span>
              </div>

              <div className="mt-9">
                <p className="text-sm font-semibold tracking-wide text-muted-foreground">
                  A LITTLE HELP CAN
                </p>

                <h2 className="mt-2 text-3xl leading-snug font-bold text-foreground sm:text-4xl">
                  Make a
                  <span className="block text-emerald-700 dark:text-emerald-400">
                    meaningful difference.
                  </span>
                </h2>

                <p className="mt-4 leading-7 text-muted-foreground">
                  Behind every request is a person, a family, and a story that
                  deserves to be heard with dignity.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-muted/60 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background text-emerald-700 shadow-sm dark:text-emerald-300">
                  <HandHeart size={25} aria-hidden="true" />
                </div>

                <div>
                  <p className="font-bold text-foreground">
                    Give with understanding
                  </p>

                  <p className="mt-1 text-sm leading-5 text-muted-foreground">
                    Learn about a person&apos;s situation before deciding to help.
                  </p>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-4 -right-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl"
              >
                <HeartHandshake size={30} />
              </div>
            </div>

            <div
              aria-hidden="true"
              className="absolute -right-3 -top-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card text-emerald-700 shadow-lg dark:text-emerald-300 sm:-right-5"
            >
              <Sparkles size={25} />
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="border-t border-border bg-muted/30 px-5 py-16 transition-colors duration-300 sm:px-8 sm:py-20 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/15 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
              <CircleHelp size={16} aria-hidden="true" />
              How Can We Help?
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Find the right place to start.
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
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
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-600/40 hover:shadow-xl hover:shadow-emerald-950/5 sm:p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 transition-colors group-hover:bg-primary group-hover:text-primary-foreground dark:text-emerald-300">
                    <Icon size={25} aria-hidden="true" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-foreground">
                    {option.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                    {option.description}
                  </p>

                  <Link
                    href={option.link}
                    className="mt-6 inline-flex items-center gap-2 border-t border-border pt-5 text-sm font-bold text-emerald-800 transition-colors hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-emerald-300 dark:hover:text-emerald-200"
                  >
                    {option.linkText}
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-emerald-950 px-6 py-12 text-white shadow-xl shadow-emerald-950/10 dark:bg-[#071b13] sm:px-10 sm:py-14 lg:px-14">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10"
          />

          <div
            aria-hidden="true"
            className="absolute -right-8 -top-12 h-48 w-48 rounded-full border border-white/10"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-emerald-200">
                <ShieldCheck size={29} aria-hidden="true" />
              </div>

              <h2 className="mt-6 max-w-xl text-3xl leading-tight font-bold text-white sm:text-4xl">
                Trust, dignity, and compassion in every connection.
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-emerald-50">
                Daan aims to connect people who want to help with people who
                need support. Understanding the situation behind a request is
                an important step toward more thoughtful giving.
              </p>

              <Link
                href="/how-it-works"
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-emerald-950 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
              >
                Learn About Our Process
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white">
                What Daan stands for
              </h3>

              <ul className="mt-6 space-y-5">
                {trustPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2
                      size={21}
                      className="mt-0.5 shrink-0 text-emerald-200"
                      aria-hidden="true"
                    />

                    <span className="leading-6 text-emerald-50">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="border-t border-border bg-muted/40 px-5 py-16 transition-colors duration-300 sm:px-8 sm:py-20 md:py-24 lg:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card text-emerald-700 shadow-sm dark:text-emerald-300">
            <HeartHandshake size={28} aria-hidden="true" />
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to make a difference?
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            Explore the causes shared on Daan and discover how thoughtful
            support can bring hope to someone who needs it.
          </p>

          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/requests"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Explore Donation Requests
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <Link
              href="/register"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-semibold text-card-foreground transition hover:border-emerald-600/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Join Daan
              <HeartHandshake size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

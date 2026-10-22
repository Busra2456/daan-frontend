
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  HeartHandshake,
  ShieldCheck,
  Users,
} from "lucide-react";

const values = [
  {
    icon: HeartHandshake,
    title: "Compassion First",
    description:
      "Every request represents a person and a real-life challenge. We believe people seeking support should be treated with dignity, empathy, and respect.",
  },
  {
    icon: ShieldCheck,
    title: "Thoughtful Verification",
    description:
      "Admins review submitted requests before marking them as verified, helping donors make more informed decisions about the support they choose to provide.",
  },
  {
    icon: Users,
    title: "People Connecting People",
    description:
      "Daan brings people seeking help and people willing to give together through a shared platform built around understanding and meaningful support.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative isolate border-b bg-gradient-to-br from-emerald-50 via-background to-background dark:from-emerald-950/30">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-20 -z-10 size-80 rounded-full bg-emerald-500/10 blur-3xl"
        />

        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
            <Heart size={16} aria-hidden="true" />
            About Daan
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            A Little Help Can Make a{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Meaningful Difference.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            Daan — Donate with Trust — aims to connect people facing
            difficult circumstances with people who are willing to help.
            We want every request to be understood, reviewed, and
            presented clearly so donors can make thoughtful decisions.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/requests"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              Explore Requests
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-6 py-3 font-semibold transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-12 lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            Our Story
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Behind Every Request Is a Human Story.
          </h2>

          <p className="mt-5 leading-8 text-muted-foreground">
            A person may need help with medical expenses, education,
            food, or other essential needs. Explaining that situation
            and finding someone willing to help can be difficult.
          </p>

          <p className="mt-4 leading-8 text-muted-foreground">
            Daan is designed to make that connection easier. People in
            need can submit requests with relevant details and supported
            media. Admins can review those requests, and donors can
            explore requests marked as verified before deciding whether
            to contribute.
          </p>

          <p className="mt-4 leading-8 text-muted-foreground">
            Our goal is simple: make the process of asking for help and
            offering support more understandable, respectful, and
            transparent.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-3xl bg-emerald-500/10 blur-xl" />

          <div className="relative rounded-3xl border border-emerald-600/15 bg-background p-7 shadow-sm sm:p-9">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              <HeartHandshake size={30} aria-hidden="true" />
            </div>

            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-300">
              The Daan Approach
            </p>

            <h3 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">
              From a shared need to a thoughtful act of giving.
            </h3>

            <div className="mt-7 space-y-5">
              {[
                {
                  number: "01",
                  title: "Share a need",
                  description:
                    "A person submits a request explaining their circumstances.",
                },
                {
                  number: "02",
                  title: "Review the request",
                  description:
                    "An admin reviews the information before verification.",
                },
                {
                  number: "03",
                  title: "Choose to help",
                  description:
                    "Donors review available details and decide whether to contribute.",
                },
              ].map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                    {step.number}
                  </div>

                  <div>
                    <h4 className="font-semibold">{step.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our values */}
      <section className="border-y bg-muted/20">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              What Guides Us
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              The Values Behind Daan.
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Our approach is built around respect for people,
              careful review, and informed giving.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="group rounded-2xl border border-border/70 bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg sm:p-8"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 transition-transform duration-300 group-hover:scale-110 dark:text-emerald-300">
                    <Icon size={25} aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-24">
        <div className="rounded-3xl border border-emerald-600/15 bg-emerald-500/5 px-6 py-10 sm:px-10 sm:py-14">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
            <Heart size={28} aria-hidden="true" />
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Kindness Starts with One Decision.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
            Whether you are looking for support or hoping to help
            someone, every meaningful connection starts with
            understanding another person&apos needs.
          </p>

          <Link
            href="/register"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            Get Started with Daan
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}

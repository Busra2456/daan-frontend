import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Share Your Situation",
    description:
      "A person in need submits a request with details about their circumstances, the support they need, and relevant photos or videos if supported.",
    icon: ClipboardList,
    label: "For people seeking help",
  },
  {
    number: "02",
    title: "Admin Reviews the Request",
    description:
      "An admin reviews the submitted information and decides whether to verify or reject the request. Verification is a review step, not a guarantee that every claim is true.",
    icon: ShieldCheck,
    label: "Review before verification",
  },
  {
    number: "03",
    title: "Donors Choose to Help",
    description:
      "Donors explore requests marked as verified, review the available details, and decide whether to contribute through the available donation process.",
    icon: HeartHandshake,
    label: "For people willing to give",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative isolate overflow-hidden border-y bg-gradient-to-b from-muted/40 via-background to-muted/20">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-20 -z-10 size-72 rounded-full bg-emerald-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 size-72 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 size={17} aria-hidden="true" />
            How Daan Works
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            From Asking for Help to{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Giving Hope.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Daan brings people seeking support and people willing to
            help together through a simple process built around review,
            understanding, and informed giving.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-12 grid gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {/* Connector line on desktop */}
          <div
            aria-hidden="true"
            className="absolute left-[17%] right-[17%] top-9 hidden border-t-2 border-dashed border-emerald-500/25 md:block"
          />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="group relative rounded-2xl border border-border/70 bg-background/95 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-900/5 sm:p-8"
              >
                <div className="relative flex items-center justify-between">
                  <div className="flex size-[4.5rem] items-center justify-center rounded-2xl border border-emerald-600/15 bg-emerald-500/10 text-emerald-700 transition-transform duration-300 group-hover:scale-105 dark:text-emerald-300">
                    <Icon size={30} aria-hidden="true" />
                  </div>

                  <span className="text-4xl font-black tracking-tight text-emerald-600/15 dark:text-emerald-400/20">
                    {step.number}
                  </span>
                </div>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                  {step.label}
                </p>

                <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  {step.description}
                </p>

                <div className="mt-7 h-1 w-12 rounded-full bg-emerald-500/50 transition-all duration-300 group-hover:w-20 group-hover:bg-emerald-500" />
              </article>
            );
          })}
        </div>

        {/* Closing message */}
        <div className="mt-10 rounded-2xl border border-emerald-600/15 bg-emerald-500/5 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                <HeartHandshake size={25} aria-hidden="true" />
              </div>

              <div>
                <h3 className="text-lg font-bold sm:text-xl">
                  Every act of giving starts with understanding.
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                  Explore available requests or create an account to
                  become part of the Daan community.
                </p>
              </div>
            </div>

            <Link
              href="/register"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              Get Started
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

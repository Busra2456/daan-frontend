import {
  ArrowRight,
  FileText,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

const trustPoints = [
  {
    number: "01",
    title: "Real Stories, Real Needs",
    description:
      "People in need can share their situation through written details and supporting photos or videos, helping donors understand why assistance is needed.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Reviewed Before Verification",
    description:
      "Admins review submitted requests before marking them as verified. This review process helps donors make informed decisions, although it cannot guarantee every claim is true.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Help That Makes a Difference",
    description:
      "Donors can explore verified requests, review the available information, and choose whether to contribute to someone's medical care, education, food, or essential needs.",
    icon: HeartHandshake,
  },
];

export default function WhyDaan() {
  return (
    <section className="relative isolate overflow-hidden border-y bg-gradient-to-b from-emerald-50/80 via-background to-background dark:from-emerald-950/20">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-20 -z-10 size-80 rounded-full bg-emerald-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 -z-10 size-80 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
            <HeartHandshake size={17} aria-hidden="true" />
            Why Daan
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Every Act of Kindness Begins with{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Trust.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Daan connects people who need help with people who can give it.
            We aim to make the journey from sharing a need to supporting
            someone more transparent and meaningful.
          </p>
        </div>

        {/* Trust cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-14">
          {trustPoints.map((point) => {
            const Icon = point.icon;

            return (
              <article
                key={point.number}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-background/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-900/5 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 transition-transform duration-300 group-hover:scale-110 dark:text-emerald-300">
                    <Icon size={27} aria-hidden="true" />
                  </div>

                  <span className="text-sm font-bold tracking-[0.2em] text-emerald-700/60 dark:text-emerald-300/60">
                    {point.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold tracking-tight sm:text-2xl">
                  {point.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  {point.description}
                </p>

                <div className="mt-7 h-1 w-12 rounded-full bg-emerald-500/50 transition-all duration-300 group-hover:w-20 group-hover:bg-emerald-500" />
              </article>
            );
          })}
        </div>

        {/* Real workflow */}
        <div className="mt-10 rounded-2xl border border-emerald-600/15 bg-emerald-500/5 p-6 sm:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-lg font-bold sm:text-xl">
                From asking for help to giving hope
              </p>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                A person submits a request. An admin reviews it. After
                verification, donors can explore the available details
                and decide whether to donate.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold sm:text-sm">
              <span className="rounded-lg border bg-background px-3 py-2.5">
                Submit Request
              </span>

              <ArrowRight
                size={16}
                className="shrink-0 text-emerald-600"
                aria-hidden="true"
              />

              <span className="rounded-lg border bg-background px-3 py-2.5">
                Admin Review
              </span>

              <ArrowRight
                size={16}
                className="shrink-0 text-emerald-600"
                aria-hidden="true"
              />

              <span className="rounded-lg border border-emerald-600/20 bg-emerald-500/10 px-3 py-2.5 text-emerald-800 dark:text-emerald-300">
                Donate
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


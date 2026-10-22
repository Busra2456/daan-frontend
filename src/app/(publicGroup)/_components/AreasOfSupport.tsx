import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  HeartPulse,
  House,
  Utensils,
} from "lucide-react";

const supportAreas = [
  {
    icon: HeartPulse,
    title: "Medical Support",
    description:
      "Help people facing medical expenses, treatment costs, or other health-related financial challenges.",
    label: "Care and treatment",
  },
  {
    icon: BookOpen,
    title: "Education Support",
    description:
      "Support people who need help with educational expenses, learning materials, or continuing their studies.",
    label: "Learning opportunities",
  },
  {
    icon: Utensils,
    title: "Food and Essentials",
    description:
      "Help people meet essential daily needs, including food and other necessities during difficult times.",
    label: "Everyday necessities",
  },
  {
    icon: House,
    title: "Family and Emergency Needs",
    description:
      "Offer support to individuals and families experiencing unexpected hardship or difficult life circumstances.",
    label: "Help during hardship",
  },
];

export default function AreasOfSupport() {
  return (
    <section className="relative isolate overflow-hidden border-y bg-muted/20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 -z-10 size-72 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        {/* Heading */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-emerald-600/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
              Ways to Make a Difference
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Different Needs.{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                One Caring Community.
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Every person&apos situation is different. From medical
              expenses to education and everyday necessities, Daan
              aims to connect people seeking support with people
              willing to help.
            </p>
          </div>

          <Link
            href="/requests"
            className="group inline-flex shrink-0 items-center gap-2 self-start font-semibold text-emerald-700 transition-colors hover:text-emerald-800 sm:self-auto dark:text-emerald-300 dark:hover:text-emerald-200"
          >
            View Donation Requests
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Support examples, not a filtering system */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {supportAreas.map((area) => {
            const Icon = area.icon;

            return (
              <article
                key={area.title}
                className="group flex h-full flex-col rounded-2xl border border-border/70 bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-13 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 transition-transform duration-300 group-hover:scale-110 dark:text-emerald-300">
                    <Icon size={26} aria-hidden="true" />
                  </div>

                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-600"
                  />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  {area.label}
                </p>

                <h3 className="mt-2 text-lg font-bold tracking-tight">
                  {area.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                  {area.description}
                </p>

                <Link
                  href="/requests"
                  aria-label={`Browse donation requests: ${area.title}`}
                  className="mt-6 inline-flex items-center gap-2 border-t border-border/70 pt-4 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-300"
                >
                  Browse Requests
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>

        {/* Honest feature note */}
        <p className="mt-6 text-sm leading-6 text-muted-foreground">
          These are examples of possible support needs, not separate
          request categories or filters. Available requests depend on
          the submissions received and reviewed on Daan.
        </p>
      </div>
    </section>
  );
}

import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  HandHeart,
} from "lucide-react";

const missionCards = [
  {
    title: "For People in Need",
    description:
      "Share your circumstances through a written request and supporting photos or videos, where supported, so reviewers and potential donors can better understand your needs.",
    icon: HandHeart,
  },
  {
    title: "For Those Who Give",
    description:
      "Explore requests marked as verified, review the available information, and decide whether you would like to contribute to someone's needs.",
    icon: HeartHandshake,
  },
];

export default function OurMission() {
  return (
    <section className="relative isolate overflow-hidden border-y bg-gradient-to-br from-background via-emerald-50/40 to-background dark:via-emerald-950/20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 -z-10 size-80 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-12 lg:py-24">
        {/* Mission introduction */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
            <HeartHandshake size={17} aria-hidden="true" />
            Our Mission
          </span>

          <h2 className="mt-6 max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Every Person Deserves to Be{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Heard and Helped.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            Behind every request is a person facing a real challenge.
            Daan aims to connect people who need support with people
            who are willing to give, helping make the process more
            personal, transparent, and meaningful.
          </p>

          <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">
            From submitting a request to admin review and donor support,
            our goal is to bring these steps together in one place while
            respecting everyone&apos dignity.
          </p>

          <Link
            href="/about"
            className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            Discover Our Mission
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Mission cards */}
        <div className="grid gap-5 sm:grid-cols-2">
          {missionCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className={`group rounded-2xl border border-border/70 bg-background/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg sm:p-7 ${
                  index === 0 ? "sm:mt-8" : ""
                }`}
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 transition-transform duration-300 group-hover:scale-110 dark:text-emerald-300">
                  <Icon size={25} aria-hidden="true" />
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {card.description}
                </p>
              </article>
            );
          })}

          {/* Shared purpose */}
          <div className="rounded-2xl border border-emerald-600/15 bg-emerald-500/5 p-6 sm:col-span-2 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              Our Shared Purpose
            </p>

            <h3 className="mt-3 text-xl font-bold sm:text-2xl">
              Turning compassion into meaningful action.
            </h3>

            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              A person submits a request, an admin reviews it, and
              donors can explore verified requests before deciding
              whether to help. Every contribution should be a thoughtful
              choice made with dignity and respect.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

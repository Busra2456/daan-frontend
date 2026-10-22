import {
  Heart,
  ShieldCheck,
  Users,
  HandHeart,
  CheckCircle2,
} from "lucide-react";

const principles = [
  {
    icon: Heart,
    number: "01",
    title: "Compassion Comes First",
    description:
      "Every request represents a real human situation. We believe people seeking help deserve empathy, dignity, and respectful treatment.",
    points: ["Respect every individual", "Listen without judgment"],
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Transparency and Responsibility",
    description:
      "Clear request information and a review process help donors make informed decisions about where and how they choose to contribute.",
    points: ["Review before verification", "Make informed decisions"],
  },
  {
    icon: Users,
    number: "03",
    title: "People Helping People",
    description:
      "Daan aims to connect people who need support with people willing to give, building a community around generosity and shared responsibility.",
    points: ["Connect needs with generosity", "Encourage thoughtful giving"],
  },
];

export default function OurPrinciples() {
  return (
    <section className="relative isolate overflow-hidden bg-muted/30">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-20 -z-10 size-72 rounded-full bg-emerald-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 size-72 rounded-full bg-teal-500/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            <HandHeart size={17} aria-hidden="true" />
            Our Principles
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Built Around{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Respect and Responsibility.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Meaningful giving starts with compassion, clear information,
            and respect for every person. These principles guide the
            experience we want Daan to provide.
          </p>
        </div>

        {/* Principle cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16">
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <article
                key={principle.number}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 transition-transform duration-300 group-hover:scale-110 dark:text-emerald-300">
                    <Icon size={27} aria-hidden="true" />
                  </div>

                  <span className="text-sm font-bold tracking-widest text-muted-foreground/50">
                    {principle.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold tracking-tight">
                  {principle.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                  {principle.description}
                </p>

                <div className="mt-6 space-y-3 border-t border-border/70 pt-5">
                  {principle.points.map((point) => (
                    <div key={point} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium">{point}</span>
                    </div>
                  ))}
                </div>

                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-emerald-500 transition-transform duration-300 group-hover:scale-x-100"
                />
              </article>
            );
          })}
        </div>

        {/* Closing message */}
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-emerald-600/15 bg-emerald-500/5 px-6 py-6 text-center sm:flex-row sm:justify-center sm:text-left">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
            <Heart size={20} aria-hidden="true" />
          </div>

          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            <span className="font-semibold text-foreground">
              Our shared belief:
            </span>{" "}
            Giving should be thoughtful, asking for help should be met
            with dignity, and every contribution should be a considered choice.
          </p>
        </div>
      </div>
    </section>
  );
}
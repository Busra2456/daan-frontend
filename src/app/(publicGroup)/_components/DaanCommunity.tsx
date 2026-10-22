import Link from "next/link";
import {
  ArrowRight,
  Heart,
  HeartHandshake,
  Users,
  ShieldCheck,
} from "lucide-react";

const communityValues = [
  {
    icon: Users,
    number: "01",
    title: "A Place for Everyone",
    description:
      "A respectful space for people to share their needs and for others to explore meaningful ways to help.",
  },
  {
    icon: Heart,
    number: "02",
    title: "Give with Compassion",
    description:
      "Make thoughtful decisions, understand each request, and choose how you want to contribute.",
  },
];

export default function DaanCommunity() {
  return (
    <section className="relative isolate overflow-hidden border-y border-emerald-900 bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 -z-10 size-80 rounded-full bg-emerald-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-20 -z-10 size-96 rounded-full bg-teal-400/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center lg:gap-16 lg:px-12 lg:py-24">
        {/* Community introduction */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-white/5 px-4 py-2 text-sm font-semibold text-emerald-200 backdrop-blur-sm">
            <HeartHandshake size={17} aria-hidden="true" />
            The Daan Community
          </div>

          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Every Person Deserves a Chance to Be{" "}
            <span className="text-emerald-300">Heard.</span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-emerald-50/75 sm:text-lg">
            Daan brings people seeking support and people willing to help
            into one community built on dignity, thoughtful giving, and
            responsible review.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/requests"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-3.5 font-semibold text-emerald-950 shadow-lg shadow-emerald-950/20 transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
            >
              Explore Requests
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
            >
              Discover Our Mission
            </Link>
          </div>

          <div className="mt-8 flex items-start gap-3 border-t border-white/10 pt-6">
            <ShieldCheck
              size={21}
              className="mt-0.5 shrink-0 text-emerald-300"
              aria-hidden="true"
            />
            <p className="max-w-md text-sm leading-6 text-emerald-50/65">
              Thoughtful giving begins with understanding. Review the
              available information before deciding to support a request.
            </p>
          </div>
        </div>

        {/* Community value cards */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          {communityValues.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.number}
                className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-white/[0.09] hover:shadow-xl sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-13 items-center justify-center rounded-xl border border-emerald-300/15 bg-emerald-300/10 text-emerald-200 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={26} aria-hidden="true" />
                  </div>

                  <span className="text-sm font-bold tracking-widest text-white/30">
                    {value.number}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold tracking-tight text-white">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-emerald-50/70">
                  {value.description}
                </p>

                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-emerald-300 transition-transform duration-300 group-hover:scale-x-100"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
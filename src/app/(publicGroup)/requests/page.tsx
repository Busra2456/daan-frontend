
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  HeartHandshake,
  ShieldCheck,
  Users,
  CheckCircle2,
  HandHeart,
  Sparkles,
} from "lucide-react";

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: "Verified Requests",
    description:
      "Every request goes through an admin review before being shared with donors.",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Users,
    title: "Understand Their Story",
    description:
      "Learn about a person's circumstances and needs before deciding how to help.",
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: HeartHandshake,
    title: "Give With Confidence",
    description:
      "Make thoughtful giving decisions based on the verified information available.",
    color: "bg-green-100 text-green-800",
  },
];

export default function RequestsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8FAF5] text-[#173B2A]">
      {/* Hero */}
      <section className="relative px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20">
        <div className="pointer-events-none absolute -right-28 -top-20 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-28 h-72 w-72 rounded-full bg-amber-100/70 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div className="text-center lg:text-left">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm lg:mx-0">
                <ShieldCheck className="h-4 w-4" />
                Verified Donation Requests
              </div>

              <h1 className="mx-auto mt-7 max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight text-[#173B2A] sm:text-5xl lg:mx-0 lg:text-6xl">
                Your kindness can{" "}
                <span className="relative inline-block text-emerald-600">
                  change a life.
                  <span className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-amber-300/80" />
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">
                Behind every request is a person, a family, and a story that
                deserves to be heard. Daan helps connect people in need with
                donors who want to make a meaningful difference.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  href="/login"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#17633C] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition duration-300 hover:-translate-y-1 hover:bg-[#104C2D] hover:shadow-xl"
                >
                  <Heart className="h-5 w-5" />
                  Login as Donor
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-7 py-4 text-sm font-bold text-[#17633C] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:bg-emerald-50"
                >
                  Discover How It Works
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-slate-600 lg:justify-start">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Admin-reviewed requests
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Informed giving
                </span>
              </div>
            </div>

            {/* Decorative brand illustration built with icons and CSS */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -right-3 top-8 h-24 w-24 rounded-full bg-amber-200/60 blur-2xl sm:-right-6" />
              <div className="absolute -bottom-4 -left-3 h-28 w-28 rounded-full bg-emerald-300/40 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-[#164E35] via-[#17633C] to-[#218653] p-7 shadow-2xl shadow-emerald-950/15 sm:p-10">
                <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full border border-white/10" />
                <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full border border-white/10" />

                <div className="relative flex min-h-[310px] flex-col justify-between sm:min-h-[340px]">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-amber-200 ring-1 ring-white/20">
                      <HandHeart className="h-7 w-7" />
                    </div>
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-emerald-50">
                      THE DAAN PROMISE
                    </span>
                  </div>

                  <div className="py-8">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-300 text-emerald-950">
                        <Heart className="h-6 w-6 fill-current" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-emerald-100">
                          A little help
                        </p>
                        <p className="text-lg font-bold text-white">
                          Can mean everything.
                        </p>
                      </div>
                    </div>

                    <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                      Give with trust.
                      <br />
                      <span className="text-amber-300">
                        Help with heart.
                      </span>
                    </h2>

                    <p className="mt-4 max-w-xs text-sm leading-7 text-emerald-50/90">
                      Every person deserves dignity, compassion, and the chance
                      to be heard.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-white/15 pt-5">
                    <div className="flex -space-x-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#17633C] bg-amber-200 text-emerald-900">
                        <Heart className="h-4 w-4" />
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#17633C] bg-emerald-100 text-emerald-800">
                        <HandHeart className="h-4 w-4" />
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#17633C] bg-white text-emerald-800">
                        <Users className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="text-xs leading-5 text-emerald-50">
                      <span className="block font-bold text-white">
                        People helping people
                      </span>
                      A community built on compassion
                    </p>
                    <Sparkles className="ml-auto h-5 w-5 shrink-0 text-amber-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust features */}
      <section className="border-y border-emerald-100 bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
              Why Daan?
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#173B2A] sm:text-4xl">
              Giving starts with trust.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Helping someone is a meaningful decision. We want you to make it
              with care, clarity, and confidence.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group rounded-2xl border border-emerald-100 bg-[#FCFDF9] p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/5 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color} transition duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="text-4xl font-black text-emerald-100">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-[#173B2A]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {feature.description}
                  </p>
                  <div className="mt-6 h-1 w-12 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-20" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#173B2A] px-6 py-12 text-center shadow-xl shadow-emerald-950/10 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-300 text-emerald-950 shadow-lg shadow-black/10">
              <HeartHandshake className="h-7 w-7" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Ready to make a difference?
            </h2>
            <p className="mt-4 leading-7 text-emerald-50/80">
              Sign in to explore the verified donation requests available to
              donors. Take time to understand each story and choose how you
              would like to help.
            </p>
            <Link
              href="/login"
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-300 px-7 py-4 text-sm font-extrabold text-emerald-950 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-amber-200"
            >
              Continue as a Donor
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

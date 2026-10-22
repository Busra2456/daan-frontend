
import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  Mail,
  MessageCircle,
  ShieldCheck,
  HandHeart,
  HelpCircle,
  Sparkles,
} from "lucide-react";

const contactOptions = [
  {
    icon: MessageCircle,
    title: "Platform Support",
    description:
      "Need help using Daan? Sign in to access the features available for your account.",
    action: "Go to Login",
    href: "/login",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Verification",
    description:
      "Learn how Daan reviews donation requests and helps donors make informed decisions.",
    action: "How It Works",
    href: "/how-it-works",
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: HelpCircle,
    title: "General Questions",
    description:
      "Discover Daan&apos;s mission, our approach to giving, and how the platform connects people.",
    action: "About Daan",
    href: "/about",
    color: "bg-green-100 text-green-800",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8FAF5] text-[#173B2A]">
      {/* Hero */}
      <section className="relative px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
        <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-24 h-72 w-72 rounded-full bg-amber-100/70 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#17633C] text-amber-200 shadow-lg shadow-emerald-900/15">
            <HeartHandshake className="h-8 w-8" />
          </div>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm">
            <Sparkles className="h-4 w-4" />
            We&apos;re Here to Help
          </div>

          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s make giving{" "}
            <span className="text-emerald-600">better together.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Have a question about Daan, need guidance using the platform, or
            want to understand how verified giving works? Explore the resources
            below to find the right next step.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/how-it-works"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#17633C] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition duration-300 hover:-translate-y-1 hover:bg-[#104C2D]"
            >
              Explore How It Works
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-6 py-3.5 text-sm font-bold text-[#17633C] transition duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:bg-emerald-50"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Contact options */}
      <section className="border-y border-emerald-100 bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
              How Can We Help?
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Find the right place to start.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Choose the option that best matches what you need.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {contactOptions.map((option) => {
              const Icon = option.icon;

              return (
                <article
                  key={option.title}
                  className="group flex flex-col rounded-2xl border border-emerald-100 bg-[#FCFDF9] p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/5 sm:p-8"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${option.color} transition duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#173B2A]">
                    {option.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {option.description}
                  </p>

                  <Link
                    href={option.href}
                    className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-900"
                  >
                    {option.action}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust banner */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#173B2A] px-6 py-12 shadow-xl shadow-emerald-950/10 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-12 h-64 w-64 rounded-full bg-amber-400/15 blur-3xl" />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-300 text-emerald-950">
              <HandHeart className="h-7 w-7" />
            </div>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Every act of kindness matters.
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-emerald-50/80">
              Daan is built around a simple idea: connect people who want to
              help with people who need support, with trust and dignity at the
              heart of every interaction.
            </p>

            <Link
              href="/requests"
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-300 px-6 py-3.5 text-sm font-extrabold text-emerald-950 transition duration-300 hover:-translate-y-1 hover:bg-amber-200"
            >
              Explore Donation Requests
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact note */}
      <section className="px-5 pb-12 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-start gap-4 rounded-2xl border border-emerald-100 bg-white p-5 sm:p-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
            <Mail className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-bold text-[#173B2A]">
              Need direct contact?
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Daan&apos;s direct email address and contact form are not listed
              here because no verified contact details have been configured on
              this page yet. We don&apos;t want to display incorrect contact
              information.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

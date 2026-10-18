
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Heart,
  HeartHandshake,
  HeartPulse,
  House,
  ShieldCheck,
  Sparkles,
  Utensils,
  Users,
  Video,
} from "lucide-react";

import HeroSlider from "./_components/HeroSlider";
import FeaturedRequests from "./_components/FeaturedRequests";

const trustPoints = [
  {
    number: "01",
    title: "Review Before Giving",
    description:
      "Administrators review requests before they are marked as verified.",
    icon: ShieldCheck,
  },
  {
    number: "02",
    title: "Understand the Need",
    description:
      "Read the available details and supporting media before deciding to help.",
    icon: HeartHandshake,
  },
  {
    number: "03",
    title: "Respect Every Story",
    description:
      "People can explain their circumstances in their own words and share supporting media.",
    icon: Video,
  },
];

const steps = [
  {
    number: "01",
    title: "Share Your Situation",
    description:
      "Create an account and explain your circumstances and the support you need.",
  },
  {
    number: "02",
    title: "Review and Verification",
    description:
      "An administrator reviews the submitted information and determines the request status.",
  },
  {
    number: "03",
    title: "Give with Understanding",
    description:
      "Donors explore verified requests, review the available details, and decide whether to contribute.",
  },
];

const categories = [
  {
    title: "Medical Support",
    description:
      "Help people seeking support for treatment and essential medical needs.",
    icon: HeartPulse,
  },
  {
    title: "Education",
    description:
      "Support learning materials, school expenses, and educational needs.",
    icon: BookOpen,
  },
  {
    title: "Food & Essentials",
    description:
      "Discover requests for food and everyday necessities.",
    icon: Utensils,
  },
  {
    title: "Shelter & Housing",
    description:
      "Explore requests involving essential living and housing needs.",
    icon: House,
  },
];

const values = [
  {
    title: "Dignity Comes First",
    description:
      "Every person deserves respect. Asking for help should never mean losing dignity.",
  },
  {
    title: "Transparency Matters",
    description:
      "Clear request information helps donors make more informed decisions.",
  },
  {
    title: "Accountability",
    description:
      "Review statuses help people understand where a request stands.",
  },
];

const faqs = [
  {
    question: "What is Daan?",
    answer:
      "Daan is a platform designed to connect people seeking support with donors who want to help.",
  },
  {
    question: "Can every request receive donations immediately?",
    answer:
      "No. Request availability depends on its current status and the platform's review process.",
  },
  {
    question: "How can I ask for help?",
    answer:
      "Create an account, sign in, and use the request creation feature available to your account.",
  },
  {
    question: "How can I learn more before donating?",
    answer:
      "Read the request details and available supporting media before deciding whether to contribute.",
  },
  {
    question: "Does verification guarantee every claim?",
    answer:
      "No. Verification reflects the platform's review process. Donors should still read the available information carefully.",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Featured verified requests from the API */}
      <FeaturedRequests />

      {/* 3. Trust points */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              Why Daan
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Giving Should Begin with Trust.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              A thoughtful review process helps people understand a request
              before deciding how to support it.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {trustPoints.map((point) => {
              const Icon = point.icon;

              return (
                <article
                  key={point.number}
                  className="rounded-2xl border bg-background p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                    <Icon size={24} aria-hidden="true" />
                  </div>

                  <p className="mt-6 text-xs font-semibold tracking-widest text-muted-foreground">
                    {point.number}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    {point.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {point.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Mission */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-12 lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            Our Mission
          </p>

          <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
            Make Generosity More Personal.
          </h2>

          <p className="mt-5 leading-8 text-muted-foreground">
            Everyone deserves dignity and an opportunity to be heard. Daan
            aims to connect people seeking support with donors who want to
            make thoughtful, informed decisions.
          </p>
        </div>

        <div className="rounded-2xl border bg-muted/20 p-7 sm:p-9">
          <HeartHandshake
            size={40}
            className="text-emerald-700 dark:text-emerald-300"
          />
          <h3 className="mt-5 text-xl font-bold">
            One platform. Two sides of kindness.
          </h3>
          <p className="mt-3 leading-7 text-muted-foreground">
            People can explain their needs, while donors can explore
            available information and choose how they want to help.
          </p>

          <Link
            href="/about"
            className="mt-5 inline-flex items-center gap-2 font-semibold text-emerald-700 hover:underline dark:text-emerald-300"
          >
            Learn About Daan
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* 5. How it works */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Three Steps Toward Meaningful Help.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border bg-background p-7 transition hover:shadow-md"
              >
                <p className="text-sm font-bold tracking-widest text-emerald-700 dark:text-emerald-300">
                  STEP {step.number}
                </p>
                <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Support categories */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              Areas of Support
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Different Needs. One Caring Community.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Explore common areas where people may seek assistance.
              Request availability depends on the information submitted
              to Daan.
            </p>
          </div>

          <Link
            href="/requests"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-emerald-700 hover:underline dark:text-emerald-300"
          >
            Browse Requests <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <article
                key={category.title}
                className="flex h-full flex-col rounded-2xl border bg-card p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                  <Icon size={25} />
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  {category.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                  {category.description}
                </p>

                <Link
                  href="/requests"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-300"
                >
                  Explore Requests <ArrowRight size={15} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* 7. For donors */}
      <section className="border-y bg-muted/20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center lg:px-12 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              For Donors
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Find a Cause That Matters to You.
            </h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              Explore available requests, review their details and current
              status, and decide whether you want to contribute. Choose
              thoughtfully and use the information available to you.
            </p>

            <Link
              href="/requests"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
            >
              Browse Requests <ArrowRight size={17} />
            </Link>
          </div>

          <div className="rounded-2xl border bg-background p-7 sm:p-10">
            <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              <ShieldCheck size={26} />
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Before You Contribute
            </h3>

            <div className="mt-6 space-y-5">
              {[
                "Read the request details",
                "Check the verification status",
                "Understand the intended support",
                "Use the secure payment process",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-300" />
                  <p className="text-sm font-medium leading-6">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. For people seeking help */}
      <section>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center lg:px-12 lg:py-24">
          <div className="rounded-2xl border bg-muted/20 p-7 sm:p-10">
            <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              <HeartHandshake size={26} />
            </div>

            <p className="mt-5 text-sm font-semibold text-muted-foreground">
              Your Story Deserves to Be Heard
            </p>

            <h3 className="mt-3 text-2xl font-bold">
              Explain What You Need.
            </h3>

            <p className="mt-4 leading-7 text-muted-foreground">
              Share relevant details about your circumstances and the
              support you are seeking. Your request will follow the
              platform&apos;s review process.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              For People Seeking Help
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Ask for Support with Dignity.
            </h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              Create an account to submit a request and follow its progress.
              Share accurate information and upload only media you have
              permission to share.
            </p>

            <Link
              href="/register"
              className="mt-7 inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold transition hover:bg-muted"
            >
              Create an Account <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Values */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              Our Principles
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Built Around Respect and Responsibility.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-2xl border bg-background p-6 transition hover:shadow-md"
              >
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Verification and safety */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="rounded-2xl border bg-background p-7 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              <ShieldCheck size={17} />
              A Careful Process
            </div>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Verification Helps Donors Make Informed Choices.
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              A verified status reflects the platform&apos;s review process.
              It does not guarantee every claim or outcome. Read the
              available details carefully before making a decision.
            </p>
          </div>

          <Link
            href="/how-it-works"
            className="mt-7 inline-flex shrink-0 items-center gap-2 rounded-xl border px-5 py-3 font-semibold transition hover:bg-muted lg:mt-0"
          >
            How It Works <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* 11. Community and shared purpose */}
      <section className="border-y bg-emerald-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-2 md:items-center lg:px-12 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              The Daan Community
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Every Person Deserves a Chance to Be Heard.
            </h2>
            <p className="mt-5 leading-8 text-white/75">
              Daan brings people seeking support and people willing to help
              into one community built on dignity, thoughtful giving and
              responsible review.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <Users size={28} className="text-emerald-300" />
              <h3 className="mt-4 text-lg font-semibold">For Everyone</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">
                A respectful place to share needs or explore ways to help.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <Heart size={28} className="text-emerald-300" />
              <h3 className="mt-4 text-lg font-semibold">Give Thoughtfully</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Make informed decisions using the information available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            FAQs
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Questions About Daan?
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Learn how requests, verification and giving work on Daan.
          </p>
        </div>

        <div className="mt-10 divide-y rounded-2xl border px-5 sm:px-6">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {faq.question}
                <span className="text-xl text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 pr-6 text-sm leading-7 text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 13. Final CTA */}
      <section className="border-t">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 lg:py-24">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
            <Sparkles size={28} />
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            Take the First Step
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
            A Little Kindness Can Mean a Lot.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted-foreground">
            Discover verified requests, learn about the people behind them,
            and make a thoughtful decision about how you can help.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/requests"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
            >
              Explore Requests <ArrowRight size={17} />
            </Link>

            <Link
              href="/register"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border px-6 py-3 font-semibold transition hover:bg-muted"
            >
              Join Daan
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

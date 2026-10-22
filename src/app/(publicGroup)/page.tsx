
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
import WhyDaan from "./_components/withTrust";
import OurMission from "./_components/OurMission";
import HowItWorks from "./how-it-works/page";
import AreasOfSupport from "./_components/AreasOfSupport";
import ForDonors from "./_components/ForDonors";
import ForNeedy from "./_components/ForNeedy";
import OurPrinciples from "./_components/OurPrinciples";
import VerificationNotice from "./_components/VerificationNotice";



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
     <WhyDaan />

      {/* 4. Mission */}
    <OurMission />

      {/* 5. How it works */}
      <HowItWorks />
 

      {/* 6. Support categories */}
     <AreasOfSupport />

      {/* 7. For donors */}
      <ForDonors />

      {/* 8. For people seeking help */}
      <ForNeedy />

      {/* 9. Values */}
     <OurPrinciples />

      {/* 10. Verification and safety */}
     <VerificationNotice />

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

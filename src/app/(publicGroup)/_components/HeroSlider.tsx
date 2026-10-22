"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Heart,
  HeartHandshake,
  Pause,
  Play,
  ShieldCheck,
  Stethoscope,
  Utensils,
} from "lucide-react";
const slides = [
  {
    category: "MEDICAL EMERGENCY",
    title: "Your kindness can save a life.",
    description:
      "Help struggling patients receive essential treatment, medicine, and compassionate care.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=85",
    icon: Stethoscope,
    accent: "Medical care for everyone",
  },
  {
    category: "FOOD & BASIC NEEDS",
    title: "No family should go hungry.",
    description:
      "Help vulnerable families access nutritious food and essential supplies.",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1920&q=85",
    icon: Utensils,
    accent: "Food and essential support",
  },
  {
    category: "EDUCATION SUPPORT",
    title: "Every child deserves to learn.",
    description:
      "Help children access books, school supplies, and educational opportunities.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=85",
    icon: BookOpen,
    accent: "A brighter future for children",
  },
  {
    category: "FAMILY SUPPORT",
    title: "Stand beside families in need.",
    description:
      "Support families facing poverty and difficult circumstances with dignity and care.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=85",
    icon: HeartHandshake,
    accent: "Hope for families in hardship",
  },
  {
    category: "DONATE WITH TRUST",
    title: "A little help can make a difference.",
    description:
      "Explore people's needs and make thoughtful giving decisions through Daan.",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1920&q=85",
    icon: Heart,
    accent: "Compassion with transparency",
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const activeSlide = slides[activeIndex];
  const ActiveIcon = activeSlide.icon;

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [paused]);

  const previousSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <section
      aria-label="Daan donation support"
      className="relative isolate min-h-[500px] overflow-hidden bg-slate-950 sm:min-h-[540px] lg:min-h-[580px]"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.category}
          aria-hidden="true"
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 motion-reduce:transition-none ${
            activeIndex === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url("${slide.image}")` }}
        />
      ))}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-emerald-500/15 blur-[90px]"
      />

      <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-center px-5 pb-24 pt-16 sm:min-h-[540px] sm:px-8 lg:min-h-[580px] lg:px-12">
        <div key={activeSlide.category} className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            Compassion with transparency
          </div>

          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300 sm:text-sm">
            <ActiveIcon className="h-5 w-5 shrink-0" />
            {activeSlide.category}
          </div>

          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {activeSlide.title}
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200 sm:text-base sm:leading-8">
            {activeSlide.description}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/requests"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-bold text-white transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Explore Requests
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/register"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Heart className="h-5 w-5" />
              Become a Donor
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/90 sm:text-sm">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              Administrative review
            </span>
            <span className="flex items-center gap-2">
              <HeartHandshake className="h-4 w-4 text-emerald-300" />
              Community support
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 pb-5 sm:px-8 sm:pb-7 lg:px-12">
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.category}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show slide ${index + 1}: ${slide.category}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all ${
                  activeIndex === index
                    ? "w-8 bg-emerald-400"
                    : "w-2.5 bg-white/50 hover:bg-white"
                }`}
              />
            ))}

            <span className="ml-2 whitespace-nowrap text-xs text-white/80 sm:text-sm">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-label={paused ? "Resume slider" : "Pause slider"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition hover:bg-white hover:text-slate-900 sm:h-10 sm:w-10"
            >
              {paused ? (
                <Play className="h-4 w-4" />
              ) : (
                <Pause className="h-4 w-4" />
              )}
            </button>

            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous slide"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition hover:bg-white hover:text-slate-900 sm:h-10 sm:w-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition hover:bg-white hover:text-slate-900 sm:h-10 sm:w-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
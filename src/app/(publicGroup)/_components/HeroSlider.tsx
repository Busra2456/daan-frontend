
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
  PlayCircle,
  ShieldCheck,
  Stethoscope,
  Utensils,
} from "lucide-react";

const slides = [
  {
    category: "MEDICAL EMERGENCY",
    title: "Your kindness can save a life.",
    description:
      "Help struggling patients get the medical treatment, medicine, and care they urgently need.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2000&q=85",
    icon: Stethoscope,
    accent: "Medical support",
  },
  {
    category: "FOOD & BASIC NEEDS",
    title: "No family should sleep hungry.",
    description:
      "Your donation can provide food, clean essentials, and hope to families facing difficult times.",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=2000&q=85",
    icon: Utensils,
    accent: "Food assistance",
  },
  {
    category: "EDUCATION FOR EVERY CHILD",
    title: "Give a child a brighter future.",
    description:
      "Support children who need books, school supplies, and an opportunity to continue learning.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=2000&q=85",
    icon: BookOpen,
    accent: "Education support",
  },
  {
    category: "HELP FAMILIES IN NEED",
    title: "A little help can change a life.",
    description:
      "Stand beside vulnerable families and help them move toward a safer, more hopeful future.",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=2000&q=85",
    icon: HeartHandshake,
    accent: "Family assistance",
  },
  {
    category: "DONATE WITH TRUST",
    title: "Know their story. Make a difference.",
    description:
      "Explore assistance requests, understand real needs, and support people through a transparent process.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2000&q=85",
    icon: Heart,
    accent: "Verified requests",
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];
  const ActiveIcon = activeSlide.icon;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, []);

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
      aria-label="Daan donation stories"
      className="relative isolate min-h-[620px] overflow-hidden bg-slate-950 sm:min-h-[660px] lg:min-h-[700px]"
    >
      {/* Background photo */}
      {slides.map((slide, index) => (
        <div
          key={slide.category}
          aria-hidden="true"
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            activeIndex === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url("${slide.image}")` }}
        />
      ))}

      {/* Dark overlay for readable text */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/15" />

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-500/15 blur-[100px]" />

      <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-5 pb-28 pt-24 sm:min-h-[660px] sm:px-8 lg:min-h-[700px] lg:px-12">
        <div className="max-w-3xl">
          {/* Trust label */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            <span>Compassion with transparency</span>
          </div>

          {/* Category */}
          <div
            key={`category-${activeIndex}`}
            className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300 sm:text-sm"
          >
            <ActiveIcon className="h-5 w-5" />
            {activeSlide.category}
          </div>

          {/* Headline */}
          <h1
            key={`title-${activeIndex}`}
            className="max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {activeSlide.title}
          </h1>

          <p
            key={`description-${activeIndex}`}
            className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg"
          >
            {activeSlide.description}
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/requests"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-7 py-4 font-bold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-400"
            >
              Explore Requests
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/register"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <Heart className="h-5 w-5" />
              Become a Donor
            </Link>
          </div>

          {/* Trust points */}
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/90">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              Verification process
            </span>
            <span className="flex items-center gap-2">
              <HeartHandshake className="h-4 w-4 text-emerald-300" />
              Direct support
            </span>
            <span className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4 text-emerald-300" />
              Real stories
            </span>
          </div>
        </div>
      </div>

      {/* Slider controls */}
      <div className="absolute bottom-7 left-5 right-5 z-10 flex items-center justify-between sm:bottom-9 sm:left-8 sm:right-8 lg:left-12 lg:right-12">
        <div className="flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.category}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show slide ${index + 1}: ${slide.category}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-10 bg-emerald-400"
                  : "w-2.5 bg-white/55 hover:bg-white"
              }`}
            />
          ))}
          <span className="ml-3 text-sm font-medium text-white/80">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition hover:bg-white hover:text-slate-900"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition hover:bg-white hover:text-slate-900"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

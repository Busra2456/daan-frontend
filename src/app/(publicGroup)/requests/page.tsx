"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownWideNarrow,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Heart,
  HeartHandshake,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { getVerifiedDonationRequests } from "@/api";

type DonationRequest = {
  id?: string;
  _id?: string;
  requestId?: string;
  title?: string;
  description?: string;
  requiredAmount?: number | string;
  situationImage?: string;
  situationVideo?: string;
  situationAudio?: string;
  createdAt?: string;
  verificationStatus?: string;
  status?: string;
  category?: string;
  location?: string;
};

const PAGE_SIZE = 6;

const money = (amount: number | string | undefined) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

function getRequestId(request: DonationRequest) {
  return request.id || request._id || request.requestId || "";
}

function getRequestImage(request: DonationRequest) {
  return request.situationImage || "";
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Something went wrong while loading requests.";
}

export default function VerifiedDonationRequestsPage() {
  const [requests, setRequests] = useState<DonationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Load real requests from the existing API.
  useMemo(() => {
    let cancelled = false;

    async function loadRequests() {
      try {
        setLoading(true);
        setError("");

        const response = await getVerifiedDonationRequests();

        // Supports common API response formats without adding fake data.
        const result = response as unknown as {
          data?: unknown;
          requests?: unknown;
        };

        const payload =
          result && typeof result === "object" && "data" in result
            ? result.data
            : result;

        const list = Array.isArray(payload)
          ? payload
          : payload &&
              typeof payload === "object" &&
              "requests" in payload &&
              Array.isArray((payload as { requests: unknown }).requests)
            ? (payload as { requests: unknown[] }).requests
            : result &&
                typeof result === "object" &&
                "requests" in result &&
                Array.isArray(result.requests)
              ? result.requests
              : [];

        if (!cancelled) {
          setRequests(list as DonationRequest[]);
        }
      } catch (err) {
        if (!cancelled) {
          setError(getErrorMessage(err));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadRequests();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredRequests = useMemo(() => {
    const term = search.trim().toLowerCase();

    const result = requests.filter((request) => {
      const text = `${request.title || ""} ${
        request.description || ""
      } ${request.category || ""} ${request.location || ""}`.toLowerCase();

      return text.includes(term);
    });

    return result.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      const amountA = Number(a.requiredAmount) || 0;
      const amountB = Number(b.requiredAmount) || 0;

      switch (sortBy) {
        case "oldest":
          return dateA - dateB;
        case "amount-low":
          return amountA - amountB;
        case "amount-high":
          return amountB - amountA;
        default:
          return dateB - dateA;
      }
    });
  }, [requests, search, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRequests.length / PAGE_SIZE),
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedRequests = filteredRequests.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  function updateSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function updateSort(value: string) {
    setSortBy(value);
    setCurrentPage(1);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b bg-gradient-to-br from-emerald-50 via-background to-teal-50 dark:from-emerald-950/40 dark:via-background dark:to-teal-950/20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 -z-10 size-96 rounded-full bg-emerald-500/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 -z-10 size-80 rounded-full bg-teal-500/10 blur-3xl"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:px-12 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
              <HeartHandshake size={17} aria-hidden="true" />
              DAAN — DONATE WITH TRUST
            </div>

            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Your kindness can{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                change a life.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              Behind every request is a person or family facing a real
              challenge. Explore admin-reviewed requests, understand
              their circumstances, and decide how you can help.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#verified-requests"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              >
                Explore Verified Requests
                <ArrowRight size={18} aria-hidden="true" />
              </a>

              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/80 px-6 py-3.5 font-semibold transition hover:bg-muted"
              >
                How Daan Works
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck
                  size={18}
                  className="text-emerald-600"
                  aria-hidden="true"
                />
                Admin-reviewed requests
              </span>
              <span className="inline-flex items-center gap-2">
                <Heart
                  size={18}
                  className="text-emerald-600"
                  aria-hidden="true"
                />
                Informed giving
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-emerald-900/10 bg-background p-2 shadow-xl shadow-emerald-950/10">
              <div className="relative min-h-[300px] overflow-hidden rounded-2xl bg-emerald-900 sm:min-h-[400px]">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=85"
                  alt="Community members supporting children"
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
                    THE DAAN PROMISE
                  </p>
                  <h2 className="mt-3 max-w-md text-3xl font-bold leading-tight sm:text-4xl">
                    A little help can mean everything.
                  </h2>
                  <p className="mt-3 max-w-md leading-7 text-white/85">
                    Give with trust. Help with heart. Respect every
                    person&apos;s dignity.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-border bg-background p-4 shadow-lg sm:flex">
              <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <ShieldCheck size={24} aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold">Giving starts with trust.</p>
                <p className="text-xs text-muted-foreground">
                  Review the available information
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Daan works */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
            SIMPLE. THOUGHTFUL. TRANSPARENT.
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Every act of giving starts with understanding.
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Daan brings people who need help closer to people who want
            to give, with an admin review step before requests are
            presented as verified.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Submit a Request",
              description:
                "A person in need shares their circumstances and explains what support they require.",
              icon: HeartHandshake,
            },
            {
              number: "02",
              title: "Admin Verification",
              description:
                "An administrator reviews the request before it is presented to donors as verified.",
              icon: ShieldCheck,
            },
            {
              number: "03",
              title: "Give With Care",
              description:
                "Donors review the available information and decide whether they want to contribute.",
              icon: Heart,
            },
          ].map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold tracking-widest text-emerald-600">
                    {step.number}
                  </span>
                  <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                </div>
                <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Verified requests */}
      <section
        id="verified-requests"
        className="scroll-mt-20 border-y bg-muted/30"
      >
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 size={15} aria-hidden="true" />
                ADMIN-REVIEWED REQUESTS
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Verified Donation Requests
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                Read each story, understand the need, and choose how
                you would like to make a difference.
              </p>
            </div>

            {!loading && !error && (
              <p className="text-sm text-muted-foreground">
                {filteredRequests.length}{" "}
                {filteredRequests.length === 1 ? "request" : "requests"}{" "}
                found
              </p>
            )}
          </div>

          {/* Search and sort */}
          <div className="mt-8 grid gap-3 rounded-2xl border border-border bg-background p-4 sm:p-5 md:grid-cols-[1fr_240px]">
            <div className="relative">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => updateSearch(event.target.value)}
                placeholder="Search by title, story, category or location..."
                aria-label="Search donation requests"
                className="h-12 w-full rounded-xl border border-input bg-background pl-11 pr-11 text-sm outline-none transition placeholder:text-muted-foreground focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => updateSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X size={17} aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="relative">
              <ArrowDownWideNarrow
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <select
                value={sortBy}
                onChange={(event) => updateSort(event.target.value)}
                aria-label="Sort donation requests"
                className="h-12 w-full appearance-none rounded-xl border border-input bg-background pl-10 pr-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="amount-low">Amount: Low to high</option>
                <option value="amount-high">Amount: High to low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="h-52 animate-pulse bg-muted" />
                  <div className="space-y-4 p-5">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                    <div className="h-10 animate-pulse rounded-xl bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="mt-8 rounded-2xl border border-destructive/30 bg-background px-6 py-10 text-center">
              <p className="text-lg font-semibold">
                We couldn&apos;t load donation requests.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Try Again
              </button>
            </div>
          ) : paginatedRequests.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-border bg-background px-6 py-14 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                {search ? (
                  <Search size={26} aria-hidden="true" />
                ) : (
                  <HeartHandshake size={26} aria-hidden="true" />
                )}
              </div>
              <h3 className="mt-5 text-xl font-bold">
                {search
                  ? "No matching requests found"
                  : "No verified requests available yet"}
              </h3>
              <p className="mx-auto mt-2 max-w-lg leading-7 text-muted-foreground">
                {search
                  ? "Try a different keyword to find a request."
                  : "When requests have been reviewed and verified by an administrator, they will appear here."}
              </p>
              {search && (
                <button
                  type="button"
                  onClick={() => updateSearch("")}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 font-semibold transition hover:bg-muted"
                >
                  <X size={17} aria-hidden="true" />
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedRequests.map((request) => {
                  const id = getRequestId(request);
                  const image = getRequestImage(request);

                  return (
                    <article
                      key={id || `${request.title}-${request.createdAt}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl"
                    >
                      <div className="relative h-52 overflow-hidden bg-muted">
                        {image ? (
                          <img
                            src={image}
                            alt={request.title || "Donation request"}
                            loading="lazy"
                            className="size-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex size-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-800 dark:from-emerald-950 dark:to-teal-950 dark:text-emerald-200">
                            <HeartHandshake size={42} aria-hidden="true" />
                            <span className="text-sm font-medium">
                              Every story matters
                            </span>
                          </div>
                        )}

                        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-background/95 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm dark:text-emerald-300">
                          <ShieldCheck size={14} aria-hidden="true" />
                          Verified
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="line-clamp-2 text-xl font-bold leading-snug">
                          {request.title || "Donation request"}
                        </h3>

                        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-muted-foreground">
                          {request.description ||
                            "Please view the request details to learn more about this situation."}
                        </p>

                        <div className="mt-5 rounded-xl bg-emerald-500/5 p-4">
                          <p className="text-xs font-medium text-muted-foreground">
                            Requested support
                          </p>
                          <p className="mt-1 text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                            {money(request.requiredAmount)}
                          </p>
                        </div>

                        {(request.situationVideo ||
                          request.situationAudio) && (
                          <p className="mt-3 text-xs text-muted-foreground">
                            Additional story media available
                          </p>
                        )}

                        <Link
                          href={
                            id
                              ? `/requests/${encodeURIComponent(id)}`
                              : "/login"
                          }
                          className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                        >
                          View Request
                          <ArrowRight
                            size={17}
                            aria-hidden="true"
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  aria-label="Donation request pagination"
                  className="mt-10 flex flex-wrap items-center justify-center gap-2"
                >
                  <button
                    type="button"
                    disabled={safePage === 1}
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    className="inline-flex h-10 items-center gap-1 rounded-lg border border-border bg-background px-3 text-sm font-medium transition hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                  >
                    <ChevronLeft size={17} aria-hidden="true" />
                    Previous
                  </button>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;

                    return (
                      <button
                        key={page}
                        type="button"
                        aria-label={`Go to page ${page}`}
                        aria-current={safePage === page ? "page" : undefined}
                        onClick={() => setCurrentPage(page)}
                        className={`size-10 rounded-lg border text-sm font-semibold transition ${
                          safePage === page
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-border bg-background hover:bg-muted"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    disabled={safePage === totalPages}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(totalPages, page + 1),
                      )
                    }
                    className="inline-flex h-10 items-center gap-1 rounded-lg border border-border bg-background px-3 text-sm font-medium transition hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                  >
                    Next
                    <ChevronRight size={17} aria-hidden="true" />
                  </button>
                </nav>
              )}

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Showing {(safePage - 1) * PAGE_SIZE + 1}–
                {Math.min(safePage * PAGE_SIZE, filteredRequests.length)} of{" "}
                {filteredRequests.length} requests
              </p>
            </>
          )}
        </div>
      </section>

      {/* The Daan promise */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="overflow-hidden rounded-3xl border border-emerald-600/15 bg-emerald-500/5 p-7 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                THE DAAN PROMISE
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                Giving starts with trust.
              </h2>
              <p className="mt-4 leading-8 text-muted-foreground">
                Every person deserves dignity, compassion, and the
                chance to be heard. We want donors to make informed
                decisions based on the information available.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {[
                {
                  title: "Verified Requests",
                  description:
                    "Requests are reviewed by an administrator before being marked verified.",
                },
                {
                  title: "Understand Their Story",
                  description:
                    "Review the circumstances and needs described in each request.",
                },
                {
                  title: "Give With Confidence",
                  description:
                    "Make a thoughtful choice using the information provided.",
                },
              ].map((item, index) => (
                <div key={item.title} className="rounded-2xl bg-background p-5">
                  <span className="text-sm font-bold text-emerald-600">
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
            <HeartHandshake size={28} aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Someone needs help. You can make a difference.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
            Take a moment to understand a person&apos;s situation.
            Even a thoughtful decision to help can bring hope.
          </p>
          <a
            href="#verified-requests"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
          >
            Explore Requests
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}


"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Heart,
  Menu,
  ShieldCheck,
  Sparkles,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getMeAction } from "@/api";
import { useLogoutAction } from "@/hooks/auth.hook";
import ThemeToggle from "@/components/theme-toggle";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Find a Cause", href: "/requests" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const roleDashboardMap = {
  ADMIN: "/admin-dashboard",
  DONOR: "/donor-dashboard",
  NEEDY: "/needy-dashboard",
} as const;

type UserRole = keyof typeof roleDashboardMap;

interface MeResponse {
  data?: {
    role?: UserRole;
  };
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useLogoutAction();

  const { data, isLoading, isError } = useQuery<MeResponse>({
    queryKey: ["me"],
    queryFn: getMeAction,
    staleTime: 60 * 1000,
    retry: false,
  });

  const role = isError ? undefined : data?.data?.role;
  const dashboardUrl = role ? roleDashboardMap[role] : undefined;
  const isLoggedIn = Boolean(dashboardUrl);

  const handleLogout = async () => {
    if (isPending) return;

    try {
      await mutateAsync();
      await queryClient.cancelQueries();
      queryClient.clear();

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderAuthActions = (mobile = false) => {
    if (isLoading) {
      return (
        <div
          aria-label="Loading account"
          className={
            mobile
              ? "h-12 w-full animate-pulse rounded-2xl bg-muted"
              : "h-12 w-32 animate-pulse rounded-full bg-muted"
          }
        />
      );
    }

    if (isLoggedIn && dashboardUrl) {
      return (
        <div
          className={
            mobile
              ? "flex flex-col gap-3"
              : "flex shrink-0 items-center gap-3"
          }
        >
          <Link
            href={dashboardUrl}
            className={`flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-secondary px-5 font-bold text-secondary-foreground transition-colors hover:bg-accent ${
              mobile ? "min-h-[52px] w-full rounded-2xl text-base" : "text-sm"
            }`}
          >
            <LayoutDashboard className="size-[18px] shrink-0" />
            <span>Dashboard</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isPending}
            className={`flex min-h-12 items-center justify-center gap-2 rounded-full border border-rose-300 bg-rose-50 px-5 font-bold text-rose-800 transition-colors hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-200 dark:hover:bg-rose-900/60 ${
              mobile ? "min-h-[52px] w-full rounded-2xl text-base" : "text-sm"
            }`}
          >
            <LogOut className="size-[18px] shrink-0" />
            <span>{isPending ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      );
    }

    return (
      <div
        className={
          mobile
            ? "flex flex-col gap-3"
            : "flex shrink-0 items-center gap-3"
        }
      >
        <Link
          href="/login"
          className={`flex min-h-12 items-center justify-center rounded-full border border-border px-5 font-bold text-foreground transition-colors hover:bg-accent ${
            mobile ? "min-h-[52px] rounded-2xl text-base" : "text-sm"
          }`}
        >
          Log in
        </Link>

        <Link
          href="/register"
          className={`group flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 font-bold text-primary-foreground shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
            mobile ? "min-h-[52px] rounded-2xl text-base" : "text-sm"
          }`}
        >
          <Heart className="size-[18px] shrink-0" />
          <span>{mobile ? "Get Started" : "Donate Now"}</span>
          <ArrowUpRight className="size-[18px] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    );
  };

  const renderNavLinks = (mobile = false) =>
    navLinks.map((item) => {
      const active =
        pathname === item.href ||
        (item.href !== "/" && pathname.startsWith(`${item.href}/`));

      return (
        <Link
          key={item.href}
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={`${
            mobile
              ? "flex items-center justify-between rounded-2xl px-4 py-3.5 text-base"
              : "whitespace-nowrap rounded-full px-3.5 py-3 text-sm"
          } font-semibold transition-colors ${
            active
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <span>{item.name}</span>
          {mobile && item.href === "/requests" && (
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
              Explore
            </span>
          )}
        </Link>
      );
    });

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 text-foreground shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex min-h-[76px] items-center justify-between gap-3 sm:min-h-[82px] sm:gap-5">
          {/* Brand */}
          <Link
            href="/"
            aria-label="Daan homepage"
            className="group flex shrink-0 items-center gap-2 sm:gap-3"
          >
            <div className="relative flex size-10 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-primary/10 transition duration-300 group-hover:rotate-[-4deg] group-hover:scale-105 sm:size-[52px]">
              <Image
                src="/daanlogo.png"
                alt="Daan logo"
                width={50}
                height={50}
                priority
                className="size-full object-contain p-0.5"
              />
            </div>

            <div>
              <span className="block text-2xl font-black leading-none tracking-[-1.5px] text-foreground sm:text-[30px]">
                daan<span className="text-primary">.</span>
              </span>
              <span className="mt-1.5 hidden text-[9px] font-bold tracking-[1.7px] text-muted-foreground sm:block">
                DONATE WITH TRUST
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 xl:flex"
          >
            {renderNavLinks()}
          </nav>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <ThemeToggle />
            {renderAuthActions()}
          </div>

          {/* Mobile navigation */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <ThemeToggle />

            <Sheet>
              <SheetTrigger
                aria-label="Open navigation menu"
                className="flex size-11 items-center justify-center rounded-2xl border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Menu className="size-6" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[min(88vw,390px)] overflow-y-auto border-l border-border bg-background p-5 text-foreground sm:p-6"
              >
                <SheetHeader className="border-b border-border pb-6 text-left">
                  <Link
                    href="/"
                    aria-label="Daan homepage"
                    className="flex items-center gap-3"
                  >
                    <Image
                      src="/daanlogo.png"
                      alt="Daan logo"
                      width={46}
                      height={46}
                      className="rounded-xl"
                    />
                    <span className="text-3xl font-black tracking-tight text-foreground">
                      daan<span className="text-primary">.</span>
                    </span>
                  </Link>

                  <SheetTitle className="pt-2 text-sm font-normal leading-6 text-muted-foreground">
                    Every act of kindness brings hope to someone.
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-5 flex items-center justify-between rounded-2xl border border-border bg-card p-3">
                  <span className="text-sm font-semibold text-foreground">
                    Appearance
                  </span>
                  <ThemeToggle />
                </div>

                <nav
                  aria-label="Mobile navigation"
                  className="mt-5 flex flex-col gap-1.5"
                >
                  {renderNavLinks(true)}
                </nav>

                <div className="mt-6">{renderAuthActions(true)}</div>

                <div className="mt-8 rounded-3xl border border-border bg-emerald-500/5 p-5">
                  <div className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <ShieldCheck className="size-6" />
                  </div>

                  <p className="text-base font-bold text-foreground">
                    Kindness with confidence
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Discover people&apos;s needs and support meaningful causes
                    through Daan&apos;s mission of trusted giving.
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary">
                    <Sparkles className="size-4" />
                    Small help. Real hope.
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

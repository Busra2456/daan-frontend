
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

  const {
    data,
    isLoading,
    isError,
  } = useQuery<MeResponse>({
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
        className={
          mobile
            ? "h-12 w-full animate-pulse rounded-2xl bg-[#edf5ef]"
            : "h-12 w-32 animate-pulse rounded-full bg-[#edf5ef]"
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
          className={
            mobile
              ? "flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-[#d5e5d9] bg-[#f0f7f1] px-5 text-base font-bold text-[#173d2d] transition-colors hover:bg-[#e5f1e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145c40] focus-visible:ring-offset-2"
              : "flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#d5e5d9] bg-[#f0f7f1] px-5 text-base font-bold text-[#173d2d] transition-colors hover:border-[#b9d4c0] hover:bg-[#e5f1e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145c40] focus-visible:ring-offset-2"
          }
        >
          <LayoutDashboard className="size-[18px] shrink-0" />
          <span>Dashboard</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isPending}
          className={
            mobile
              ? "flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-5 text-base font-bold text-rose-700 transition-colors hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              : "flex min-h-12 items-center justify-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-5 text-base font-bold text-rose-700 transition-colors hover:border-rose-300 hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          }
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
          : "flex shrink-0 items-center gap-4"
      }
    >
      <Link
        href="/login"
        className={
          mobile
            ? "flex min-h-[52px] items-center justify-center rounded-2xl border border-[#dce8df] bg-white px-5 text-base font-bold text-[#173d2d] transition-colors hover:bg-[#f4f8f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145c40] focus-visible:ring-offset-2"
            : "inline-flex min-h-12 items-center justify-center rounded-full px-3 text-base font-bold text-[#365345] transition-colors hover:text-[#145c40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145c40] focus-visible:ring-offset-2"
        }
      >
        Log in
      </Link>

      <Link
        href="/register"
        className={
          mobile
            ? "group flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#145c40] px-5 text-base font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#104a33] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145c40] focus-visible:ring-offset-2"
            : "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#145c40] px-5 text-base font-bold text-white shadow-[0_5px_16px_rgba(20,92,64,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#104a33] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145c40] focus-visible:ring-offset-2"
        }
      >
        <Heart className="size-[18px] shrink-0" />
        <span>{mobile ? "Get Started" : "Donate Now"}</span>
        <ArrowUpRight className="size-[18px] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );
};


  return (
    <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-[#fcfdfb]/95 backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex min-h-[82px] items-center justify-between gap-5">
          <Link
            href="/"
            aria-label="Daan homepage"
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="relative flex size-[52px] items-center justify-center rounded-[18px] bg-emerald-50 ring-1 ring-emerald-900/5 transition duration-300 group-hover:rotate-[-4deg] group-hover:scale-105">
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
              <span className="block text-[30px] font-black leading-none tracking-[-1.5px] text-[#123c2c]">
                daan<span className="text-emerald-600">.</span>
              </span>
              <span className="mt-1.5 block text-[9px] font-bold tracking-[1.7px] text-slate-500">
                DONATE WITH TRUST
              </span>
            </div>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 xl:flex"
          >
            {navLinks.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap rounded-full px-3.5 py-3 text-[14px] font-semibold transition-all duration-200 ${
                    active
                      ? "bg-emerald-50 text-[#145c40]"
                      : "text-slate-600 hover:bg-emerald-50 hover:text-[#145c40]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {renderAuthActions()}
          </div>

          <Sheet>
            <SheetTrigger
              aria-label="Open navigation menu"
              className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-900/10 bg-white text-[#145c40] shadow-sm transition-colors hover:bg-emerald-50 md:hidden"
            >
              <Menu className="size-6" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[min(88vw,390px)] overflow-y-auto border-l border-emerald-900/10 bg-[#fcfdfb] p-6"
            >
              <SheetHeader className="border-b border-emerald-900/10 pb-6 text-left">
                <Link href="/" className="flex items-center gap-3">
                  <Image
                    src="/daanlogo.png"
                    alt="Daan logo"
                    width={46}
                    height={46}
                    className="rounded-xl"
                  />
                  <span className="text-3xl font-black tracking-tight text-[#123c2c]">
                    daan<span className="text-emerald-600">.</span>
                  </span>
                </Link>

                <SheetTitle className="pt-2 text-sm font-normal leading-6 text-slate-500">
                  Every act of kindness brings hope to someone.
                </SheetTitle>
              </SheetHeader>

              <nav
                aria-label="Mobile navigation"
                className="mt-6 flex flex-col gap-1.5"
              >
                {navLinks.map((item) => {
                  const active = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[16px] font-semibold transition-colors ${
                        active
                          ? "bg-emerald-50 text-emerald-800"
                          : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                      }`}
                    >
                      <span>{item.name}</span>
                      {item.href === "/requests" && (
                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-800">
                          Explore
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-6">{renderAuthActions(true)}</div>

              <div className="mt-8 rounded-[24px] border border-emerald-100 bg-[#f0f7f1] p-5">
                <div className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-white text-emerald-800 shadow-sm">
                  <ShieldCheck className="size-6" />
                </div>

                <p className="text-[16px] font-bold text-[#123c2c]">
                  Kindness with confidence
                </p>

                <p className="mt-2 text-[13px] leading-6 text-slate-600">
                  Discover people&apos; needs and support meaningful causes through
                  Daan&apos; mission of trusted giving.
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                  <Sparkles className="size-4" />
                  Small help. Real hope.
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

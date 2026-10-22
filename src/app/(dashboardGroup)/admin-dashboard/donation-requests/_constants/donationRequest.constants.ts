import type { DonationRequestStatus } from "@/types/donation-request.type";

export const donationRequestSections: {
  status: DonationRequestStatus;
  title: string;
  showMore: string;
}[] = [
  {
    status: "PENDING",
    title: "Pending Requests",
    showMore: "/admin-dashboard/donation-requests/pending",
  },
  {
    status: "VERIFIED",
    title: "Verified Requests",
    showMore: "/admin-dashboard/donation-requests/verified",
  },
  {
    status: "DONATIONS",
    title: "Donations in Progress",
    showMore: "/admin-dashboard/donation-requests/donations",
  },
  {
    status: "COMPLETED",
    title: "Completed Requests",
    showMore: "/admin-dashboard/donation-requests/completed",
  },
  {
    status: "REJECTED",
    title: "Rejected Requests",
    showMore: "/admin-dashboard/donation-requests/rejected",
  },
];

export const donationRequestStatusStyle: Record<
  DonationRequestStatus,
  string
> = {
  PENDING:
    "border border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300",

  VERIFIED:
    "border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300",

  DONATIONS:
    "border border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300",

  COMPLETED:
    "border border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-300",

  REJECTED:
    "border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300",
};
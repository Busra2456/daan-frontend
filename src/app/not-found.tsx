import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>

        <p className="mt-3 text-muted-foreground">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
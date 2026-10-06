
import Image from "next/image";
import Link from "next/link";

const trustPoints = [
  {
    title: "Verified Requests",
    description:
      "Every request can be reviewed before donors decide to support it.",
  },
  {
    title: "Trusted Donations",
    description:
      "Donors can understand a person's situation before choosing to help.",
  },
  {
    title: "Real Stories",
    description:
      "Needy users can share their situation through text and supporting media.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex max-w-7xl items-center px-6 py-20 sm:px-10">
        <div className="grid w-full gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Donate with Trust
            </p>

            <h1 className="text-4xl font-bold sm:text-5xl">
              Help someone who truly needs it.
            </h1>

            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Daan is a platform where donors can find people who need help,
              learn about their situation, and support them.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/requests"
                className="rounded-md bg-foreground px-5 py-3 text-center text-sm font-medium text-background"
              >
                Explore Requests
              </Link>

              <Link
                href="/register"
                className="rounded-md border px-5 py-3 text-center text-sm font-medium"
              >
                Join Daan
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex size-72 items-center justify-center rounded-full border">
              <Image
                src="/daanlogo.png"
                alt="Daan logo"
                width={400}
                height={400}
                priority
                className="size-56 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 sm:px-10 md:grid-cols-3">
          {trustPoints.map((point) => (
            <div key={point.title} className="rounded-xl border p-6">
              <h2 className="text-lg font-semibold">{point.title}</h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

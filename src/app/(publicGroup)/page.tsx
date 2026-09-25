
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex max-w-7xl items-center px-10 py-20">
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

            <div className="mt-7 flex gap-4">
              <Link
                href="/requests"
                className="rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background"
              >
                Explore Requests
              </Link>

              <Link
                href="/register"
                className="rounded-md border px-5 py-3 text-sm font-medium"
              >
                Join Daan
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex size-72 items-center justify-center rounded-full border">
                  {/*  */}
                  <span>
                        <Image
                        src="/daanlogo.png"
                         alt="Daan logo"
                          width={400}
                           height={400}/>

                  </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="border-b mt-4">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
         <span>
                                <Image
                                src="/daanlogo.png"
                                 alt="Daan logo"
                                  width={60}
                                   height={60}/>
        
                          </span>
          {/* <span className="text-xl font-bold">Daan</span> */}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium">
            Home
          </Link>

          <Link href="/how-it-works" className="text-sm font-medium">
            How It Works
          </Link>

          <Link href="/requests" className="text-sm font-medium">
            Requests
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium hover:underline"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "StreamFlix | Aflam & Mosalsalet",
  description: "Tfarrej fi a7la el aflam w el mosalsalet online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased min-h-screen flex flex-col overflow-x-hidden">
        {/* Navbar */}
        <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 lg:gap-8">
              <Link
                href="/"
                className="text-xl sm:text-2xl font-extrabold tracking-tight text-red-600 shrink-0"
              >
                STREAM<span className="text-white">FLIX</span>
              </Link>

              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
                <Link href="/movies" className="hover:text-white transition">
                  Movies
                </Link>
                <Link href="/series" className="hover:text-white transition">
                  Series
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-[11px] sm:text-xs text-zinc-400">
                HD Streaming
              </span>
            </div>
          </div>

          {/* Mobile quick navigation */}
          <nav className="flex md:hidden items-center justify-around border-t border-zinc-900 bg-zinc-950/95 px-2 py-2 text-xs font-medium text-zinc-300">
            <Link
              href="/"
              className="rounded-lg px-3 py-1.5 hover:bg-zinc-900 hover:text-white transition"
            >
              Home
            </Link>
            <Link
              href="/movies"
              className="rounded-lg px-3 py-1.5 hover:bg-zinc-900 hover:text-white transition"
            >
              Movies
            </Link>
            <Link
              href="/series"
              className="rounded-lg px-3 py-1.5 hover:bg-zinc-900 hover:text-white transition"
            >
              Series
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full">{children}</main>

        {/* Footer */}
        <footer className="border-t border-zinc-900 px-4 py-6 sm:py-8 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} StreamFlix — Built with Next.js &amp; Prisma 8
        </footer>
      </body>
    </html>
  );
}
import Link from "next/link";
import { db } from "@/prisma/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const categories = await db.orm.public.Category.all();
  const movies = await db.orm.public.Movie.all();
  const seriesList = await db.orm.public.Series.all();

  const heroMovie = movies.find((m) => m.featured) ?? movies[0] ?? null;

  return (
    <div className="space-y-12 sm:space-y-14 pb-14 sm:pb-16">
      {/* Hero Section */}
      {heroMovie ? (
        <section className="relative overflow-hidden border-b border-zinc-800/80">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{
              backgroundImage: `url(${heroMovie.backdropUrl || heroMovie.posterUrl})`,
            }}
          />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
            <div className="max-w-2xl space-y-4 sm:space-y-5">
              <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-red-600/15 border border-red-500/30 px-3.5 py-1 text-xs font-semibold text-red-400">
                <span>Featured Movie</span>
                <span>•</span>
                <span>{heroMovie.releaseYear}</span>
                {heroMovie.rating !== null && heroMovie.rating !== undefined && (
                  <>
                    <span>•</span>
                    <span>★ {heroMovie.rating}</span>
                  </>
                )}
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {heroMovie.title}
              </h1>

              <p
                dir="auto"
                className="text-sm sm:text-lg leading-relaxed text-zinc-200"
              >
                {heroMovie.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <Link
                  href={`/movies/${heroMovie.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold text-white hover:bg-red-500 transition"
                >
                  ▶ Watch Now
                </Link>
                <Link
                  href="/movies"
                  className="inline-flex items-center gap-2 rounded-lg bg-zinc-900/90 border border-zinc-700 px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 transition"
                >
                  Browse Catalog
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome to StreamFlix</h1>
          <p className="mt-2 text-zinc-400">No movies added yet.</p>
        </section>
      )}

      {/* Categories Strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-3 sm:mb-4">
          Categories
        </h2>
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {categories.map((cat) => (
            <span
              key={cat.id}
              className="rounded-full bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-zinc-200 hover:border-zinc-600 transition"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </section>

      {/* Movies Section */}
      <section id="movies" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Movies</h2>
          <Link
            href="/movies"
            className="text-xs sm:text-sm text-zinc-400 hover:text-white transition"
          >
            {movies.length} titles →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movies/${movie.slug}`}
              className="group overflow-hidden rounded-xl bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-600 transition flex flex-col"
            >
              <div className="aspect-video w-full overflow-hidden bg-zinc-950">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition">
                      {movie.title}
                    </h3>
                    {movie.rating !== null && movie.rating !== undefined && (
                      <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs font-semibold text-amber-400 shrink-0">
                        ★ {movie.rating}
                      </span>
                    )}
                  </div>
                  <p
                    dir="auto"
                    className="mt-1.5 line-clamp-2 text-xs sm:text-sm text-zinc-400"
                  >
                    {movie.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-800/70">
                  <span>{movie.releaseYear}</span>
                  <span>
                    {movie.durationMin ? `${movie.durationMin} min` : "Movie"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Series Section */}
      <section id="series" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Series</h2>
          <Link
            href="/series"
            className="text-xs sm:text-sm text-zinc-400 hover:text-white transition"
          >
            {seriesList.length} shows →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {seriesList.map((show) => (
            <Link
              key={show.id}
              href={`/series/${show.slug}`}
              className="group overflow-hidden rounded-xl bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-600 transition flex flex-col"
            >
              <div className="aspect-video w-full overflow-hidden bg-zinc-950">
                <img
                  src={show.posterUrl}
                  alt={show.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition">
                      {show.title}
                    </h3>
                    {show.rating !== null && show.rating !== undefined && (
                      <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs font-semibold text-amber-400 shrink-0">
                        ★ {show.rating}
                      </span>
                    )}
                  </div>
                  <p
                    dir="auto"
                    className="mt-1.5 line-clamp-2 text-xs sm:text-sm text-zinc-400"
                  >
                    {show.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-800/70">
                  <span>{show.releaseYear}</span>
                  <span>TV Series</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
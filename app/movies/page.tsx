import Link from "next/link";
import { db } from "@/prisma/db";

export const dynamic = "force-dynamic";

export default async function MoviesCatalogPage() {
  const movies = await db.orm.public.Movie.all();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-red-500">
            Catalog
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            All Movies
          </h1>
        </div>

        <span className="rounded-full bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 text-xs font-medium text-zinc-300">
          {movies.length} {movies.length === 1 ? "movie" : "movies"}
        </span>
      </div>

      {movies.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-10 text-center text-zinc-400">
          Ma fammech aflam fil قاعدة البيانات taw.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movies/${movie.slug}`}
              className="group overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/60 transition hover:-translate-y-1 hover:border-red-500/50"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
                <img
                  src={movie.posterUrl || movie.backdropUrl || ""}
                  alt={movie.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between gap-2 text-xs text-zinc-400">
                  <span>{movie.releaseYear}</span>
                  {movie.rating !== null && movie.rating !== undefined && (
                    <span className="font-semibold text-amber-400">
                      &#9733; {movie.rating}
                    </span>
                  )}
                </div>

                <h2 className="line-clamp-1 text-base font-bold text-white group-hover:text-red-400 transition">
                  {movie.title}
                </h2>

                {movie.description && (
                  <p className="line-clamp-2 text-xs leading-relaxed text-zinc-400">
                    {movie.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
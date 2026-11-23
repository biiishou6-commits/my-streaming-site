import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/prisma/db";

export const dynamic = "force-dynamic";

type MoviePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function MovieDetailPage({ params }: MoviePageProps) {
  const { slug } = await params;
  const movie = await db.orm.public.Movie.first((m) => m.slug.eq(slug));
  if (!movie) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white">
        &larr; Back to Home
      </Link>
      <div className="overflow-hidden rounded-2xl bg-black border border-zinc-800">
        <video
          src={movie.videoUrl}
          poster={movie.backdropUrl || movie.posterUrl}
          controls
          playsInline
          className="aspect-video w-full bg-black"
        />
      </div>
      <div className="space-y-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{movie.title}</h1>
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
            {movie.rating !== null && movie.rating !== undefined && (
              <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-amber-300">
                &#9733; {movie.rating}
              </span>
            )}
            <span className="rounded-full bg-zinc-800 px-3 py-1 text-zinc-300">{movie.releaseYear}</span>
            {movie.durationMin && (
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-zinc-300">{movie.durationMin} min</span>
            )}
          </div>
        </div>
        <p className="text-base leading-relaxed text-zinc-300">{movie.description}</p>
      </div>
    </div>
  );
}
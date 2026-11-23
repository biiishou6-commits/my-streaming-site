import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/prisma/db";

export const dynamic = "force-dynamic";

type SeriesPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SeriesDetailPage({ params }: SeriesPageProps) {
  const { slug } = await params;

  const series = await db.orm.public.Series.first((s) => s.slug.eq(slug));

  if (!series) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition"
        >
          &larr; Back to Home
        </Link>
      </div>

      {/* Hero / Poster Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${series.backdropUrl || series.posterUrl})`,
          }}
        />
        <div className="relative z-10 grid grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-3 items-center">
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 aspect-[2/3] max-w-xs mx-auto md:mx-0 w-full">
            <img
              src={series.posterUrl}
              alt={series.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
              <span className="rounded-full bg-red-600/20 border border-red-500/40 px-3 py-1 text-red-300">
                TV Series
              </span>
              {series.rating !== null && series.rating !== undefined && (
                <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-amber-300">
                  &#9733; {series.rating}
                </span>
              )}
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-zinc-300">
                {series.releaseYear}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {series.title}
            </h1>

            <p className="text-base leading-relaxed text-zinc-300">
              {series.description}
            </p>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 sm:p-8 space-y-3">
        <h2 className="text-xl font-bold text-white">Episodes</h2>
        <p className="text-sm text-zinc-400">
          Episodes list coming soon for {series.title}.
        </p>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";

export type EpisodeItem = {
  id: string;
  seasonNumber: number;
  episodeNum: number;
  title: string;
  description: string | null;
  videoUrl: string;
  durationMin: number | null;
};

type EpisodesPlayerProps = {
  seriesTitle: string;
  posterUrl: string;
  episodes: EpisodeItem[];
};

export default function EpisodesPlayer({
  seriesTitle,
  posterUrl,
  episodes,
}: EpisodesPlayerProps) {
  const [selectedId, setSelectedId] = useState<string>(episodes[0]?.id ?? "");

  if (episodes.length === 0) {
    return (
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 sm:p-8 space-y-2">
        <h2 className="text-xl font-bold text-white">Episodes</h2>
        <p className="text-sm text-zinc-400">
          Ma fammech 7alaqat msajslin l&apos;{seriesTitle} taw.
        </p>
      </div>
    );
  }

  const activeEpisode =
    episodes.find((ep) => ep.id === selectedId) ?? episodes[0];

  return (
    <div className="space-y-6">
      {/* Lecteur vidéo mta3 el 7alqa el mokhtara */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
              S{activeEpisode.seasonNumber} · E{activeEpisode.episodeNum}
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {activeEpisode.title}
            </h2>
          </div>

          {activeEpisode.durationMin && (
            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
              {activeEpisode.durationMin} min
            </span>
          )}
        </div>

        <div className="overflow-hidden rounded-xl bg-black border border-zinc-800 shadow-xl">
          <video
            key={activeEpisode.id}
            src={activeEpisode.videoUrl}
            poster={posterUrl}
            controls
            playsInline
            className="aspect-video w-full bg-black"
          />
        </div>

        {activeEpisode.description && (
          <p className="text-sm leading-relaxed text-zinc-300">
            {activeEpisode.description}
          </p>
        )}
      </div>

      {/* Liste mta3 el 7alaqat */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">
            Episodes ({episodes.length})
          </h3>
          <span className="text-xs text-zinc-400">
            Enzel 3la ay 7alqa bech tetfarrej fiha
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((ep) => {
            const isActive = ep.id === activeEpisode.id;
            return (
              <button
                key={ep.id}
                type="button"
                onClick={() => setSelectedId(ep.id)}
                className={`text-left rounded-xl border p-4 transition cursor-pointer ${
                  isActive
                    ? "border-red-500 bg-red-600/15"
                    : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className={isActive ? "text-red-400" : "text-zinc-400"}>
                    Season {ep.seasonNumber} · Ep {ep.episodeNum}
                  </span>
                  {ep.durationMin && (
                    <span className="text-zinc-400">{ep.durationMin} min</span>
                  )}
                </div>

                <p className="mt-1.5 font-bold text-white line-clamp-1">
                  {ep.title}
                </p>

                {ep.description && (
                  <p className="mt-1 text-xs text-zinc-400 line-clamp-2">
                    {ep.description}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
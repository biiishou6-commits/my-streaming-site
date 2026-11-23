import "dotenv/config";
import { db } from "./db";

async function main() {
  const categoriesData = [
    { name: "Action", slug: "action" },
    { name: "Drama", slug: "drama" },
    { name: "Sci-Fi", slug: "sci-fi" },
    { name: "Comedy", slug: "comedy" },
  ];

  const categoriesBySlug = new Map<string, string>();

  for (const cat of categoriesData) {
    const existing = await db.orm.public.Category.first((c) => c.slug.eq(cat.slug));

    if (existing) {
      categoriesBySlug.set(cat.slug, existing.id);
    } else {
      const created = await db.orm.public.Category.create(cat);
      categoriesBySlug.set(cat.slug, created.id);
    }
  }

  const actionId = categoriesBySlug.get("action")!;
  const dramaId = categoriesBySlug.get("drama")!;
  const scifiId = categoriesBySlug.get("sci-fi")!;

  const moviesData = [
    {
      title: "Neon Horizon",
      slug: "neon-horizon",
      description:
        "Fi mostaqbal qrib, pilote y7awel ynqedh madiina ma3zoula fi wast 3asifa elektroniya.",
      posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
      backdropUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1400",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      releaseYear: 2025,
      durationMin: 128,
      rating: 8.6,
      featured: true,
      categoryId: scifiId,
    },
    {
      title: "Midnight Pursuit",
      slug: "midnight-pursuit",
      description:
        "Layla twila w mouhammed m3a el waqt bech ykammel mission s3iba qbal el fajr.",
      posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800",
      backdropUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1400",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      releaseYear: 2024,
      durationMin: 112,
      rating: 8.1,
      featured: false,
      categoryId: actionId,
    },
  ];

  for (const movie of moviesData) {
    const existing = await db.orm.public.Movie.first((m) => m.slug.eq(movie.slug));

    if (!existing) {
      await db.orm.public.Movie.create(movie);
    }
  }

  const seriesSlug = "silent-signals";
  let series = await db.orm.public.Series.first((s) => s.slug.eq(seriesSlug));

  if (!series) {
    series = await db.orm.public.Series.create({
      title: "Silent Signals",
      slug: seriesSlug,
      description:
        "Fariq y7allel isharet ghamdha jeya men b3id w yektesef asrar ma kenetech fi 7esab.",
      posterUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800",
      backdropUrl: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1400",
      releaseYear: 2025,
      rating: 8.9,
      featured: true,
      categoryId: dramaId,
    });
  }

  const episodesData = [
    {
      seasonNumber: 1,
      episodeNum: 1,
      title: "The First Echo",
      description: "Awwel ishara tadhher 3la radarat el station.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      durationMin: 46,
      seriesId: series.id,
    },
    {
      seasonNumber: 1,
      episodeNum: 2,
      title: "Static in the Dark",
      description: "El fariq y7awel yfak el chifra mta3 el message.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      durationMin: 49,
      seriesId: series.id,
    },
  ];

  for (const ep of episodesData) {
    const existingEp = await db.orm.public.Episode.first((e) =>
      e.seriesId.eq(ep.seriesId)
    );

    const alreadyHasThisEp =
      existingEp &&
      existingEp.seasonNumber === ep.seasonNumber &&
      existingEp.episodeNum === ep.episodeNum;

    if (!alreadyHasThisEp) {
      await db.orm.public.Episode.create(ep);
    }
  }

  console.log("Seed mrigel! Catégories, aflam, mosalsal w épisodes t3abbaw.");
}

main()
  .catch((err) => {
    console.error("Erreur fi seed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await db.close();
  });
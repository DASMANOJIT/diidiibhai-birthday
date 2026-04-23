import fs from "node:fs";
import path from "node:path";

export type MemoryMediaType = "image" | "video";
export type MemoryMediaSize = "hero" | "portrait" | "wide" | "square";

export type MemoryMediaItem = {
  src: string;
  type: MemoryMediaType;
  year: string;
  order: number;
  featured?: boolean;
  rotation?: number;
  size?: MemoryMediaSize;
};

export type MemoryMediaGroup = {
  year: string;
  media: MemoryMediaItem[];
};

type MediaOverride = Partial<
  Pick<MemoryMediaItem, "year" | "order" | "featured" | "rotation" | "size">
>;

type VisualTimelineEntry = {
  fileName: string;
  year: string;
  featured?: boolean;
  rotation?: number;
  size?: MemoryMediaSize;
};

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const videoExtensions = new Set([".mp4", ".mov", ".webm"]);
const memoryExcludedFileNames = new Set(["diidiibhai.jpg", "chonka.jpg"]);

export const timelineYears = Array.from({ length: 26 }, (_, index) =>
  String(2001 + index),
);

const defaultSizes: MemoryMediaSize[] = ["hero", "portrait", "wide", "square"];

// Editable visual timeline map.
// This is intentionally not derived from filenames. Current media is arranged
// from baby/toddler memories toward the latest photos/videos. When you add more
// files later, assign them here to set the exact year/order safely.
export const visualTimelineMedia: VisualTimelineEntry[] = [
  { fileName: "IMG_3549.jpg", year: "2001", featured: true, size: "hero" },
  { fileName: "IMG_3550.jpg", year: "2001", size: "portrait" },
  { fileName: "IMG_3551.jpg", year: "2002", featured: true, size: "hero" },
  { fileName: "IMG_3552.jpg", year: "2002", size: "portrait" },
  { fileName: "IMG_3558.jpg", year: "2003", featured: true, size: "hero" },
  { fileName: "IMG_3554.jpg", year: "2003", size: "portrait" },
  { fileName: "IMG_3553.jpg", year: "2004", featured: true, size: "hero" },
  { fileName: "IMG_3555.jpg", year: "2004", size: "portrait" },
  { fileName: "IMG_3556.jpg", year: "2005", featured: true, size: "hero" },
  { fileName: "IMG_3557.jpg", year: "2005", size: "portrait" },
  { fileName: "IMG_3559.jpg", year: "2006", featured: true, size: "hero" },
  { fileName: "IMG_1278.jpg", year: "2006", size: "portrait" },
  { fileName: "IMG_3540.jpg", year: "2007", featured: true, size: "hero" },
  { fileName: "IMG_3541.jpg", year: "2007", size: "wide" },
  { fileName: "IMG_3548.jpg", year: "2008", featured: true, size: "hero" },
  { fileName: "IMG_3542.jpg", year: "2008", size: "wide" },
  { fileName: "IMG_3539.jpg", year: "2009", featured: true, size: "hero" },
  { fileName: "IMG_3545.jpg", year: "2009", size: "portrait" },
  { fileName: "IMG_3547.jpg", year: "2010", featured: true, size: "hero" },
  { fileName: "IMG_3546.jpg", year: "2010", size: "portrait" },
  { fileName: "IMG_3544.jpg", year: "2011", featured: true, size: "hero" },
  { fileName: "IMG_3543.jpg", year: "2011", size: "portrait" },
  { fileName: "IMG_3538.jpg", year: "2012", featured: true, size: "hero" },
  { fileName: "IMG_3535.jpg", year: "2012", size: "portrait" },
  { fileName: "IMG_3536.jpg", year: "2013", featured: true, size: "hero" },
  { fileName: "IMG_3537.jpg", year: "2013", size: "portrait" },
  { fileName: "IMG_3532.jpg", year: "2014", featured: true, size: "hero" },
  { fileName: "IMG_3533.jpg", year: "2014", size: "portrait" },
  { fileName: "IMG_3534.jpg", year: "2015", featured: true, size: "hero" },
  { fileName: "IMG_3153.jpg", year: "2015", size: "wide" },
  { fileName: "IMG_3156.jpg", year: "2016", featured: true, size: "hero" },
  { fileName: "IMG_7355.jpg", year: "2016", size: "portrait" },
  { fileName: "IMG_9941.jpg", year: "2017", featured: true, size: "hero" },
  { fileName: "IMG_2208.jpg", year: "2017", rotation: 180, size: "wide" },
  {
    fileName: "IMG_2606.jpg",
    year: "2018",
    featured: true,
    rotation: 180,
    size: "hero",
  },
  { fileName: "IMG_5888.jpg", year: "2018", size: "wide" },
  { fileName: "IMG_8433.jpg", year: "2019", featured: true, size: "hero" },
  { fileName: "IMG_9137.jpg", year: "2019", rotation: 180, size: "wide" },
  {
    fileName: "IMG_9973.jpg",
    year: "2020",
    featured: true,
    rotation: 180,
    size: "hero",
  },
  { fileName: "IMG_1653.jpg", year: "2020", size: "wide" },
  { fileName: "IMG_1863.mp4", year: "2021", featured: true, size: "hero" },
  { fileName: "IMG_5556.mp4", year: "2021", size: "wide" },
  { fileName: "IMG_1843.jpg", year: "2022", featured: true, size: "hero" },
  { fileName: "IMG_2002.mp4", year: "2022", size: "portrait" },
  { fileName: "IMG_2843.mp4", year: "2023", featured: true, size: "hero" },
  { fileName: "IMG_8131.mp4", year: "2023", size: "portrait" },
  {
    fileName: "4848e9c6-2d8a-4324-b7ca-92fee7451de9.jpg",
    year: "2024",
    featured: true,
    size: "hero",
  },
  { fileName: "IMG_1005.jpg", year: "2024", size: "wide" },
  { fileName: "IMG_1056.jpg", year: "2025", featured: true, size: "hero" },
  {
    fileName: "WhatsApp_Image_2025-12-08_at_16.43.06.jpg",
    year: "2025",
    size: "wide",
  },
  {
    fileName: "29C224CD-AB96-4962-95BE-6C278C151EBD.jpg",
    year: "2026",
    featured: true,
    size: "hero",
  },
  {
    fileName: "01df48bf-f621-4c1c-bc20-8273545663a5.jpg",
    year: "2026",
    size: "wide",
  },
];

export const mediaOverrides: Record<string, MediaOverride> =
  Object.fromEntries(
    visualTimelineMedia.map((entry, index) => [
      entry.fileName,
      {
        featured: entry.featured ?? false,
        order: index + 1,
        rotation: entry.rotation ?? 0,
        size: entry.size,
        year: entry.year,
      },
    ]),
  );

const naturalCollator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

function getMediaType(fileName: string): MemoryMediaType | null {
  const extension = path.extname(fileName).toLowerCase();

  if (imageExtensions.has(extension)) {
    return "image";
  }

  if (videoExtensions.has(extension)) {
    return "video";
  }

  return null;
}

function shouldExcludeFromMemory(fileName: string) {
  return memoryExcludedFileNames.has(fileName.toLowerCase());
}

function naturalMediaSort(a: string, b: string) {
  return naturalCollator.compare(a, b);
}

export function getPublicMediaFiles() {
  const publicDir = path.join(process.cwd(), "public");

  return fs
    .readdirSync(publicDir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        getMediaType(entry.name) !== null &&
        !shouldExcludeFromMemory(entry.name),
    )
    .map((entry) => entry.name)
    .sort(naturalMediaSort);
}

export function getMemoryMediaItems(): MemoryMediaItem[] {
  const files = getPublicMediaFiles();
  const fallbackYear = timelineYears[timelineYears.length - 1] ?? "2026";
  const mappedCount = visualTimelineMedia.length;

  return files
    .map((fileName, naturalIndex) => {
      const override = mediaOverrides[fileName] ?? {};
      const type = getMediaType(fileName);

      if (!type) {
        throw new Error(`Unsupported media file passed scanner: ${fileName}`);
      }

      const item: MemoryMediaItem = {
        src: `/${fileName}`,
        type,
        order: override.order ?? mappedCount + naturalIndex + 1,
        featured: override.featured ?? naturalIndex % 4 === 0,
        rotation: override.rotation ?? 0,
        size:
          override.size ??
          (naturalIndex % 4 === 0
            ? "hero"
            : defaultSizes[naturalIndex % defaultSizes.length]),
        year: override.year ?? fallbackYear,
      };

      return item;
    })
    .sort((a, b) => a.order - b.order);
}

export function getMemoryMediaGroups(
  media: MemoryMediaItem[] = getMemoryMediaItems(),
): MemoryMediaGroup[] {
  const grouped = new Map<string, MemoryMediaItem[]>();

  media.forEach((item) => {
    const existing = grouped.get(item.year) ?? [];
    grouped.set(item.year, [...existing, item]);
  });

  return Array.from(grouped, ([year, groupMedia]) => ({
    year,
    media: groupMedia,
  }));
}

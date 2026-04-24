export type MemoryMediaType = "image" | "video";
export type MemoryMediaSize = "hero" | "portrait" | "wide" | "square";
export type MemoryMediaFit = "contain" | "cover";

export type MemoryMediaItem = {
  src: string;
  type: MemoryMediaType;
  year: string;
  order: number;
  alt?: string;
  poster?: string;
  mimeType?: string;
  featured?: boolean;
  rotation?: number;
  size?: MemoryMediaSize;
  fit?: MemoryMediaFit;
  placeholderOnly?: boolean;
  fallbackLabel?: string;
};

export type MemoryMediaGroup = {
  year: string;
  media: MemoryMediaItem[];
};

type ConfiguredMemoryMediaItem = Omit<MemoryMediaItem, "order">;

type VideoSourceOptions = {
  envName?: string;
  localSrc?: string;
  placeholderUrl: string;
  requiresHostedSource?: boolean;
};

function resolveVideoSource({
  envName,
  localSrc,
  placeholderUrl,
  requiresHostedSource = false,
}: VideoSourceOptions): Pick<MemoryMediaItem, "src" | "placeholderOnly"> {
  const hostedSrc = envName ? process.env[envName]?.trim() : "";

  if (hostedSrc) {
    return { src: hostedSrc, placeholderOnly: false };
  }

  if (requiresHostedSource) {
    return {
      src: placeholderUrl,
      placeholderOnly: true,
    };
  }

  return {
    src: localSrc ?? placeholderUrl,
    placeholderOnly: false,
  };
}

function createImageItem(
  item: Omit<ConfiguredMemoryMediaItem, "type" | "fit">,
): ConfiguredMemoryMediaItem {
  return {
    type: "image",
    fit: "contain",
    alt: item.alt ?? `Birthday memory from ${item.year}`,
    ...item,
  };
}

function createVideoItem(
  item: Omit<ConfiguredMemoryMediaItem, "type" | "fit">,
): ConfiguredMemoryMediaItem {
  return {
    type: "video",
    fit: "contain",
    mimeType: "video/mp4",
    alt: item.alt ?? `Birthday memory video from ${item.year}`,
    fallbackLabel: item.fallbackLabel ?? "Video memory unavailable",
    ...item,
  };
}

// Production media rules:
// - Small images are safe to keep in `/public`.
// - Large videos should be hosted externally on Cloudinary, Mux, ImageKit, S3,
//   or a similar CDN-backed service.
// - GitHub blocks normal Git pushes for files larger than 100 MB, so those
//   files may exist locally but never reach production.
// - Production deployments cannot access ignored or untracked media sitting
//   only on your laptop, so every deployed item must resolve to a real hosted
//   URL or a committed `/public` file.
//
// To extend the gallery later, append a new item in the correct visual order
// here. The exported `order` is generated from array position so the sequence
// stays easy to edit without touching component code.
export const memoryMediaConfig: ConfiguredMemoryMediaItem[] = [
  createImageItem({
    src: "/IMG_3549.jpg",
    year: "2001",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_3550.jpg",
    year: "2001",
    size: "portrait",
  }),
  createImageItem({
    src: "/IMG_3551.jpg",
    year: "2002",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_3552.jpg",
    year: "2002",
    size: "portrait",
  }),
  createImageItem({
    src: "/IMG_3558.jpg",
    year: "2003",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_3554.jpg",
    year: "2003",
    size: "portrait",
  }),
  createImageItem({
    src: "/IMG_3553.jpg",
    year: "2004",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_3555.jpg",
    year: "2004",
    size: "portrait",
  }),
  createImageItem({
    src: "/IMG_3556.jpg",
    year: "2005",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_3557.jpg",
    year: "2005",
    size: "portrait",
  }),
  createImageItem({
    src: "/IMG_3559.jpg",
    year: "2006",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_1278.jpg",
    year: "2006",
    size: "portrait",
  }),
  createImageItem({
    src: "/IMG_3540.jpg",
    year: "2007",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_3541.jpg",
    year: "2007",
    size: "wide",
  }),
  createImageItem({
    src: "/IMG_3548.jpg",
    year: "2008",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_3542.jpg",
    year: "2008",
    size: "wide",
  }),
  createImageItem({
    src: "/IMG_3539.jpg",
    year: "2009",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_3545.jpg",
    year: "2009",
    size: "portrait",
  }),
  createImageItem({
    src: "/IMG_3547.jpg",
    year: "2010",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_3546.jpg",
    year: "2010",
    size: "portrait",
  }),
  createImageItem({
    src: "/IMG_3544.jpg",
    year: "2011",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_3543.jpg",
    year: "2011",
    size: "portrait",
  }),
  createImageItem({
    src: "/IMG_3538.jpg",
    year: "2012",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_3535.jpg",
    year: "2012",
    size: "portrait",
  }),
  createImageItem({
    src: "/IMG_3536.jpg",
    year: "2013",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_3537.jpg",
    year: "2013",
    size: "portrait",
  }),
  createImageItem({
    src: "/IMG_3532.jpg",
    year: "2014",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_3533.jpg",
    year: "2014",
    size: "portrait",
  }),
  createImageItem({
    src: "/IMG_3534.jpg",
    year: "2015",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_3153.jpg",
    year: "2015",
    size: "wide",
  }),
  createImageItem({
    src: "/IMG_3156.jpg",
    year: "2016",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_7355.jpg",
    year: "2016",
    size: "portrait",
  }),
  createImageItem({
    src: "/IMG_9941.jpg",
    year: "2017",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_2208.jpg",
    year: "2017",
    rotation: 180,
    size: "wide",
  }),
  createImageItem({
    src: "/IMG_2606.jpg",
    year: "2018",
    featured: true,
    rotation: 180,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_5888.jpg",
    year: "2018",
    size: "wide",
  }),
  createImageItem({
    src: "/IMG_8433.jpg",
    year: "2019",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_9137.jpg",
    year: "2019",
    rotation: 180,
    size: "wide",
  }),
  createImageItem({
    src: "/IMG_9973.jpg",
    year: "2020",
    featured: true,
    rotation: 180,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_1653.jpg",
    year: "2020",
    size: "wide",
  }),
  // TODO: `IMG_1863.mp4` was larger than GitHub's 100 MB limit and is not
  // tracked in the deployed repo. Upload it to Cloudinary, Mux, ImageKit, S3,
  // or similar and set `NEXT_PUBLIC_MEMORY_VIDEO_1863_URL`.
  createVideoItem({
    ...resolveVideoSource({
      envName: "NEXT_PUBLIC_MEMORY_VIDEO_1863_URL",
      placeholderUrl: "https://example.com/replace-with-hosted-video/IMG_1863.mp4",
      requiresHostedSource: true,
    }),
    year: "2021",
    featured: true,
    poster: "/IMG_1653.jpg",
    size: "hero",
  }),
  createVideoItem({
    ...resolveVideoSource({
      envName: "NEXT_PUBLIC_MEMORY_VIDEO_5556_URL",
      localSrc: "/IMG_5556.mp4",
      placeholderUrl: "https://example.com/replace-with-hosted-video/IMG_5556.mp4",
    }),
    year: "2021",
    poster: "/IMG_1843.jpg",
    size: "wide",
  }),
  createImageItem({
    src: "/IMG_1843.jpg",
    year: "2022",
    featured: true,
    size: "hero",
  }),
  // TODO: `IMG_2002.mp4` was larger than GitHub's 100 MB limit and is not
  // tracked in the deployed repo. Upload it to Cloudinary, Mux, ImageKit, S3,
  // or similar and set `NEXT_PUBLIC_MEMORY_VIDEO_2002_URL`.
  createVideoItem({
    ...resolveVideoSource({
      envName: "NEXT_PUBLIC_MEMORY_VIDEO_2002_URL",
      placeholderUrl: "https://example.com/replace-with-hosted-video/IMG_2002.mp4",
      requiresHostedSource: true,
    }),
    year: "2022",
    poster: "/IMG_1843.jpg",
    size: "portrait",
  }),
  createVideoItem({
    ...resolveVideoSource({
      envName: "NEXT_PUBLIC_MEMORY_VIDEO_2843_URL",
      localSrc: "/IMG_2843.mp4",
      placeholderUrl: "https://example.com/replace-with-hosted-video/IMG_2843.mp4",
    }),
    year: "2023",
    featured: true,
    poster: "/IMG_1005.jpg",
    size: "hero",
  }),
  createVideoItem({
    ...resolveVideoSource({
      envName: "NEXT_PUBLIC_MEMORY_VIDEO_8131_URL",
      localSrc: "/IMG_8131.mp4",
      placeholderUrl: "https://example.com/replace-with-hosted-video/IMG_8131.mp4",
    }),
    year: "2023",
    poster: "/4848e9c6-2d8a-4324-b7ca-92fee7451de9.jpg",
    size: "portrait",
  }),
  createImageItem({
    src: "/4848e9c6-2d8a-4324-b7ca-92fee7451de9.jpg",
    year: "2024",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/IMG_1005.jpg",
    year: "2024",
    size: "wide",
  }),
  createImageItem({
    src: "/IMG_1056.jpg",
    year: "2025",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/WhatsApp_Image_2025-12-08_at_16.43.06.jpg",
    year: "2025",
    size: "wide",
  }),
  createImageItem({
    src: "/29C224CD-AB96-4962-95BE-6C278C151EBD.jpg",
    year: "2026",
    featured: true,
    size: "hero",
  }),
  createImageItem({
    src: "/01df48bf-f621-4c1c-bc20-8273545663a5.jpg",
    year: "2026",
    size: "wide",
  }),
];

export const memoryMedia: MemoryMediaItem[] = memoryMediaConfig.map(
  (item, index) => ({
    order: index + 1,
    ...item,
  }),
);

export function getMemoryMediaItems(): MemoryMediaItem[] {
  return memoryMedia;
}

export function getMemoryMediaGroups(
  media: MemoryMediaItem[] = memoryMedia,
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

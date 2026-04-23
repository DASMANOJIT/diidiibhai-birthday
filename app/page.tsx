import FinalReveal from "@/components/FinalReveal";
import MemoryExperience from "@/components/MemoryExperience";
import { getMemoryMediaGroups } from "@/lib/mediaData";

export default function Home() {
  const memoryGroups = getMemoryMediaGroups();

  return (
    <main className="relative isolate overflow-x-hidden bg-[#fff8f7] text-[#6d4f4d]">
      <section className="relative flex min-h-[78svh] items-center justify-center overflow-hidden px-5 py-20 text-center sm:min-h-[86svh] sm:px-8 sm:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.96),transparent_31%),linear-gradient(180deg,#fffafd_0%,#fff2ee_51%,#fff8f4_100%)]" />
        <div className="absolute left-[-7rem] top-[-6rem] -z-10 h-72 w-72 rounded-full bg-[#ffd7e4]/65 blur-3xl" />
        <div className="absolute right-[-8rem] top-[18%] -z-10 h-80 w-80 rounded-full bg-[#fff0ca]/70 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-1/2 -z-10 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[#ffdce8]/45 blur-3xl" />

        <div className="absolute left-[8%] top-[20%] h-2 w-2 rounded-full bg-white shadow-[0_0_22px_rgba(255,255,255,0.9)]" />
        <div className="absolute right-[14%] top-[24%] h-3 w-3 rounded-full bg-[#ffd3df] shadow-[0_0_22px_rgba(255,211,223,0.8)]" />
        <div className="absolute bottom-[22%] left-[18%] h-2.5 w-2.5 rounded-full bg-[#fff0c7] shadow-[0_0_18px_rgba(255,240,199,0.9)]" />

        <div className="relative mx-auto max-w-3xl">
          <p className="mx-auto mb-5 w-fit rounded-full border border-white/80 bg-white/58 px-4 py-2 text-xs font-bold uppercase tracking-[0.36em] text-[#b97a82] shadow-[0_18px_55px_rgba(211,132,151,0.16)] backdrop-blur">
            birthday yearbook
          </p>
          <h1 className="text-balance text-4xl font-black leading-[1.03] tracking-[-0.06em] text-[#5f4644] sm:text-6xl lg:text-7xl">
            A soft little film of memories through the years.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-[#8b6661] sm:text-lg">
            Scroll slowly. Let the photos and videos do the storytelling.
          </p>
          <div className="mx-auto mt-10 flex w-fit items-center gap-3 rounded-full border border-white/70 bg-white/52 px-5 py-3 text-sm font-semibold text-[#a46f69] shadow-[0_22px_70px_rgba(211,132,151,0.18)] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#ff9ab6] shadow-[0_0_18px_rgba(255,154,182,0.9)]" />
            keep scrolling
          </div>
        </div>
      </section>

      <MemoryExperience groups={memoryGroups} />
      <FinalReveal />
    </main>
  );
}

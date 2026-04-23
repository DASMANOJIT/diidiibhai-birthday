import Image from "next/image";
import Link from "next/link";

export default function ChonkaPage() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#fff8f4] px-5 py-20 text-center text-[#654947]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.95),transparent_30%),radial-gradient(circle_at_16%_78%,rgba(255,210,223,0.5),transparent_28%),linear-gradient(135deg,#fffafd_0%,#fff0f4_48%,#fff8ed_100%)]" />
      <div className="absolute left-[-8rem] top-[-7rem] -z-10 h-80 w-80 rounded-full bg-[#ffd2df]/55 blur-3xl" />
      <div className="absolute bottom-[-10rem] right-[-8rem] -z-10 h-[30rem] w-[30rem] rounded-full bg-[#ffe0aa]/50 blur-3xl" />

      <section className="relative mx-auto grid w-full max-w-5xl items-center gap-8 rounded-[2.4rem] border border-white/75 bg-white/68 px-6 py-10 shadow-[0_36px_110px_rgba(196,105,124,0.2)] backdrop-blur-xl sm:rounded-[3.2rem] sm:px-10 sm:py-14 lg:grid-cols-[0.88fr_1.12fr] lg:text-left">
        <div className="relative mx-auto w-full max-w-sm rotate-[-2deg] rounded-[2rem] bg-white p-2 pb-8 shadow-[0_30px_90px_rgba(112,62,70,0.24)] ring-1 ring-white/80 sm:max-w-lg">
          <span className="absolute left-1/2 top-[-0.75rem] z-20 h-6 w-24 -translate-x-1/2 rotate-[-3deg] rounded-sm bg-[#fff0c9]/82 shadow-[0_8px_18px_rgba(135,88,66,0.13)] backdrop-blur-sm" />
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.45rem] bg-[#f6ddd9]">
            <Image
              fill
              alt="Chonka family birthday photo"
              className="object-contain"
              preload
              quality={84}
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 360px, 390px"
              src="/chonka.JPG"
            />
          </div>
        </div>

        <div>
          <p className="mx-auto mb-5 w-fit rounded-full bg-[#fff0f4] px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-[#bb7a83] lg:mx-0">
            chonka family message
          </p>
          <h1 className="text-balance text-4xl font-black leading-[1.02] tracking-[-0.06em] text-[#5e4643] sm:text-6xl lg:text-7xl">
            happpyyyy birthdayyyyy from chonka family
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-8 text-[#8a6460] sm:text-lg lg:mx-0">
            Sending the softest paws, warmest chaos, and cutest birthday love.
          </p>
          <Link
            className="mt-8 inline-flex rounded-full border border-white/80 bg-white/78 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#8b5b58] shadow-[0_18px_50px_rgba(198,102,123,0.18)] transition hover:scale-[1.03] hover:shadow-[0_24px_70px_rgba(255,145,174,0.3)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ffb3c7]/55"
            href="/surprise"
          >
            back to surprise
          </Link>
        </div>
      </section>
    </main>
  );
}

import { Clock } from "@/components/ui/Clock";
import { MusicLinks } from "@/components/ui/MusicLinks";
import { MusicPlayer } from "@/components/music/MusicPlayer";
import { siteConfig } from "@/config/site";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black selection:bg-white/30">
      {/* Full resolution Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={siteConfig.background}
          alt="Background Wallpaper"
          fill
          priority
          unoptimized
          quality={100}
          className="object-cover object-center w-full h-full"
        />
        {/* Subtle ambient gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Enlarged Calligraphy Logo Overlay */}
      <div className="absolute top-8 sm:top-12 left-4 sm:left-10 z-10 pointer-events-none select-none">
        <Image
          src="/bhai-ke-gaane-logo.png"
          alt="Bhai ke Gaane Logo"
          width={600}
          height={300}
          priority
          unoptimized
          className="w-72 sm:w-[420px] md:w-[540px] h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
        />
      </div>

      <Clock />
      <MusicLinks />
      <MusicPlayer />
    </main>
  );
}

import { Clock } from "@/components/ui/Clock";
import { MusicLinks } from "@/components/ui/MusicLinks";
import { MusicPlayer } from "@/components/music/MusicPlayer";
import { siteConfig } from "@/config/site";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black selection:bg-white/30">
      {/* Background Image centered from both sides (horizontally & vertically) */}
      <div className="fixed inset-0 z-0 flex items-center justify-center">
        <Image
          src={siteConfig.background}
          alt="Background Wallpaper"
          fill
          priority
          unoptimized
          quality={100}
          className="object-cover object-center w-full h-full"
        />
        {/* Ambient gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Responsive Calligraphy Logo Overlay - Centered on Mobile, Left-aligned on Desktop */}
      <div className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 z-10 pointer-events-none select-none flex flex-col items-center md:items-start text-center md:text-left">
        <Image
          src="/bhai-ke-gaane-logo.png"
          alt="Bhai ke Gaane Logo"
          width={600}
          height={300}
          priority
          unoptimized
          className="w-64 sm:w-[380px] md:w-[500px] h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
        />
      </div>

      <Clock />
      <MusicLinks />
      <MusicPlayer />
    </main>
  );
}

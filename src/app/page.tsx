import { Clock } from "@/components/ui/Clock";
import { MusicLinks } from "@/components/ui/MusicLinks";
import { MusicPlayer } from "@/components/music/MusicPlayer";
import { siteConfig } from "@/config/site";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black selection:bg-white/30">
      {/* Background Image focused on the right side for main character */}
      <div className="fixed inset-0 z-0">
        <Image
          src={siteConfig.background}
          alt="Background Wallpaper"
          fill
          priority
          unoptimized
          quality={100}
          className="object-cover object-[85%_center] md:object-center w-full h-full"
        />
        {/* Ambient gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* 
        Logo Image Positioning:
        - Mobile/Small Screen: Lower down towards bottom/center with top margin (top-[35%] mt-4 left-1/2 -translate-x-1/2)
        - Desktop/Bigger Screen: Top-Left corner (md:top-10 md:left-12 md:translate-x-0 md:translate-y-0)
      */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 mt-4 md:top-10 md:left-12 md:translate-x-0 md:translate-y-0 md:mt-0 z-10 pointer-events-none select-none flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto px-4 md:px-0">
        <Image
          src="/bhai-ke-gaane-logo.png"
          alt="Bhai ke Gaane Logo"
          width={700}
          height={350}
          priority
          unoptimized
          className="w-[88vw] max-w-[340px] sm:max-w-[480px] md:max-w-[540px] h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)]"
        />
      </div>

      <Clock />
      <MusicLinks />
      <MusicPlayer />
    </main>
  );
}

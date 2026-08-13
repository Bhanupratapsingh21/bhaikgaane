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

      {/* Enlarged Logo Image Centered Vertically AND Horizontally */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-12 sm:-mt-16 z-10 pointer-events-none select-none flex flex-col items-center justify-center text-center">
        <Image
          src="/bhai-ke-gaane-logo.png"
          alt="Bhai ke Gaane Logo"
          width={700}
          height={350}
          priority
          unoptimized
          className="w-80 sm:w-[520px] md:w-[680px] h-auto drop-shadow-[0_12px_36px_rgba(0,0,0,0.95)]"
        />
      </div>

      <Clock />
      <MusicLinks />
      <MusicPlayer />
    </main>
  );
}

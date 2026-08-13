"use client";

import { useState, useEffect, useRef } from "react";
import { YouTubePlayer, TrackInfo } from "./YouTubePlayer";
import { Play, Pause, SkipBack, SkipForward, Music } from "lucide-react";

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function MusicPlayer() {
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<TrackInfo | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const handlePlayerReady = (ytPlayer: any) => {
    setPlayer(ytPlayer);
  };

  const handleStateChange = (state: number) => {
    setIsPlaying(state === 1); // 1 = YT.PlayerState.PLAYING
  };

  const handleTrackChange = (track: TrackInfo) => {
    setCurrentTrack(track);
  };

  const handleTimeUpdate = (time: number, total: number) => {
    if (!isDragging) {
      setCurrentTime(time);
      setDuration(total);
    }
  };

  const togglePlayPause = () => {
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const handleNext = () => {
    if (player) player.nextVideo();
  };

  const handlePrev = () => {
    if (player) player.previousVideo();
  };

  const handleSeek = (time: number) => {
    if (player) player.seekTo(time, true);
    setCurrentTime(time);
  };

  // Progress bar interaction handlers
  const displayTime = isDragging ? dragProgress * duration : currentTime;
  const progressPercent = duration > 0 ? (displayTime / duration) * 100 : 0;

  const updateDragProgress = (clientX: number) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const p = x / rect.width;
    setDragProgress(p);
    return p;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateDragProgress(e.clientX);
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalPointerUp = (e: PointerEvent) => {
        setIsDragging(false);
        const newProgress = updateDragProgress(e.clientX);
        handleSeek(newProgress * duration);
      };
      const handleGlobalPointerMove = (e: PointerEvent) => {
        updateDragProgress(e.clientX);
      };
      
      window.addEventListener("pointerup", handleGlobalPointerUp);
      window.addEventListener("pointermove", handleGlobalPointerMove);
      
      return () => {
        window.removeEventListener("pointerup", handleGlobalPointerUp);
        window.removeEventListener("pointermove", handleGlobalPointerMove);
      };
    }
  }, [isDragging, duration]);

  const thumbnailUrl = currentTrack?.videoId
    ? `https://img.youtube.com/vi/${currentTrack.videoId}/hqdefault.jpg`
    : null;

  return (
    <>
      <YouTubePlayer 
        onReady={handlePlayerReady}
        onStateChange={handleStateChange}
        onTrackChange={handleTrackChange}
        onTimeUpdate={handleTimeUpdate}
        onError={(err) => console.error("YT Error:", err)}
      />

      {/* Floating horizontal capsule player - slightly smaller & compact */}
      <div className="fixed bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90vw] max-w-xl">
        <div className="relative bg-black/35 backdrop-blur-xl border border-white/25 rounded-full px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-[0_6px_28px_rgba(0,0,0,0.5)] flex items-center justify-between gap-3 sm:gap-4 transition-all duration-300">
          
          {/* Left: Circular Album Artwork (Spins when playing) */}
          <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full flex-shrink-0 border border-white/20 bg-black/40 shadow-md flex items-center justify-center overflow-hidden">
            <div className={`w-full h-full relative ${isPlaying ? "animate-disc" : "animate-disc-paused"}`}>
              {thumbnailUrl ? (
                <img 
                  src={thumbnailUrl} 
                  alt={currentTrack?.title || "Album Cover"}
                  className="w-full h-full object-cover rounded-full" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/60">
                  <Music className="w-5 h-5 sm:w-6 sm:h-6 text-white/50" />
                </div>
              )}
            </div>
          </div>

          {/* Middle: Track Title, Artist, Progress Bar & Time */}
          <div className="flex-1 min-w-0 flex flex-col justify-center py-0.5">
            <div className="truncate text-xs sm:text-sm font-bold text-white tracking-wide">
              {currentTrack?.title || "Tumsa Koi Pyaara"}
            </div>
            <div className="truncate text-[11px] sm:text-xs text-white/70 font-normal mt-0.5">
              {currentTrack?.artist || "Kumar Sanu & Alka Yagnik"}
            </div>

            {/* Thin Horizontal Progress Line */}
            <div 
              ref={trackRef}
              onPointerDown={handlePointerDown}
              className="w-full h-2.5 flex items-center cursor-pointer group mt-1"
            >
              <div className="w-full h-0.5 bg-white/25 rounded-full overflow-hidden relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-white rounded-full transition-all"
                  style={{ 
                    width: `${progressPercent}%`,
                    transitionDuration: isDragging ? "0ms" : "200ms"
                  }}
                />
              </div>
            </div>

            {/* Time Stamp underneath progress line */}
            <div className="text-[10px] sm:text-[11px] text-white/70 font-normal tracking-wide">
              {formatTime(displayTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Right: Controls (Previous, Play/Pause Circle, Next) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0 pr-1">
            <button
              onClick={handlePrev}
              className="p-1 text-white/80 hover:text-white active:scale-90 transition-all"
              aria-label="Previous song"
            >
              <SkipBack className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 fill-current" />
            </button>

            <button
              onClick={togglePlayPause}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-current text-black" />
              ) : (
                <Play className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-current text-black ml-0.5" />
              )}
            </button>

            <button
              onClick={handleNext}
              className="p-1 text-white/80 hover:text-white active:scale-90 transition-all"
              aria-label="Next song"
            >
              <SkipForward className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 fill-current" />
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

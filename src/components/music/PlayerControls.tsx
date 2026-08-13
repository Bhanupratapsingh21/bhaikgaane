"use client";

import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, ListMusic, Volume2 } from "lucide-react";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onTogglePlaylist: () => void;
}

export function PlayerControls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  onTogglePlaylist,
}: PlayerControlsProps) {
  return (
    <div className="flex items-center justify-between w-full mt-6">
      <div className="flex items-center gap-4 text-white/50">
        <button className="hover:text-white transition-colors p-2 rounded-full active:scale-95">
          <Shuffle className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={onPrev}
          className="text-white/80 hover:text-white transition-colors active:scale-90"
          aria-label="Previous song"
        >
          <SkipBack className="w-6 h-6 fill-current" />
        </button>
        
        <button
          onClick={onPlayPause}
          className="w-14 h-14 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : (
            <Play className="w-6 h-6 fill-current ml-1" />
          )}
        </button>
        
        <button
          onClick={onNext}
          className="text-white/80 hover:text-white transition-colors active:scale-90"
          aria-label="Next song"
        >
          <SkipForward className="w-6 h-6 fill-current" />
        </button>
      </div>

      <div className="flex items-center gap-4 text-white/50">
        <button className="hover:text-white transition-colors p-2 rounded-full active:scale-95">
          <Repeat className="w-4 h-4" />
        </button>
        <button
          onClick={onTogglePlaylist}
          className="hover:text-white transition-colors p-2 rounded-full active:scale-95"
          aria-label="Open playlist"
        >
          <ListMusic className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

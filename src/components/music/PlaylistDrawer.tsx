"use client";

import { X } from "lucide-react";
import { TrackInfo } from "./YouTubePlayer";

interface PlaylistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  playlist: TrackInfo[];
  currentTrack: TrackInfo | null;
  onPlayTrack: (index: number) => void;
}

export function PlaylistDrawer({
  isOpen,
  onClose,
  playlist,
  currentTrack,
  onPlayTrack,
}: PlaylistDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-0 left-0 w-full h-[60vh] bg-black/60 backdrop-blur-2xl rounded-t-3xl border-t border-white/10 z-50 flex flex-col p-6 shadow-2xl transition-transform transform translate-y-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold tracking-tight">Up Next</h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {playlist.length === 0 ? (
          <div className="text-white/50 text-center mt-10">
            Playing from YouTube Playlist...
          </div>
        ) : (
          playlist.map((track, i) => {
            const isPlaying = currentTrack?.videoId === track.videoId;
            return (
              <button
                key={i}
                onClick={() => {
                  onPlayTrack(i);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-colors ${
                  isPlaying ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className={`truncate text-sm font-medium ${isPlaying ? "text-white" : "text-white/90"}`}>
                    {track.title}
                  </div>
                  <div className="truncate text-xs text-white/50 mt-1">
                    {track.artist}
                  </div>
                </div>
                {isPlaying && (
                  <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

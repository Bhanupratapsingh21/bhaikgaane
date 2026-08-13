"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

// Extend Window interface for YouTube API
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export type TrackInfo = {
  title: string;
  artist: string;
  videoId: string;
};

interface YouTubePlayerProps {
  onReady: (player: any) => void;
  onStateChange: (state: number) => void;
  onTrackChange: (track: TrackInfo) => void;
  onError: (error: any) => void;
  onTimeUpdate: (time: number, duration: number) => void;
}

export function YouTubePlayer({
  onReady,
  onStateChange,
  onTrackChange,
  onError,
  onTimeUpdate,
}: YouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load YouTube IFrame API if not already loaded
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }

    function initializePlayer() {
      if (!containerRef.current) return;
      
      const isPlaylistMode = siteConfig.youtube.mode === "youtube-playlist";

      playerRef.current = new window.YT.Player(containerRef.current, {
        height: "1",
        width: "1",
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1,
          ...(isPlaylistMode ? { listType: 'playlist', list: siteConfig.youtube.playlistId } : {})
        },
        events: {
          onReady: (event: any) => {
            onReady(event.target);
            startProgressTimer();
            fetchCurrentTrackInfo();
          },
          onStateChange: (event: any) => {
            onStateChange(event.data);
            fetchCurrentTrackInfo();
            // -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
          },
          onError: (event: any) => {
            onError(event.data);
          }
        },
      });
    }

    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
      stopProgressTimer();
    };
  }, []);

  const fetchCurrentTrackInfo = () => {
    if (!playerRef.current || !playerRef.current.getVideoData) return;
    
    try {
      const data = playerRef.current.getVideoData();
      if (data && data.title) {
        // Simple heuristic to split title and artist if formatted as "Artist - Title"
        const parts = data.title.split(" - ");
        const title = parts.length > 1 ? parts.slice(1).join(" - ") : data.title;
        const artist = parts.length > 1 ? parts[0] : data.author || "Unknown Artist";
        
        onTrackChange({
          title: title.trim(),
          artist: artist.trim(),
          videoId: data.video_id,
        });
      }
    } catch (e) {
      console.error("Error fetching track info", e);
    }
  };

  const startProgressTimer = () => {
    stopProgressTimer();
    timerRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime && playerRef.current.getDuration) {
        onTimeUpdate(playerRef.current.getCurrentTime(), playerRef.current.getDuration());
      }
    }, 1000);
  };

  const stopProgressTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <div className="fixed -top-10 -left-10 w-1 h-1 opacity-0 pointer-events-none overflow-hidden">
      <div ref={containerRef} />
    </div>
  );
}

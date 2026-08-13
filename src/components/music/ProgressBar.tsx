"use client";

import { useState, useEffect, useRef } from "react";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const displayTime = isDragging ? dragProgress * duration : currentTime;
  const progressPercent = duration > 0 ? (displayTime / duration) * 100 : 0;

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateDragProgress(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updateDragProgress(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      const newProgress = updateDragProgress(e.clientX);
      onSeek(newProgress * duration);
    }
  };

  const updateDragProgress = (clientX: number) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const p = x / rect.width;
    setDragProgress(p);
    return p;
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalPointerUp = (e: PointerEvent) => {
        setIsDragging(false);
        const newProgress = updateDragProgress(e.clientX);
        onSeek(newProgress * duration);
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
  }, [isDragging, duration, onSeek]);

  return (
    <div className="w-full flex items-center gap-3 text-[11px] text-white/60 font-medium">
      <span className="w-8 text-right tabular-nums">{formatTime(displayTime)}</span>
      
      <div 
        className="flex-1 h-8 flex items-center cursor-pointer group"
        onPointerDown={handlePointerDown}
      >
        <div ref={trackRef} className="w-full h-1 bg-white/20 rounded-full relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-white rounded-full transition-all"
            style={{ 
              width: `${progressPercent}%`,
              transitionDuration: isDragging ? "0ms" : "300ms"
            }}
          />
        </div>
      </div>

      <span className="w-8 text-left tabular-nums">{formatTime(duration)}</span>
    </div>
  );
}

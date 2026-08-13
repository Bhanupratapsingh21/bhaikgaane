import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";

export function MusicLinks() {
  return (
    <div className="fixed top-4 right-5 z-40 flex items-center gap-3">
      {siteConfig.links.spotify && (
        <a
          href={siteConfig.links.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all text-xs font-medium drop-shadow-md"
        >
          {/* White Spotify Logo Icon */}
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.62.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span className="text-white font-medium">Spotify</span>
          <ExternalLink className="w-3 h-3 text-white/70 ml-0.5" />
        </a>
      )}
      {siteConfig.links.youtubeMusic && (
        <a
          href={siteConfig.links.youtubeMusic}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all text-xs font-medium drop-shadow-md"
        >
          {/* White YouTube Music Logo Icon */}
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
            <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.2c-3.972 0-7.2-3.228-7.2-7.2s3.228-7.2 7.2-7.2 7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2zm0-11.4c-2.316 0-4.2 1.884-4.2 4.2s1.884 4.2 4.2 4.2 4.2-1.884 4.2-4.2-1.884-4.2-4.2-4.2zm-1.8 6.12V10.08L14.4 12l-4.2 1.92z"/>
          </svg>
          <span className="text-white font-medium">YT Music</span>
          <ExternalLink className="w-3 h-3 text-white/70 ml-0.5" />
        </a>
      )}
    </div>
  );
}

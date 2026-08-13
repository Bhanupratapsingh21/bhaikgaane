import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";

export function MusicLinks() {
  return (
    <div className="fixed top-4 right-5 z-40 flex items-center gap-3">
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

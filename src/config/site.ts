export type PlayerMode = "youtube-playlist" | "manual";

export const siteConfig = {
  name: "Bhai Ke Gaane",
  background: "/background.webp",
  links: {
    youtubeMusic: "https://music.youtube.com/playlist?list=PLDAHcPH4H3D0",
  },
  youtube: {
    mode: "youtube-playlist" as PlayerMode,
    playlistId: "PLDAHcPH4H3D0",
    songs: [], // Manual fallback array
  },
};

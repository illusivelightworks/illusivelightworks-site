// The Watch page (/watch). Paste a link and the page works out the platform.
//
//   url     TikTok video, Instagram reel/post, or YouTube video/short  (required)
//   title   shown on the card before it is played                      (recommended)
//   poster  optional preview picture, e.g. '/img/showcase/cube.jpg'    (put the file in public/img/showcase/)
//           YouTube gets its own thumbnail automatically.
//
// Newest first. Examples:
//   { url: 'https://www.tiktok.com/@illusivelightworks/video/1234567890123456789', title: 'Mapping a cube in 60 seconds' },
//   { url: 'https://www.instagram.com/reel/ABCDEFG/', title: 'Festival visuals' },
//   { url: 'https://www.youtube.com/watch?v=XXXXXXXXXXX', title: 'Full tutorial' },
export type VideoEntry = { url: string; title?: string; poster?: string };

export const videos: VideoEntry[] = [];

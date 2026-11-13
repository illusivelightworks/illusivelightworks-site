// Reads a channel's Shorts and long videos at BUILD time (no API key, nothing runs in the visitor's browser).
// The result is saved to src/data/youtube-cache.json. If YouTube can't be reached during a build,
// the last saved copy is used, so the page never goes empty.
import fs from 'node:fs';
import path from 'node:path';

export type YtItem = { id: string; title: string; views?: string };
export type YtChannel = { shorts: YtItem[]; videos: YtItem[]; fetchedAt?: string };

const CACHE = path.join(process.cwd(), 'src/data/youtube-cache.json');
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';

function readCache(): YtChannel {
	try { return JSON.parse(fs.readFileSync(CACHE, 'utf-8')); } catch { return { shorts: [], videos: [] }; }
}

async function page(handle: string, tab: 'shorts' | 'videos'): Promise<any | null> {
	const res = await fetch(`https://www.youtube.com/${handle}/${tab}`, {
		headers: { 'user-agent': UA, 'accept-language': 'en-US,en;q=0.9', cookie: 'CONSENT=YES+1; SOCS=CAI' },
		signal: AbortSignal.timeout(15000),
	});
	if (!res.ok) return null;
	const html = await res.text();
	const m = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
	return m ? JSON.parse(m[1]) : null;
}

function walk(o: any, visit: (node: any) => void) {
	if (Array.isArray(o)) o.forEach((x) => walk(x, visit));
	else if (o && typeof o === 'object') { visit(o); Object.values(o).forEach((x) => walk(x, visit)); }
}

async function scrape(handle: string, tab: 'shorts' | 'videos'): Promise<YtItem[]> {
	// Two attempts: YouTube occasionally answers with a page that has no list in it.
	for (let attempt = 0; attempt < 2; attempt++) {
		try {
			const data = await page(handle, tab);
			const items: YtItem[] = []; const seen = new Set<string>();
			if (data) walk(data, (n) => {
				if (tab === 'shorts') {
					const v = n.shortsLockupViewModel; if (!v) return;
					const id = v.onTap?.innertubeCommand?.reelWatchEndpoint?.videoId;
					if (!id || seen.has(id)) return; seen.add(id);
					const fromA11y = String(v.accessibilityText ?? '').replace(/,\s*[\d.,KMB]+ views? - play Short\s*$/i, '').trim();
					items.push({ id, title: v.overlayMetadata?.primaryText?.content ?? (fromA11y || 'Short'), views: v.overlayMetadata?.secondaryText?.content });
				} else {
					const v = n.lockupViewModel; if (!v || v.contentType !== 'LOCKUP_CONTENT_TYPE_VIDEO') return;
					const id = v.contentId; if (!id || seen.has(id)) return; seen.add(id);
					items.push({ id, title: v.metadata?.lockupMetadataViewModel?.title?.content ?? 'Video' });
				}
			});
			if (items.length) return items;
		} catch (e) { console.warn(`[youtube] ${tab}: ${(e as Error).message}`); }
		await new Promise((ok) => setTimeout(ok, 1500));
	}
	return [];
}

export async function getChannel(handle: string): Promise<YtChannel> {
	const cached = readCache();
	// Each list is refreshed on its own. If one comes back empty, the saved copy of THAT list is kept, so a bad answer from
	// YouTube can never wipe out Shorts (or videos) that were shown before.
	const [shorts, videos] = [await scrape(handle, 'shorts'), await scrape(handle, 'videos')];
	const fresh: YtChannel = {
		shorts: shorts.length ? shorts : cached.shorts,
		videos: videos.length ? videos : cached.videos,
		fetchedAt: shorts.length && videos.length ? new Date().toISOString() : cached.fetchedAt,
	};
	if (!shorts.length) console.warn('[youtube] no Shorts found this time, keeping the saved list of', cached.shorts.length);
	if (!videos.length) console.warn('[youtube] no videos found this time, keeping the saved list of', cached.videos.length);
	if (fresh.shorts.length + fresh.videos.length > 0 && (shorts.length || videos.length)) {
		try { fs.writeFileSync(CACHE, JSON.stringify(fresh, null, 1)); } catch { /* read-only build is fine */ }
	}
	return fresh;
}

// "Do The Thing. Make The Art! #motivational #art" -> "Do The Thing. Make The Art!"
export function cleanTitle(t: string): string {
	return t.replace(/(\s*#[\p{L}\p{N}_]+)+\s*$/u, '').trim() || t;
}

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

export async function getChannel(handle: string): Promise<YtChannel> {
	const cached = readCache();
	try {
		const shorts: YtItem[] = [];
		const videos: YtItem[] = [];
		const seen = new Set<string>();

		const s = await page(handle, 'shorts');
		if (s) walk(s, (n) => {
			const v = n.shortsLockupViewModel;
			if (!v) return;
			const id = v.onTap?.innertubeCommand?.reelWatchEndpoint?.videoId;
			if (!id || seen.has(id)) return;
			seen.add(id);
			shorts.push({ id, title: v.overlayMetadata?.primaryText?.content ?? 'Short', views: v.overlayMetadata?.secondaryText?.content });
		});

		const l = await page(handle, 'videos');
		if (l) walk(l, (n) => {
			const v = n.lockupViewModel;
			if (!v || v.contentType !== 'LOCKUP_CONTENT_TYPE_VIDEO') return;
			const id = v.contentId;
			if (!id || seen.has(id)) return;
			seen.add(id);
			videos.push({ id, title: v.metadata?.lockupMetadataViewModel?.title?.content ?? 'Video' });
		});

		if (shorts.length + videos.length === 0) return cached;
		const fresh: YtChannel = { shorts, videos, fetchedAt: new Date().toISOString() };
		try { fs.writeFileSync(CACHE, JSON.stringify(fresh, null, 1)); } catch { /* read-only build is fine */ }
		return fresh;
	} catch (e) {
		console.warn('[youtube] could not read the channel, using the saved copy:', (e as Error).message);
		return cached;
	}
}

// "Do The Thing. Make The Art! #motivational #art" -> "Do The Thing. Make The Art!"
export function cleanTitle(t: string): string {
	return t.replace(/(\s*#[\p{L}\p{N}_]+)+\s*$/u, '').trim() || t;
}

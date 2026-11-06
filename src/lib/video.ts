import type { VideoEntry } from '../data/videos';

export type Platform = 'tiktok' | 'instagram' | 'youtube';
export type Parsed = VideoEntry & {
	platform: Platform;
	id: string;
	embed: string;
	portrait: boolean;
	thumb?: string;
	label: string;
};

export function parseVideo(v: VideoEntry): Parsed | null {
	let u: URL;
	try { u = new URL(v.url); } catch { return null; }
	const host = u.hostname.replace(/^www\./, '').replace(/^m\./, '');
	const path = u.pathname;

	if (host === 'tiktok.com') {
		const m = path.match(/\/video\/(\d+)/);
		if (!m) return null;
		return { ...v, platform: 'tiktok', id: m[1], embed: `https://www.tiktok.com/embed/v2/${m[1]}`, portrait: true, thumb: v.poster, label: 'TikTok' };
	}
	if (host === 'instagram.com') {
		const m = path.match(/\/(reel|reels|p|tv)\/([A-Za-z0-9_-]+)/);
		if (!m) return null;
		const kind = m[1] === 'reels' ? 'reel' : m[1];
		return { ...v, platform: 'instagram', id: m[2], embed: `https://www.instagram.com/${kind}/${m[2]}/embed`, portrait: kind !== 'p', thumb: v.poster, label: 'Instagram' };
	}
	if (host === 'youtube.com' || host === 'youtu.be' || host === 'youtube-nocookie.com') {
		let id = '';
		let shorts = false;
		if (host === 'youtu.be') id = path.slice(1);
		else if (path.startsWith('/shorts/')) { id = path.split('/')[2]; shorts = true; }
		else if (path.startsWith('/embed/')) id = path.split('/')[2];
		else id = u.searchParams.get('v') ?? '';
		if (!/^[A-Za-z0-9_-]{6,}$/.test(id)) return null;
		return {
			...v, platform: 'youtube', id, embed: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
			portrait: shorts, thumb: v.poster ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, label: 'YouTube',
		};
	}
	return null;
}

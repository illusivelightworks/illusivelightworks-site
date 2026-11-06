// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.illusivelightworks.com',
	integrations: [
		starlight({
			title: 'ILW Light Mapper',
			description: 'Guides and reference for ILW Light Mapper, the projection mapping app for iPhone, iPad and Mac.',
			logo: { src: './public/img/logomark.svg', alt: 'Illusive Lightworks' },
			favicon: '/favicon.png',
			social: [{ icon: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@illusivelightworks' }],
			customCss: ['./src/styles/theme.css'],
			// The landing page lives at / (src/pages/index.astro); everything documentation-related is under /docs/.
			sidebar: [
				{ label: 'Start here', items: [
					{ label: 'Quickstart', slug: 'docs' },
					{ label: 'Key ideas', slug: 'docs/concepts' },
					{ label: 'Main menu', slug: 'docs/main-menu' },
				]},
				{ label: 'Step 1: Align', items: [
					{ label: 'Choose artwork', slug: 'docs/step-1/artwork' },
					{ label: 'Align your grids', slug: 'docs/step-1/align' },
				]},
				{ label: 'Step 2: Refine', items: [
					{ label: 'Step 2 overview', slug: 'docs/step-2/overview' },
					{ label: 'Mask', slug: 'docs/step-2/mask' },
					{ label: 'Warp Paint', slug: 'docs/step-2/warp-paint' },
					{ label: 'Color', slug: 'docs/step-2/color' },
					{ label: 'Background Key', slug: 'docs/step-2/background-key' },
					{ label: 'Audio', slug: 'docs/step-2/audio' },
					{ label: 'Shader', slug: 'docs/step-2/shader' },
					{ label: 'Playback bar', slug: 'docs/step-2/playback' },
				]},
				{ label: 'Projects', items: [
					{ label: 'Saving and opening projects', slug: 'docs/projects' },
					{ label: 'Export and import (.ilwj)', slug: 'docs/export-import' },
				]},
				{ label: 'More', items: [
					{ label: 'Casting to a screen', slug: 'docs/casting' },
					{ label: 'Settings', slug: 'docs/settings' },
					{ label: 'Gestures and shortcuts', slug: 'docs/gestures' },
					{ label: 'Troubleshooting', slug: 'docs/troubleshooting' },
					{ label: 'Watch and share', link: '/watch/' },
				]},
			],
		}),
	],
});

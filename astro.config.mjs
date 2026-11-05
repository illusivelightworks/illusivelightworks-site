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
			customCss: ['./src/styles/theme.css'],
			// The landing page lives at / (src/pages/index.astro); everything documentation-related is under /docs/.
			sidebar: [
				{ label: 'Start here', items: [
					{ label: 'Welcome', slug: 'docs' },
					{ label: 'Your first projection', slug: 'docs/quick-start' },
					{ label: 'How it fits together', slug: 'docs/concepts' },
				]},
				{ label: 'The screens', items: [
					{ label: 'Main menu', slug: 'docs/main-menu' },
					{ label: 'Choosing artwork', slug: 'docs/artwork' },
					{ label: 'Corner calibration', slug: 'docs/calibration' },
					{ label: 'Final Display', slug: 'docs/final-display' },
				]},
				{ label: 'Tools', items: [
					{ label: 'Mask', slug: 'docs/tools/mask' },
					{ label: 'Warp Paint', slug: 'docs/tools/warp-paint' },
					{ label: 'Color', slug: 'docs/tools/color' },
					{ label: 'Background Key', slug: 'docs/tools/background-key' },
					{ label: 'Audio', slug: 'docs/tools/audio' },
					{ label: 'Shader', slug: 'docs/tools/shader' },
					{ label: 'Playback bar', slug: 'docs/tools/playback' },
				]},
				{ label: 'Projects', items: [
					{ label: 'Saving and saved setups', slug: 'docs/projects' },
					{ label: 'Export and import (.ilwj)', slug: 'docs/export-import' },
				]},
				{ label: 'More', items: [
					{ label: 'Casting to a screen', slug: 'docs/casting' },
					{ label: 'Settings', slug: 'docs/settings' },
					{ label: 'Gestures and shortcuts', slug: 'docs/gestures' },
					{ label: 'Troubleshooting', slug: 'docs/troubleshooting' },
				]},
			],
		}),
	],
});

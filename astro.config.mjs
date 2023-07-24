import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'http://deanti.wang',
	integrations: [vue(), mdx(), sitemap()],
	experimental: {
		assets: true
	},
});

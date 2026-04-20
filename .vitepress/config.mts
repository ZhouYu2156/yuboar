import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: '宇博大模型',
	titleTemplate: ':title 💝 宇博大模型官网',
	description: '宇博大模型官网，提供多种大模型一站式集成',
	lang: 'zh-CN',
	outDir: 'dist',
	ignoreDeadLinks: true,
	base: '/yuboar/',
	head: [
		['link', { rel: 'icon', type: 'image/png', href: '/yuboar/favicon.png' }],
		['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
		[
			'meta',
			{
				name: 'description',
				content:
					'我们提供从 AI 模型 API 直连到全链路资源管理的一体化服务。无论是需要快速集成高质量大模型能力以降本增效的团队，寻求稳定、兼容 OpenAI 生态的 API 接口支撑业务智能化升级的组织，还是希望通过可视化管理平台实现 API 调用监控、成本控制与权限分配的用户，均可通过我们的解决方案实现 “即接即用” 的 AI 赋能 —— 既能享受源头直供的高性价比模型资源，又能灵活适配不同场景下的智能化需求，助力高效落地 AI 应用，提升业务竞争力。',
			},
		],
		['meta', { name: 'keywords', content: '宇博大模型,API,模型,大模型,AI,人工智能' }],
		['meta', { name: 'author', content: 'Yuboar' }],
	],
	themeConfig: {
		logo: '/favicon.png',
		siteTitle: '宇博大模型',
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: '🎥 视频教程', link: '/video-tutorial' },
			{ text: '🔥 模型价格', link: '/model-price' },
			{ text: '📖 文档', link: '/model-price' },
			{ text: '📢 服务与价格承诺', link: '/service-and-price-commitment' },
			{ text: '🔍 常见问题', link: '/frequently-asked-questions' },
		],
	},
	vite: {
		plugins: [tailwindcss()],
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
				},
			},
		},
	},
})

<script setup lang="ts">
import { useData } from 'vitepress'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const modelList = [
	'DeepSeek 深度求索',
	'即梦绘图',
	'海螺视频',
	'可灵视频',
	'字节 豆包大模型',
	'阿里巴巴 Qwen',
	'月之暗面 moonshot Kimi',
	'智谱 GLM',
	'腾讯 混元大模型',
	'百度 文心一言',
	'讯飞 SparkDesk',
	'MINIMAX abab',
	'百川 Baichuan',
	'零一万物 yi',
	'阶跃星辰 stepfun',
	'支持ClaudeCode',
	'支持GPT-Codex',
	'支持Gemini-Cli',
]

const currentTypedText = ref(modelList[0])
const currentIndex = ref(0)
const isDeleting = ref(false)
const typewriteRef = ref<HTMLElement | null>(null)
const displayPeriod = ref(1500)
const { isDark } = useData()
let timer: number | null = null

const scheduleType = (delay: number) => {
	timer = window.setTimeout(runType, delay)
}

// 打字效果
const runType = () => {
	const currentModel = modelList[currentIndex.value]
	const fullLength = currentModel.length
	const currentLength = currentTypedText.value.length

	if (!isDeleting.value && currentLength < fullLength) {
		currentTypedText.value = currentModel.slice(0, currentLength + 1)
		scheduleType(65)
		return
	}

	if (!isDeleting.value && currentLength === fullLength) {
		isDeleting.value = true
		scheduleType(displayPeriod.value)
		return
	}

	if (isDeleting.value && currentLength > 0) {
		currentTypedText.value = currentModel.slice(0, currentLength - 1)
		scheduleType(35)
		return
	}

	isDeleting.value = false
	currentIndex.value = (currentIndex.value + 1) % modelList.length
	scheduleType(180)
}

onMounted(() => {
	const periodAttr = typewriteRef.value?.dataset.period
	const parsedPeriod = Number.parseInt(periodAttr ?? '', 10)
	if (Number.isFinite(parsedPeriod) && parsedPeriod > 0) {
		displayPeriod.value = parsedPeriod
	}

	currentTypedText.value = ''
	scheduleType(300)
})

onBeforeUnmount(() => {
	if (timer !== null) {
		window.clearTimeout(timer)
	}
})
</script>

<template>
	<main class="wrapper">
		<section
			class="hero"
			:class="{ 'hero--dark': isDark }">
			<div class="hero__glow hero__glow--left"></div>
			<div class="hero__glow hero__glow--right"></div>

			<div class="hero__content">
				<p class="hero__badge">Yuboar API 官方平台</p>
				<h1 class="hero__title">
					多种大模型一站式集成
					<span
						ref="typewriteRef"
						class="typewrite bg-linear-to-br from-amber-400 to-fuchsia-600 text-transparent bg-clip-text"
						data-period="2000"
						:data-type="JSON.stringify(modelList)">
						<span class="wrap">{{ currentTypedText }}</span>
					</span>
				</h1>
				<p class="hero__desc">
					Yuboar API 提供各大 AI 模型接口聚合管理服务，仅用一个接口即可体验不同平台的几十种大模型。
				</p>

				<div class="hero__features">
					<span>低价格</span>
					<span>高并发</span>
					<span>无次数限制</span>
					<span>多种模型可选</span>
				</div>

				<p class="hero__tip">1 元起充，按需付费；虚拟商品不支持退款</p>

				<div class="hero__actions">
					<a
						class="hero__button"
						href="/docs"
						>立即体验</a
					>
				</div>
			</div>
		</section>
	</main>
</template>

<style scoped>
@reference '../style.css';

main.wrapper {
	@apply min-h-[calc(100vh-var(--vp-nav-height))];
}

.hero {
	--hero-text: #1c2240;
	--hero-desc: rgba(28, 34, 64, 0.82);
	--hero-tip: rgba(49, 57, 94, 0.74);
	--hero-badge-text: #b54566;
	--hero-badge-bg: rgba(255, 255, 255, 0.62);
	--hero-badge-border: rgba(193, 119, 167, 0.3);
	--hero-feature-text: #2c2d53;
	--hero-feature-bg: rgba(255, 255, 255, 0.7);
	--hero-feature-border: rgba(143, 126, 214, 0.25);
	--hero-bg:
		radial-gradient(circle at 15% 20%, rgba(255, 147, 156, 0.38), transparent 42%),
		radial-gradient(circle at 82% 14%, rgba(135, 116, 255, 0.28), transparent 45%),
		linear-gradient(135deg, #f8ebff 0%, #ece8ff 48%, #dfeafe 100%);
	--hero-glow-left: rgba(255, 110, 154, 0.68);
	--hero-glow-right: rgba(136, 118, 255, 0.68);

	@apply relative grid place-items-center min-h-[calc(100vh-var(--vp-nav-height))] px-5 pt-16 pb-14 md:pt-20;
	background: var(--hero-bg);
	@apply overflow-hidden;
}

.hero__glow {
	@apply absolute rounded-full blur-[70px] opacity-[0.45] pointer-events-none;
}

.hero__glow--left {
	@apply w-[340px] h-[340px] -left-[120px] -bottom-20;
	background: var(--hero-glow-left);
}

.hero__glow--right {
	@apply w-80 h-80 -right-[100px] -top-[72px];
	background: var(--hero-glow-right);
}

.hero__content {
	@apply relative z-1 max-w-[920px] text-center;
	color: var(--hero-text);
}

.hero__badge {
	@apply inline-block px-4 py-2;
	border: 1px solid var(--hero-badge-border);
	@apply rounded-full;
	background: var(--hero-badge-bg);
	@apply text-sm font-semibold tracking-[0.08em];
	color: var(--hero-badge-text);
}

.hero__title {
	@apply mt-[18px] mx-auto max-w-[900px] text-[clamp(34px,5vw,62px)] leading-[1.18] font-extrabold tracking-[0.02em];
}

.typewrite {
	@apply block mt-2.5 min-h-[1.4em];
}

.wrap {
	@apply inline-block pr-1 border-r-2 border-r-current;
	animation: caret-blink 0.9s steps(1) infinite;
}

@keyframes caret-blink {
	0%,
	45% {
		border-right-color: currentColor;
	}

	46%,
	100% {
		border-right-color: transparent;
	}
}

.hero__desc {
	@apply mt-6 mx-auto text-[clamp(16px,2vw,20px)] leading-[1.7] max-w-[800px] md:leading-[1.6];
	color: var(--hero-desc);
}

.hero__features {
	@apply mt-6 flex flex-wrap gap-2.5 justify-center;
}

.hero__features span {
	@apply px-3.5 py-2 text-sm rounded-full max-md:text-[13px];
	background: var(--hero-feature-bg);
	border: 1px solid var(--hero-feature-border);
	color: var(--hero-feature-text);
}

.hero__tip {
	@apply mt-5 text-sm;
	color: var(--hero-tip);
}

.hero__actions {
	@apply mt-[30px];
}

.hero__button {
	@apply inline-flex items-center justify-center h-[46px] px-[26px] rounded-xl font-bold text-base;
	color: #151826;
	background: linear-gradient(90deg, #ffca45 0%, #ffb84a 100%);
	@apply shadow-[0_10px_24px_rgba(255,185,80,0.35)] transition duration-200 ease-out;
	transition-property: transform, box-shadow;
}

.hero__button:hover {
	@apply -translate-y-px shadow-[0_12px_28px_rgba(255,185,80,0.42)];
}

.hero.hero--dark {
	--hero-text: #eef2ff;
	--hero-desc: rgba(238, 242, 255, 0.9);
	--hero-tip: rgba(216, 221, 245, 0.9);
	--hero-badge-text: #ffd2d9;
	--hero-badge-bg: rgba(255, 255, 255, 0.07);
	--hero-badge-border: rgba(255, 255, 255, 0.18);
	--hero-feature-text: rgba(255, 244, 247, 0.96);
	--hero-feature-bg: rgba(255, 255, 255, 0.09);
	--hero-feature-border: rgba(255, 255, 255, 0.18);
	--hero-bg:
		radial-gradient(circle at 15% 20%, rgba(245, 129, 130, 0.35), transparent 40%),
		radial-gradient(circle at 82% 14%, rgba(103, 73, 255, 0.4), transparent 45%),
		linear-gradient(135deg, #131728 0%, #1f1a42 48%, #0c1126 100%);
	--hero-glow-left: rgba(245, 89, 136, 0.9);
	--hero-glow-right: rgba(127, 123, 255, 0.9);
}
</style>

# 宇博大模型聚合API平台

## 技术栈

- vitepress
- tailwindcss v4.2
- scss
- typescript
- vue3

## 代码编写规范

- `vue`文件代码遵循如下结构：

```vue
<script setup lang="ts"></script>

<template></template>

<style scoped>
@reference '../style.css';
</style>
```

- 代码尽量使用 `tailwindcss` 类名，以 `@apply` 指令组合原子类实现特定效果，尽量减少手动纯写 `css` 代码，例如：

```css
.hero__glow {
	@apply absolute rounded-full blur-[70px] opacity-[0.45] pointer-events-none;
}
```

## 首页

### Section 1

- 网站名称：Yuboar API
- 概要：多种大模型一站式集成
- 描述：Yuboar API提供各大AI模型接口聚合管理服务，仅用一个接口即可体验不同平台的几十种大模型
- 特色：低价格 / 高并发 / 无次数限制 / 多种模型可选
- 说明：本站充值为1元起，按需充值，虚拟商品不支持退款

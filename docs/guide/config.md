# 自定义配置

站点的主要配置集中在 `docs/.vitepress/config.mts`。以下是常用项的说明。

## 站点信息

```ts
export default defineConfig({
  lang: 'zh-CN',
  title: '项目文档',
  description: '基于 VitePress 与 GitHub Pages 构建的项目文档站',
  base: '/',
})
```

- **`title`** —— 显示在浏览器标签页和导航栏
- **`description`** —— 用于 SEO 和链接预览
- **`base`** —— 部署的基础路径。**本站为根路径 `/`，不要随意修改**

::: warning 修改 base 前先想清楚
`base` 决定静态资源的引用路径。仓库名为 `<用户名>.github.io` 时站点就在根路径，`base` 保持 `/`。

若改为其他仓库名，站点变成 `https://<用户名>.github.io/<仓库名>/`，则 `base` 必须同步改为 `/<仓库名>/`，否则 CSS 和 JS 全部 404。
:::

## 导航栏

```ts
themeConfig: {
  nav: [
    { text: '首页', link: '/' },
    { text: '指南', link: '/guide/', activeMatch: '/guide/' },
  ],
}
```

`activeMatch` 用于控制在哪些路径下该导航项高亮。

支持下拉菜单：

```ts
{
  text: '更多',
  items: [
    { text: 'GitHub', link: 'https://github.com/...' },
    { text: '更新日志', link: '/changelog' },
  ],
}
```

## 侧边栏

按路径分组配置，访问不同目录时自动切换：

```ts
sidebar: {
  '/guide/': [
    {
      text: '开始使用',
      collapsed: false,   // 是否默认折叠
      items: [
        { text: '快速开始', link: '/guide/' },
      ],
    },
  ],
}
```

## 首页布局

`docs/index.md` 使用 `layout: home`，支持三段式配置：

```markdown
---
layout: home

hero:
  name: 项目文档
  tagline: 一句话简介
  text: 主标题
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/

features:
  - icon: 📝
    title: 特性标题
    details: 特性描述
---
```

`actions` 的 `theme` 可选 `brand`（主色按钮）或 `alt`（次要按钮）。

## 搜索

本站使用本地搜索，构建时生成索引，无需任何外部服务：

```ts
search: {
  provider: 'local',
  options: {
    translations: { /* ...中文文案... */ },
  },
}
```

如需接入 Algolia DocSearch，改为：

```ts
search: {
  provider: 'algolia',
  options: {
    appId: '...',
    apiKey: '...',
    indexName: '...',
  },
}
```

## 页脚与编辑链接

```ts
footer: {
  message: '基于 VitePress 构建，由 GitHub Pages 托管。',
  copyright: 'Copyright © 2026',
},

editLink: {
  pattern: 'https://github.com/<用户>/<仓库>/edit/main/docs/:path',
  text: '在 GitHub 上编辑此页',
},
```

## 主题切换

VitePress 默认支持浅色 / 深色切换，右上角可手动切换，也可跟随系统：

```ts
appearance: true   // 默认值；设为 'dark' 可强制深色，false 则隐藏切换按钮
```

## 自定义样式

创建 `docs/.vitepress/theme/index.ts`：

```ts
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default DefaultTheme
```

对应 `docs/.vitepress/theme/custom.css`：

```css
:root {
  --vp-c-brand-1: #3c8772;
  --vp-c-brand-2: #348f76;
  --vp-c-brand-3: #299764;
}
```

改主题色时建议同时改 `config.mts` 中 `head` 里的 `theme-color`，保持浏览器地址栏配色一致。

## 完整配置参考

更详尽的配置项请查阅 [VitePress 官方配置文档](https://vitepress.dev/reference/site-config)。

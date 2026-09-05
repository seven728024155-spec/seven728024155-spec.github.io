import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '项目文档',
  description: '基于 VitePress 与 GitHub Pages 构建的项目文档站',

  // 站点根路径。仓库名是 <用户名>.github.io，所以免费域名就是根路径。
  // 以后绑定自定义域名（根路径）时，这个值不需要改动。
  base: '/',

  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '项目文档' }],
    ['meta', { property: 'og:description', content: '基于 VitePress 与 GitHub Pages 构建的项目文档站' }],
  ],

  markdown: {
    lineNumbers: true,
    // 代码块切换器显示的文字
    codeTransformers: [],
  },

  themeConfig: {
    // 深色/浅色切换的悬浮文字
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    outlineTitle: '本页目录',
    lastUpdatedText: '最后更新于',
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/', activeMatch: '/guide/' },
      { text: '部署', link: '/deploy/', activeMatch: '/deploy/' },
      { text: '软件下载', link: '/downloads' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始使用',
          items: [
            { text: '快速开始', link: '/guide/' },
            { text: '项目结构', link: '/guide/structure' },
            { text: '编写文档', link: '/guide/write' },
            { text: '自定义配置', link: '/guide/config' },
          ],
        },
      ],
      '/deploy/': [
        {
          text: '部署上线',
          items: [
            { text: '自动部署流程', link: '/deploy/' },
            { text: '绑定自定义域名', link: '/deploy/custom-domain' },
            { text: '常见问题', link: '/deploy/faq' },
          ],
        },
      ],
    },

    // 本地全文搜索，无需第三方服务
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '未找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/seven728024155-spec/seven728024155-spec.github.io' },
    ],

    footer: {
      message: '基于 VitePress 构建，由 GitHub Pages 托管。',
      copyright: 'Copyright © 2026 本站内容采用 MIT 许可发布',
    },

    editLink: {
      pattern: 'https://github.com/seven728024155-spec/seven728024155-spec.github.io/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },
  },
})

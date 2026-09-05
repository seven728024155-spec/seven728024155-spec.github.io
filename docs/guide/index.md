# 快速开始

本站点由 [VitePress](https://vitepress.dev/) 驱动，通过 GitHub Actions 自动部署到 GitHub Pages。你只需要写 Markdown，其余流程都是自动的。

## 本地预览

确保已安装 Node.js 18 或更高版本，然后在项目根目录执行：

```bash
# 安装依赖（仅首次）
npm install

# 启动本地开发服务器
npm run docs:dev
```

终端会输出一个本地地址（默认 `http://localhost:5173`），用浏览器打开即可预览。修改 Markdown 文件后页面会**热更新**，无需刷新。

## 写一篇新文档

在 `docs/` 目录下新建一个 `.md` 文件，例如 `docs/guide/hello.md`：

```markdown
# 你好世界

这是我的第一篇文档。
```

然后在 `docs/.vitepress/config.mts` 的侧边栏中加上这一条：

```ts
{ text: '你好世界', link: '/guide/hello' }
```

保存后，侧边栏会立即出现新页面。

## 发布上线

把改动提交并推送到 `main` 分支：

```bash
git add .
git commit -m "docs: 新增一篇文档"
git push origin main
```

推送后 GitHub Actions 会自动构建并部署。通常在 **1 分钟内** 线上站点就会更新，你可以在仓库的 **Actions** 标签页查看进度。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run docs:dev` | 启动本地开发服务器（带热更新） |
| `npm run docs:build` | 构建静态站点到 `docs/.vitepress/dist` |
| `npm run docs:preview` | 本地预览构建产物，用于检查线上效果 |

::: tip
`docs:preview` 预览的是**构建后**的产物，与线上环境更接近。发布前建议跑一次，能发现只在生产构建中出现的问题（例如死链、资源路径错误）。
:::

## 下一步

- [项目结构](./structure.md) —— 了解每个目录和文件的作用
- [编写文档](./write.md) —— Markdown 扩展语法与容器块用法
- [自动部署流程](../deploy/index.md) —— 弄清楚推送之后发生了什么

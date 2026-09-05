# 项目文档站

基于 [VitePress](https://vitepress.dev/) 构建，通过 GitHub Actions 自动部署到 GitHub Pages。

- **线上地址**：https://seven728024155-spec.github.io/
- **仓库地址**：https://github.com/seven728024155-spec/seven728024155-spec.github.io

推送 Markdown 到 `main` 分支即自动发布，无需手动构建。

## 本地开发

需要 Node.js 18 或更高版本。

```bash
npm install          # 安装依赖
npm run docs:dev     # 启动本地开发服务器（默认 http://localhost:5173）
```

其他命令：

```bash
npm run docs:build    # 构建静态站点到 docs/.vitepress/dist
npm run docs:preview  # 本地预览构建产物
```

## 目录结构

```
docs/
├── .vitepress/config.mts   # 站点配置：导航、侧边栏、搜索、页脚
├── public/                 # 静态资源，原样复制到站点根目录
├── guide/                  # 使用指南
├── deploy/                 # 部署说明
└── index.md                # 首页
```

在 `docs/` 下新建 `.md` 文件即新增一篇文档，然后在 `config.mts` 的侧边栏中登记即可。

## 部署方式

代码推送到 `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并发布到 GitHub Pages，通常 1 分钟内生效。

首次使用需确认两处仓库设置：

1. **Settings → Pages → Source** 选择 **GitHub Actions**
2. **Settings → Actions → General → Workflow permissions** 选择 **Read and write permissions**

## 绑定自定义域名

参见站点内的[绑定自定义域名](https://seven728024155-spec.github.io/deploy/custom-domain)文档。

要点：先在仓库 **Settings → Pages** 填写域名，再去 DNS 服务商添加解析记录。本站通过 Actions 部署，**不需要** CNAME 文件。

## 许可

文档内容采用 MIT 许可发布。

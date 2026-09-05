# 自动部署流程

本站采用 **GitHub Actions 构建 + GitHub Pages 托管** 的方式：源码在 `main` 分支，构建与发布全部由 Actions 完成。

## 工作流做了什么

配置文件位于 `.github/workflows/deploy.yml`，分为两个 Job：

```
push 到 main 分支
        │
        ▼
   ┌─────────┐
   │  build  │  检出代码 → 安装 Node → npm ci → npm run docs:build
   └────┬────┘
        │  上传 dist 作为 artifact
        ▼
   ┌─────────┐
   │ deploy  │  把 artifact 发布到 GitHub Pages
   └─────────┘
        │
        ▼
   站点更新（通常 30~60 秒）
```

### build 阶段

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0      # 拉取完整历史，供"最后更新于"读取提交时间
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: npm           # 缓存 node_modules，加速后续构建
- run: npm ci            # 严格按 package-lock.json 安装，保证可复现
- run: npm run docs:build
- uses: actions/upload-pages-artifact@v3
  with:
    path: docs/.vitepress/dist
```

### deploy 阶段

```yaml
- uses: actions/deploy-pages@v4
```

部署到名为 `github-pages` 的环境，完成后把站点 URL 输出到 Job 摘要。

## 触发条件

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
```

- 推送到 `main` 分支时自动运行
- `workflow_dispatch` 允许在 Actions 页面**手动触发**，不需要为了重新部署而制造一次空提交

## 权限配置

工作流顶部声明了最小必要权限：

```yaml
permissions:
  contents: read    # 读取代码
  pages: write      # 写入 Pages
  id-token: write   # OIDC 身份验证，用于安全部署
```

::: warning 检查 Actions 权限
如果首次部署报权限错误，需要确认：
仓库 **Settings → Actions → General → Workflow permissions** 选中的是 **Read and write permissions**。

另外，仓库 **Settings → Pages → Source** 必须设置为 **GitHub Actions**，而不是 "Deploy from a branch"。
:::

## 并发控制

```yaml
concurrency:
  group: pages
  cancel-in-progress: false
```

同一时间只允许一个部署任务排队执行，不会互相覆盖；`cancel-in-progress: false` 确保正在进行的部署不会被中途取消，避免出现半更新状态。

## 查看部署状态

- 仓库 **Actions** 标签页：查看每次构建日志
- 仓库 **Settings → Pages**：查看当前线上版本与访问地址
- 仓库主页右侧 **Environments** 区域：点击 `github-pages` 查看历史部署记录

## 本地验证构建

推送前先本地跑一遍构建，可以提前发现问题：

```bash
npm run docs:build
npm run docs:preview
```

VitePress 在构建阶段会校验站内链接，死链会导致构建失败——这是好事，能拦住坏链接上线。

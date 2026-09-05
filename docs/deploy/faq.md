# 常见问题

## 部署相关

### 推送后 Actions 没有触发

依次检查：

1. 推送的是否为 `main` 分支（工作流只监听 `main`）
2. 仓库 **Settings → Actions → General** 中 Actions 是否被禁用
3. `.github/workflows/deploy.yml` 的 YAML 缩进是否正确——缩进错误会让 GitHub 直接忽略该文件
4. 仓库根目录是否有 `.github/workflows/` 这个路径（注意 `.github` 前的点）

### 部署失败：权限不足

仓库 **Settings → Actions → General → Workflow permissions** 需要选 **Read and write permissions**。

### 页面 404 或访问空白

- 确认 **Settings → Pages → Source** 是 **GitHub Actions**
- 确认上传的路径是 `docs/.vitepress/dist`（与你的构建输出目录一致）
- 如果绑定了自定义域名，确认 DNS 解析已生效

### 首页正常但子页面 404

检查 `config.mts` 中的 `base`。本站使用 `<用户名>.github.io` 仓库，站点位于根路径，`base` 必须是 `/`。

如果仓库名不是 `<用户名>.github.io`，站点地址会带子路径（如 `/<仓库名>/`），此时 `base` 需要改成 `/<仓库名>/`。

## 本地开发

### 端口被占用

```bash
npm run docs:dev -- --port 5174
```

### 修改配置后不生效

`config.mts` 的改动 VitePress 通常会自动重启开发服务器。若未生效，手动停掉进程再启动。

### 构建报死链错误

VitePress 构建时会检查站内链接。常见原因：

- 链接路径写错（大小写敏感）
- 目标文件还没创建
- 用绝对路径 `/guide/xxx` 但实际文件在别的目录

推荐在 Markdown 中使用**相对路径 + .md 后缀**，例如 `[快速开始](../guide/index.md)`，VitePress 能更可靠地解析。

## 内容相关

### 侧边栏没有显示新页面

侧边栏需要在 `config.mts` 中显式声明。新建 `.md` 文件后，记得在对应分组的 `items` 里加一行。

### "最后更新于"显示时间不对

该时间来自 git 提交记录。需要工作流中 `actions/checkout` 设置 `fetch-depth: 0` 拉取完整历史，否则 CI 环境里只有浅克隆，时间会显示为构建时间。

### 搜索搜不到刚加的内容

本地搜索索引在**构建时**生成。开发模式下搜索可能不完整，执行一次 `npm run docs:build` 后再用 `docs:preview` 预览即可验证。

## 域名相关

### 自定义域名配置后仍无法访问

1. DNS 是否生效（最长 24 小时）
2. GitHub 仓库 Settings → Pages 里是否正确显示域名
3. 是否有冲突的 DNS 记录（尤其服务商自动创建的默认 `@` 记录）
4. 是否误用了通配符记录

### Enforce HTTPS 选项不可勾选

DNS 尚未生效，或证书还在签发中。等解析生效后回来勾选。详见[绑定自定义域名](./custom-domain.md)。

### 用 Actions 部署，还需要 CNAME 文件吗

不需要。GitHub 官方文档明确：通过自定义 Actions 工作流发布时，系统不会创建 `CNAME` 文件，仓库中已有的 `CNAME` 文件也会被忽略。域名只需在 **Settings → Pages** 中填写。

## 其他

### 如何删除已发布的内容

删除或改名 `.md` 文件后推送即可，Actions 会重新构建。记得同步清理 `config.mts` 里对应的侧边栏条目，否则会留下死链导致构建失败。

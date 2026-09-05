# 项目结构

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml        # 自动构建与部署的工作流
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts        # 站点配置（导航、侧边栏、搜索）
│   │   └── dist/             # 构建产物（本地生成，已 git 忽略）
│   ├── public/               # 静态资源，会被原样复制到站点根目录
│   ├── guide/                # 指南文档
│   ├── deploy/               # 部署文档
│   └── index.md              # 首页
├── .gitignore
├── package.json
└── README.md
```

## 各目录说明

### `docs/`

**文档源文件根目录**。VitePress 会把这个目录下的 `.md` 文件按相对路径映射成站点路由：

| 文件路径 | 访问路径 |
| --- | --- |
| `docs/index.md` | `/` |
| `docs/guide/index.md` | `/guide/` |
| `docs/guide/structure.md` | `/guide/structure` |
| `docs/deploy/custom-domain.md` | `/deploy/custom-domain` |

::: warning
不要在 `docs/` 下放以 `.` 或 `_` 开头的文件或目录，它们不会被输出到站点。需要原样发布的静态资源请放 `docs/public/`。
:::

### `docs/.vitepress/`

VitePress 的配置与缓存目录。其中：

- **`config.mts`** —— 站点配置，导航栏、侧边栏、搜索、页脚都在这里定义。
- **`dist/`** —— 构建产物，已加入 `.gitignore`，不要提交。
- **`cache/`** —— 构建缓存，同样已忽略。

### `docs/public/`

存放需要**原样复制**到站点根目录的静态资源，例如 `favicon.ico`、`robots.txt`、`og-image.png` 等。

引用方式使用根路径：

```markdown
![站点 Logo](/logo.png)
```

放在 `docs/public/logo.png` 的文件，构建后即可通过 `/logo.png` 访问。

### `.github/workflows/`

GitHub Actions 工作流定义。本项目的 `deploy.yml` 负责在推送到 `main` 分支后自动构建并发布到 GitHub Pages。详见[自动部署流程](../deploy/index.md)。

## 需要改动哪些文件

| 你想做的事 | 改哪个文件 |
| --- | --- |
| 改站点名称、导航、页脚 | `docs/.vitepress/config.mts` |
| 加一篇文档 | `docs/` 下新建 `.md`，再更新 `config.mts` 的侧边栏 |
| 换 Logo / favicon | `docs/public/`，并更新 `config.mts` 的 `head` 与 `themeConfig.logo` |
| 改首页内容 | `docs/index.md` |
| 改构建或部署行为 | `.github/workflows/deploy.yml` |

## favicon 与社交媒体预览图

在 `config.mts` 的 `head` 中加入：

```ts
head: [
  ['link', { rel: 'icon', href: '/favicon.ico' }],
  ['meta', { property: 'og:image', content: '/og-image.png' }],
]
```

对应的图片文件放在 `docs/public/` 下。

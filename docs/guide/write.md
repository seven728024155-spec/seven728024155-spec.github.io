# 编写文档

本站使用标准 Markdown，并启用了 VitePress 的一些扩展能力。

## Frontmatter

每个 `.md` 文件顶部可以用三横线包裹的 YAML 块设置页面级属性：

```markdown
---
title: 页面标题
description: 用于搜索引擎和链接预览的描述文字
outline: deep        # 目录层级：false | number | [2,3] | 'deep'
prev: false          # 不显示"上一篇"
---
```

`title` 不填时，默认取文件中第一个 `#` 一级标题。

## 容器块

三种提示容器，用于强调不同性质的信息：

::: tip 提示
用于补充说明或最佳实践。
:::

::: info 信息
用于中性的背景说明。
:::

::: warning 注意
用于容易踩坑的地方。
:::

::: danger 警告
用于可能造成数据丢失或安全问题的操作。
:::

对应写法：

```markdown
::: tip 提示
用于补充说明或最佳实践。
:::

::: info 信息
用于中性的背景说明。
:::

::: warning 注意
用于容易踩坑的地方。
:::

::: danger 警告
用于可能造成数据丢失或安全问题的操作。
:::
```

## 代码块

支持语法高亮与行号。在语言名后追加 `{highlight}` 可高亮指定行：

````markdown
```ts{2}
const a = 1
const b = 2 // 这一行会高亮
const c = 3
```
````

代码组（多个语言标签切换）：

````markdown
::: code-group

```bash [npm]
npm install
```

```bash [pnpm]
pnpm install
```

:::
````

## 表格

```markdown
| 命令 | 作用 |
| --- | :--: |
| `docs:dev` | 本地预览 |
| `docs:build` | 构建 |
```

## 内部链接

站内链接推荐使用**相对路径**并带上 `.md` 后缀，这样 VitePress 会在链接失效时给出构建错误：

```markdown
[项目结构](./structure.md)
[部署流程](../deploy/index.md)
```

## 图片与静态资源

需要随站点发布的图片放在 `docs/public/`，用根路径引用：

```markdown
![示意图](/images/diagram.png)
```

## 折叠块

```markdown
<details>
<summary>点击展开详细说明</summary>

这里是被折叠的内容，支持 **Markdown**。

</details>
```

<details>
<summary>点击展开详细说明</summary>

这里是被折叠的内容，支持 **Markdown**。

</details>

## 构建前的检查

VitePress 在构建时会校验所有站内链接。如果链接指向不存在的页面，构建会**失败并报错**。这能在发布前就拦住死链，因此建议提交前跑一次：

```bash
npm run docs:build
```

# 绑定自定义域名

本站使用 GitHub Actions 部署，默认地址是 `https://seven728024155-spec.github.io`。绑定自己的域名只需两步：**先在 GitHub 填域名，再去 DNS 服务商加记录**。

::: danger 顺序不能反
一定要**先**在 GitHub 仓库设置里添加自定义域名，**再**去 DNS 服务商配置解析。
如果反过来，在域名尚未归属到你的 GitHub Pages 时就把 DNS 指过去，其他人有可能抢注并托管到你域名的某个子域上。
:::

## 第一步：在 GitHub 填写域名

1. 打开仓库 → **Settings** → 左侧 **Pages**
2. 在 **Custom domain** 输入框填入你的域名（例如 `example.com` 或 `www.example.com`）
3. 点击 **Save**

::: tip 关于 CNAME 文件
本站通过 GitHub Actions 部署，因此**不需要**手动创建 `CNAME` 文件。
GitHub 官方文档说明：从自定义 Actions 工作流发布时，系统不会创建 `CNAME` 文件，且仓库中已有的 `CNAME` 文件**会被忽略**。

网上不少教程还让你在仓库根目录建 `CNAME` 文件——那是针对"从分支直接发布"的老方式，本站不适用。
:::

保存后建议顺便勾选 **Enforce HTTPS**（强制 HTTPS）。该选项在 DNS 生效前可能不可选，属于正常现象，等解析生效后再回来勾选即可。

## 第二步：配置 DNS 记录

根据你使用的域名类型，按下表在 DNS 服务商处添加记录。

### 根域名（example.com）

需要 **同时** 添加全部 A 记录和 AAAA 记录：

| 类型 | 主机名 | 记录值 |
| --- | --- | --- |
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `AAAA` | `@` | `2606:50c0:8000::153` |
| `AAAA` | `@` | `2606:50c0:8001::153` |
| `AAAA` | `@` | `2606:50c0:8002::153` |
| `AAAA` | `@` | `2606:50c0:8003::153` |

如果你的 DNS 服务商支持 `ALIAS` 或 `ANAME`，也可以用**一条**记录替代上面全部 8 条：

| 类型 | 主机名 | 记录值 |
| --- | --- | --- |
| `ALIAS` / `ANAME` | `@` | `seven728024155-spec.github.io` |

`ALIAS`/`ANAME` 更省心——GitHub 的 IP 万一调整，你不用跟着改记录。

### www 子域名（www.example.com）

| 类型 | 主机名 | 记录值 |
| --- | --- | --- |
| `CNAME` | `www` | `seven728024155-spec.github.io` |

注意 CNAME 的值**只写 `<用户名>.github.io`，不要带仓库名**。

### 自定义子域名（docs.example.com）

| 类型 | 主机名 | 记录值 |
| --- | --- | --- |
| `CNAME` | `docs` | `seven728024155-spec.github.io` |

## 第三步：验证解析

DNS 改动最长需要 **24 小时** 才能全球生效。

Windows 没有 `dig` 命令，用 PowerShell 的 `Resolve-DnsName` 检查：

```powershell
# 检查根域名的 A 记录
Resolve-DnsName example.com -Type A

# 检查 www 的 CNAME
Resolve-DnsName www.example.com -Type CNAME
```

看到返回值与上面表格一致，说明 DNS 已配置正确。

## 关于 www 与根域名的跳转

官方推荐：如果绑定了根域名，**同时**把 `www` 也配上 CNAME。两边记录都正确时，GitHub Pages 会自动做跳转：

- 主域名设为 `example.com` → `www.example.com` 自动跳转到 `example.com`
- 主域名设为 `www.example.com` → `example.com` 自动跳转到 `www.example.com`

## 常见问题与注意事项

::: warning 不要用通配符记录
不要配置 `*.example.com` 这类通配符记录。即使你的域名已通过验证，通配符仍会带来域名被劫持的风险——验证 `example.com` 只能阻止别人用 `a.example.com`，挡不住 `b.a.example.com`。
:::

::: warning 先删掉默认的 @ 记录
部分服务商会为根域名自动创建一条默认 A 记录（常指向自己的停放页）。添加 GitHub 的 A 记录前，需要先把这条默认记录删掉，否则会冲突。
:::

**国内注册商（阿里云 / 腾讯云等）特别注意：**

- `.cn` 等国内后缀域名需要完成**实名认证**才能正常解析，未实名会被暂停解析（serverhold）。
- 国内服务商的 DNS 生效通常较快，几分钟到数小时。
- 若域名要用于境内服务器，还需 ICP 备案；**仅解析到 GitHub Pages（境外）不需要备案**。

**Cloudflare 用户注意：**

- 使用 `ALIAS`/`ANAME` 时，若开启橙色云（代理模式）可能导致证书签发异常，可先切到"仅 DNS"灰色云模式。
- Cloudflare 的 CNAME flattening 会自动把根域名 CNAME 展开为 A 记录，与手动配置 A 记录效果相同。

## HTTPS 证书

GitHub 会为自定义域名自动签发 Let's Encrypt 证书，免费且自动续期。DNS 生效后回到 Settings → Pages 勾选 **Enforce HTTPS** 即可。

证书签发需要一定时间，通常在解析生效后 1 小时内完成。若长时间显示"证书未就绪"，检查是否存在上面的 Cloudflare 代理或 CAA 记录限制。

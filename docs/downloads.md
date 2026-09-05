# 软件下载

本页提供的软件均为 **Windows x64** 免安装单文件程序，下载后双击即可运行，无需安装。

所有文件托管在 GitHub Releases，下载前可核对 SHA256 校验值以确保文件完整。

## 民事执行利息计算器

计算民事执行程序中的迟延履行利息，在线联机版。

- **版本**：v1.0（2026-09-05）
- **大小**：38.7 MB
- **SHA256**：`5ab90df859e914946350863c017251ebba09e7fdc31f1ab5d4765baf180717ec`
- **下载**：[民事执行利息计算器.exe](https://github.com/seven728024155-spec/seven728024155-spec.github.io/releases/download/v1.0/民事执行利息计算器.exe)

## 民事执行利息计算器（离线版）

与上面功能相同，完全离线运行，无网络依赖。

- **版本**：v1.0（2026-09-05）
- **大小**：38.7 MB
- **SHA256**：`ed72d61c5a9b573879353b1bd0331788e6465ef3ed80d511281e16582cbbd80b`
- **下载**：[民事执行利息计算器_离线版.exe](https://github.com/seven728024155-spec/seven728024155-spec.github.io/releases/download/v1.0/民事执行利息计算器_离线版.exe)

## 图片压缩工具

本地批量压缩图片，文件不上传服务器。

- **版本**：v1.0（2026-09-05）
- **大小**：28.9 MB
- **SHA256**：`beace394c5e3f53972972261be5dd4671ce8dbe0d027434de922331a11550493`
- **下载**：[图片压缩工具.exe](https://github.com/seven728024155-spec/seven728024155-spec.github.io/releases/download/v1.0/图片压缩工具.exe)

## 校验文件完整性

Windows 命令行（CMD 或 PowerShell）执行：

```bash
certutil -hashfile "下载的文件名.exe" SHA256
```

将输出与上方各软件标注的 SHA256 值比对，一致即文件完整。

::: warning 杀毒软件误报
单文件打包的 Python 程序（PyInstaller）偶尔会被杀毒软件误报。所有文件均已提供 SHA256 校验值——只要校验一致且下载自本页链接，可以放心添加信任。
:::

## 更新日志

| 版本 | 日期 | 说明 |
| --- | --- | --- |
| v1.0 | 2026-09-05 | 首次发布：民事执行利息计算器（在线/离线）、图片压缩工具 |

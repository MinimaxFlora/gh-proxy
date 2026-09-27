# 项目介绍

`gh-proxy` 是一个用于加速 GitHub 资源下载的中间层服务。它把 GitHub 上常用的下载链接，通过部署在 Cloudflare Workers 上的代理服务转发出去，从而获得更稳定、更快速的下载体验。

它特别适合以下场景：

- 下载 release 发布包、archive 源码包时速度缓慢；
- 拉取 `raw.githubusercontent.com`、`gist.githubusercontent.com` 上的文件；
- 使用 `git clone` 拉取较大的仓库；
- 不想安装任何客户端，只想在链接前加一个域名即可加速。

## 核心特性

| 能力 | 说明 |
| --- | --- |
| 边缘加速 | 基于 Cloudflare Workers，请求就近接入，全球访问更快 |
| 全格式支持 | release、archive、blob/raw 文件、gist、tags 等均支持 |
| 支持 Clone | 在仓库地址前加加速域名即可加速 `git clone` |
| 免登录 | 公开资源无需任何账号即可下载 |
| 双版本 | 提供 Cloudflare Workers 与 Python（Flask）两种部署方式 |
| 可自定义 | 支持白名单、黑名单、jsDelivr 镜像、文件大小限制等配置 |

## 两个版本的差异

项目同时提供 Cloudflare Workers 版本（`index.js`）与 Python 版本（`app/main.py`），两者能力基本一致：

- **Cloudflare Workers 版本**：免服务器，部署简单，适合个人和小规模使用，免费额度为每天 10 万次请求。
- **Python 版本**：可自行托管在服务器上，支持文件大小限制、特定 `user/repo` 的封禁/白名单以及 passby 等更细粒度的控制。

## 工作原理

```text
浏览器 / git
      │  请求 https://加速域名/<GitHub 原始链接>
      ▼
gh-proxy 服务（Cloudflare Worker 或 Python 服务）
      │  识别链接类型后转发请求
      ▼
GitHub（release / archive / raw / gist ...）
```

当访问的路径不是一个可识别的 GitHub 链接时，服务会把它当作静态资源，回落到配置好的 `ASSET_URL`（也就是本网站），因此本站既是在线工具页，也是服务的主页。

## 相关链接

- 上游项目：[hunshcn/gh-proxy](https://github.com/hunshcn/gh-proxy)
- 本项目仓库：[MinimaxFlora/gh-proxy](https://github.com/MinimaxFlora/gh-proxy)
- 参考实现：[jsproxy](https://github.com/EtherDream/jsproxy/)

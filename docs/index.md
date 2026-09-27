---
layout: home
title: gh-proxy
titleTemplate: GitHub 文件加速

hero:
  name: gh-proxy
  text: GitHub 文件加速
  tagline: 一键加速 GitHub 的 Release、Archive、源码文件与 Git Clone。基于 Cloudflare Workers 全球边缘网络，免登录，开箱即用。
  image:
    src: /hero.svg
    alt: gh-proxy
  actions:
    - theme: brand
      text: 立即加速
      link: "#proxy-tool"
    - theme: alt
      text: 使用文档
      link: /guide/usage
---

<script setup>
import ProxyTool from "./.vitepress/theme/components/ProxyTool.vue";
</script>

<ProxyTool />

<div class="home-section">
  <h2 class="home-section__title">核心特性</h2>
  <p class="home-section__desc">为加速而生的 GitHub 下载中间层，覆盖绝大多数日常使用场景。</p>

  <div class="feature-grid">
    <div class="feature-card">
      <div class="feature-card__icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
        </svg>
      </div>
      <h3>全球边缘加速</h3>
      <p>部署在 Cloudflare Workers 边缘节点，请求就近接入，下载更稳更快，无需自建服务器。</p>
    </div>
    <div class="feature-card">
      <div class="feature-card__icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
          />
        </svg>
      </div>
      <h3>全格式支持</h3>
      <p>覆盖 release、archive、blob/raw 文件、gist 以及 tags，右键复制的链接通常都能直接用。</p>
    </div>
    <div class="feature-card">
      <div class="feature-card__icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a5 5 0 0 0-5 5c0 1.5.66 2.84 1.7 3.76A7 7 0 0 0 5 17v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3h6v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a7 7 0 0 0-3.7-6.24A5 5 0 0 0 12 2Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
          />
        </svg>
      </div>
      <h3>支持 Git Clone</h3>
      <p>在仓库地址前加上加速域名即可 clone，大型仓库的首次拉取同样受益。</p>
    </div>
    <div class="feature-card">
      <div class="feature-card__icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Zm0 6a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 12.5c-2.5-.9-4-3.5-4-6.5h8c0 3-1.5 5.6-4 6.5Z"
          />
        </svg>
      </div>
      <h3>免登录可用</h3>
      <p>无需账号与 Token 即可加速公开资源，私有仓库可通过链接内嵌 Token 访问。</p>
    </div>
  </div>
</div>

<div class="home-section">
  <h2 class="home-section__title">支持的链接类型</h2>
  <p class="home-section__desc">在下面的原始链接前加上你的加速域名即可下载，带不带协议头都可以。</p>

  <table class="link-type">
    <tbody>
      <tr>
        <td>分支源码</td>
        <td><code>https://github.com/user/repo/archive/refs/heads/master.zip</code></td>
      </tr>
      <tr>
        <td>Release 源码</td>
        <td><code>https://github.com/user/repo/archive/v0.1.0.tar.gz</code></td>
      </tr>
      <tr>
        <td>Release 文件</td>
        <td><code>https://github.com/user/repo/releases/download/v0.1.0/example.zip</code></td>
      </tr>
      <tr>
        <td>分支文件</td>
        <td><code>https://github.com/user/repo/blob/master/filename</code></td>
      </tr>
      <tr>
        <td>Raw 文件</td>
        <td><code>https://raw.githubusercontent.com/user/repo/master/filename</code></td>
      </tr>
      <tr>
        <td>Gist</td>
        <td><code>https://gist.githubusercontent.com/user/id/raw/cmd.py</code></td>
      </tr>
      <tr>
        <td>Git Clone</td>
        <td><code>git clone https://加速域名/https://github.com/user/repo</code></td>
      </tr>
    </tbody>
  </table>
</div>

<div class="home-section">
  <h2 class="home-section__title">三步开始使用</h2>
  <p class="home-section__desc">以上面输入框为例，粘贴链接后点击「加速下载」即可。</p>

  1. 复制 GitHub 的下载链接（release、archive、blob 等）。
  2. 在上方输入框中粘贴链接，选择或填写加速域名。
  3. 点击「加速下载」，或复制生成的加速地址给下载工具使用。

  ::: tip 更多玩法
  支持 git clone、私有仓库 Token 访问、jsDelivr 镜像等进阶用法，请阅读 [快速使用](/guide/usage) 与 [Clone 与私有仓库](/guide/advanced)。
  :::
</div>

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

<div class="home-below">
  <div class="home-scroll-cue" aria-hidden="true">
    <span class="home-scroll-cue__text">下拉使用在线加速</span>
    <svg class="home-scroll-cue__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  </div>

  <ProxyTool />
</div>

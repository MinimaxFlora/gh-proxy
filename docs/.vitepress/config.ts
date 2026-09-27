import { defineConfig } from "vitepress";
import { teekConfig } from "./teekConfig";

// 站点部署路径：GitHub Pages 项目站点为 /<仓库名>/，Fork 后请同步修改
const BASE = "/gh-proxy/";

const description =
  "gh-proxy：GitHub 文件加速服务，支持 release、archive、blob/raw 文件、gist 以及 git clone，提供 Cloudflare Workers 与 Python 双版本部署。";

export default defineConfig({
  extends: teekConfig,
  base: BASE,
  title: "gh-proxy",
  description,
  lang: "zh-CN",
  lastUpdated: true,
  cleanUrls: false,
  head: [
    // 注意：head 中的链接不会自动追加 base，需要手动拼接
    ["link", { rel: "icon", type: "image/svg+xml", href: `${BASE}logo.svg` }],
    ["link", { rel: "apple-touch-icon", href: `${BASE}logo.svg` }],
    ["meta", { name: "theme-color", content: "#4f46e5" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "gh-proxy | GitHub 文件加速" }],
    ["meta", { property: "og:description", content: description }],
    [
      "meta",
      {
        name: "keywords",
        content: "gh-proxy,GitHub 加速,GitHub 代理,release 加速,clone 加速,Cloudflare Workers",
      },
    ],
  ],
  markdown: {
    lineNumbers: true,
    image: { lazyLoading: true },
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  sitemap: {
    hostname: "https://minimaxflora.github.io/gh-proxy/",
  },
  themeConfig: {
    logo: "/logo.svg",
    outline: { level: [2, 3], label: "本页导航" },
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/intro", activeMatch: "/guide/(intro|usage|advanced)" },
      { text: "部署", link: "/guide/deploy" },
      { text: "常见问题", link: "/guide/faq" },
      { text: "GitHub", link: "https://github.com/MinimaxFlora/gh-proxy" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "使用指南",
          items: [
            { text: "项目介绍", link: "/guide/intro" },
            { text: "快速使用", link: "/guide/usage" },
            { text: "Clone 与私有仓库", link: "/guide/advanced" },
            { text: "部署自己的服务", link: "/guide/deploy" },
            { text: "常见问题", link: "/guide/faq" },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/MinimaxFlora/gh-proxy" },
    ],
    search: { provider: "local" },
    editLink: {
      text: "在 GitHub 上编辑此页",
      pattern: "https://github.com/MinimaxFlora/gh-proxy/edit/master/docs/:path",
    },
    lastUpdatedText: "上次更新时间",
    docFooter: { prev: "上一页", next: "下一页" },
    returnToTopLabel: "返回顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
  },
});

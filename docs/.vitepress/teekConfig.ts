import { defineTeekConfig } from "vitepress-theme-teek/config";
import { version } from "vitepress-theme-teek/es/version";

export const teekConfig = defineTeekConfig({
  teekTheme: true, // 启用 Teek 主题
  teekHome: false, // 关闭博客风格首页，使用文档风格首页
  vpHome: true, // 保留 VitePress 默认首页
  sidebarTrigger: true, // 开启侧边栏折叠功能
  windowTransition: true, // 页面元素渐入过渡
  themeSize: "default",
  author: {
    name: "MinimaxFlora",
    link: "https://github.com/MinimaxFlora/gh-proxy",
  },
  // 底部：回到顶部 / 主题增强面板
  backTop: { enabled: true, content: "progress" },
  themeEnhance: {
    enabled: true,
    position: "top",
    layoutSwitch: { defaultMode: "original" },
    themeColor: { defaultColorName: "vp-primary", defaultSpread: false },
    spotlight: { defaultValue: false },
  },
  codeBlock: {
    enabled: true,
    langTextTransform: "uppercase",
    copiedDone: TkMessage => TkMessage.success("复制成功！"),
  },
  articleShare: { enabled: true },
  // 页脚信息
  footerInfo: {
    theme: { name: `Theme By Teek@${version}` },
    copyright: {
      createYear: 2024,
      suffix: "gh-proxy",
    },
  },
  // 关闭会改写源文件的自动插件，保留目录解析
  vitePlugins: {
    sidebar: false, // 使用手动侧边栏
    permalink: false,
    mdH1: false,
    docAnalysis: false,
    autoFrontmatter: false,
  },
});

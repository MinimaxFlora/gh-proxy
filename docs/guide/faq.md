# 常见问题

## 提示 `Invalid input.` 或 403 是什么意思？

说明请求的路径不是一个可识别的 GitHub 链接。请确认链接属于 release、archive、blob/raw、gist 或 tags 等受支持的类型。如果配置了白名单，未命中的链接也会被拒绝。

## 为什么不支持直接加速项目文件夹？

GitHub 的网页文件树（仓库首页）是动态页面，并非静态资源，代理无法像下载文件那样直接转发。请进入到具体文件后再复制链接。

## 下载链接会跳转到 jsDelivr 吗？

只有在开启 `Config.jsdelivr = 1`（或命中了 passby 规则）时，`blob` 与 `raw` 链接才会 302 到 jsDelivr。默认情况下，`blob` 会被转换为 `raw` 后由服务转发。

## 通过加速域名访问时，页面样式或资源加载失败？

请确认 `ASSET_URL` 指向了正确的站点地址，并且服务端会处理站点子路径前缀。本仓库中的 `index.js` 与 `app/main.py` 已经内置了前缀归一化逻辑，直接使用即可。

## 可以加速私有仓库吗？

可以。在链接中内嵌用户名与 Token 即可，例如：

```text
https://user:TOKEN@<你的加速域名>/https://github.com/user/private-repo
```

请妥善保管 Token，使用完后及时撤销。

## 免费额度够用吗？

Cloudflare Workers 免费版每天有 10 万次请求，并有每分钟 1000 次请求的限制。如果不够用，可以升级付费版本（每月 1000 万次请求）。如需大规模使用，建议自行部署。

## Python 版本启动时报错无法访问 github.io？

Python 版本会在启动时拉取 `ASSET_URL` 页面内容。如果服务器网络无法访问 `github.io`，请把 `ASSET_URL` 换成可访问的静态地址，或改为在本地托管静态文件。

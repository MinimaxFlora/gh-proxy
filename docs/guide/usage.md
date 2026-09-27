# 快速使用

最简单的方式：在任意受支持的 GitHub 链接前面，加上你的加速域名即可。

```text
原始链接：https://github.com/user/repo/releases/download/v1.0.0/app.zip
加速链接：https://<你的加速域名>/https://github.com/user/repo/releases/download/v1.0.0/app.zip
```

链接带不带协议头都可以，`http://` 与 `https://` 会被自动处理。

## 页面上的在线工具

打开[首页](/#proxy-tool)，把 GitHub 链接粘贴进输入框，点击「加速下载」即可直接跳转到加速后的地址，也可以点「复制」把加速地址复制到下载工具中使用。

::: tip 关于加速域名
如果你是通过加速服务域名打开本站的，工具会自动使用当前域名；如果你是在 GitHub Pages 上直接浏览本站，请在工具的「加速域名」中填写你自己的服务地址。
:::

## 支持的链接类型

### 分支源码

```text
https://github.com/user/repo/archive/refs/heads/master.zip
https://github.com/user/repo/archive/v0.1.0.tar.gz
```

### Release 文件

```text
https://github.com/user/repo/releases/download/v0.1.0/example.zip
```

### 分支文件与 Raw 文件

```text
https://github.com/user/repo/blob/master/filename
https://raw.githubusercontent.com/user/repo/master/filename
```

::: info blob 与 raw 的转换
访问 `blob` 链接时，服务会自动把它转换为 `raw` 链接再转发，因此可以直接复制 GitHub 网页上的文件链接。
:::

### Gist

```text
https://gist.githubusercontent.com/user/id/raw/cmd.py
```

### Tags

```text
https://github.com/user/repo/tags
```

## jsDelivr 镜像

如果开启了 jsDelivr 选项（`Config.jsdelivr = 1`），`blob` 与 `raw` 链接会被重定向到 `cdn.jsdelivr.net` 的 GH 镜像，适合对静态资源做长期加速。该选项默认关闭。

## 通过参数快速跳转

服务支持使用 `?q=` 参数直接跳转：

```text
https://<你的加速域名>/?q=https://github.com/user/repo/releases/download/v0.1.0/app.zip
```

访问后会 301 跳转到标准路径，便于把链接嵌到其他页面里。

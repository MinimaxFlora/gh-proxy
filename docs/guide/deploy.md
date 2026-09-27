# 部署自己的服务

## 部署 Cloudflare Workers 版本

1. 打开 [Cloudflare Workers](https://workers.cloudflare.com) 并注册登录。
2. 创建一个 Worker，取一个子域名。
3. 把仓库根目录的 `index.js` 内容复制到编辑器。
4. 按需修改文件顶部的配置，然后 `Save and deploy`。

文件顶部的关键配置：

```js
// 静态资源地址，即本网站地址（当路径不是 GitHub 链接时回落到这里）
const ASSET_URL = 'https://minimaxflora.github.io/gh-proxy/'
// 前缀，如果自定义路由为 example.com/gh/*，则改为 '/gh/'
const PREFIX = '/'
// 分支文件使用 jsDelivr 镜像的开关，0 为关闭
const Config = { jsdelivr: 0 }
// 白名单，路径中包含指定字符串才会通过，如 ['/username/']
const whiteList = []
```

部署完成后，访问你的 Worker 域名就能看到本站，并可直接在页面中加速下载。

::: tip ASSET_URL 与本站的关系
`ASSET_URL` 指向的就是这个美化版主页。把本站部署到 GitHub Pages 后，将 `ASSET_URL` 改成你的 Pages 地址即可。服务会自动处理站点子路径前缀，因此通过加速域名访问时页面资源也能正常加载。
:::

## 部署本站（GitHub Pages）

本站使用 VitePress + Teek 主题构建，并通过 GitHub Actions 从 `master` 分支自动发布到 `gh-pages` 分支。

### 本地开发与构建

```bash
# 安装依赖
npm install

# 本地预览
npm run docs:dev

# 构建静态文件（输出到 docs/.vitepress/dist）
npm run docs:build
```

### 自动部署

仓库内的 `.github/workflows/deploy.yml` 会在 `master` 分支有推送时自动构建并发布到 `gh-pages`：

1. 在仓库 `Settings -> Pages` 中，把 `Source` 设为 `Deploy from a branch`；
2. `Branch` 选择 `gh-pages`，目录选择 `/ (root)`；
3. 推送任意改动到 `master`，等待 Actions 完成后即可访问。

::: warning 站点路径（base）
本站默认部署在 `https://<用户名>.github.io/gh-proxy/`，因此构建配置中的 `base` 为 `/gh-proxy/`。如果你 Fork 后仓库名不同，请同步修改 `docs/.vitepress/config.ts` 中的 `base`。
:::

## 部署 Python 版本

### 使用 Docker

```bash
docker run -d --name="gh-proxy-py" \
  -p 0.0.0.0:80:80 \
  --restart=always \
  hunsh/gh-proxy-py:latest
```

第一个 `80` 是暴露出去的端口。

### 直接部署

```bash
# 安装依赖（请使用 Python 3）
pip install flask requests
```

然后按需修改 `app/main.py` 顶部的配置，重点是 `ASSET_URL`：

```python
ASSET_URL = 'https://minimaxflora.github.io/gh-proxy'  # 主页
```

启动服务：

```bash
python3 app/main.py
```

::: warning 注意
Python 版本会在启动时拉取 `ASSET_URL` 主页内容，如果服务器无法访问 `github.io`，请把 `ASSET_URL` 改成其他可访问的静态地址。
:::

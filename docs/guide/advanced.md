# Clone 与私有仓库

## 加速 git clone

在仓库地址前加上加速域名，即可用 https 协议加速拉取：

```bash
git clone https://<你的加速域名>/https://github.com/user/repo
```

如果需要长期使用，可以把它配置成 git 的 URL 替换规则：

```bash
git config --global url."https://<你的加速域名>/https://github.com/".insteadOf "https://github.com/"
```

配置后，直接使用原仓库地址即可享受加速：

```bash
git clone https://github.com/user/repo
```

## 访问私有仓库

私有仓库可以通过在 URL 中内嵌用户名和 Token 的方式访问：

```bash
git clone https://user:TOKEN@<你的加速域名>/https://github.com/user/private-repo
```

::: warning 安全提醒
Token 会出现在命令行历史与部分日志中，请使用权限最小化的 Token，并在不再需要时及时撤销。不要在公开场合分享带有 Token 的地址。
:::

## Python 版本的高级控制

Python 版本（`app/main.py`）额外支持以下配置：

- **文件大小限制**：超过 `size_limit` 的文件会返回原地址，避免占用服务器带宽。
- **白名单 / 黑名单**：按 `user`、`user/repo` 或 `*/repo` 的粒度进行放行或封禁。
- **passby**：命中的链接会直接 302 到 jsDelivr，忽略其他设置。

配置示例：

```python
white_list = '''
user1
user2/repo1
'''
black_list = '''
user3
*/repo2
'''
pass_list = '''
user4/repo4
'''
```

生效顺序为：白名单 -> 黑名单 -> passby。

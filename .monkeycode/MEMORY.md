# User Instruction Memory

This file records user instructions, preferences, and teachings for reference in future interactions.

## Format

### User Instruction Entry
User instruction entries should follow this format:

[User Instruction Summary]
- Date: [YYYY-MM-DD]
- Context: [Mentioned scenario or time]
- Instructions:
  - [Content of user teaching or instruction, described line by line]

### Project Knowledge Entry
Entries discovered by the Agent during task execution should follow this format:

[Project Knowledge Summary]
- Date: [YYYY-MM-DD]
- Context: Discovered by Agent while performing [specific task description]
- Category: [Operations & Deployment|Build Methods|Testing Methods|Troubleshooting & Debugging|Workflow & Collaboration|Environment Configuration]
- Instructions:
  - [Specific knowledge points, described line by line]

## Deduplication Strategy
- Before adding a new entry, check for similar or identical instructions.
- If a duplicate is found, skip the new entry or merge it with the existing one.
- When merging, update the context or date information.
- This helps avoid redundant entries and keeps the memory file tidy.

## Entries

[Project Knowledge Summary]
- Date: 2026-09-27
- Context: Discovered by Agent while deploying the VitePress docs site to GitHub Pages
- Category: Operations & Deployment
- Instructions:
  - 站点发布流程：向 master 推送后，`.github/workflows/deploy.yml` 会构建 `docs/` 并用 peaceiris/actions-gh-pages 推送到 `gh-pages` 分支（force_orphan）。可用 `git fetch origin gh-pages --depth 1 && git log -1 origin/gh-pages` 确认发布是否生效。
  - 截至 2026-09-27，`https://minimaxflora.github.io/gh-proxy/` 返回 404，原因是仓库的 GitHub Pages 尚未发布该分支（Actions 中不存在 `pages-build-deployment` 运行记录）。需仓库拥有者在 Settings → Pages 中把 Source 设为 "Deploy from a branch"，Branch 选 `gh-pages` / `(root)`，之后无需改代码。
  - 排查 Pages 是否已发布：查看 Actions 运行列表里是否存在名为 `pages-build-deployment` 的工作流；没有则说明 Pages 未配置为从分支发布。
  - 接口 `/repos/{owner}/{repo}/pages` 与 `/pages/builds/latest` 在未认证时返回 404，不能据此判断 Pages 未启用；`has_pages` 字段来自仓库信息接口，更可靠。
  - GitHub Pages 已启用后线上返回 200；`gh-pages` 分支的新资源可能被 CDN 缓存几分钟，校验新文件时加 `?v=<时间戳>` 绕过缓存。

[User Instruction Summary]
- Date: 2026-09-27
- Context: 用户要求在提交与推送时使用其本人身份，不要出现 MonkeyCode-AI
- Instructions:
  - 提交身份固定为 `MinimaxFlora <zj18139624826@gmail.com>`，同时设置全局与仓库级（`git config --local`），因为本仓库存在覆盖全局配置的 local `user.email`。
  - 本仓库 `.git/hooks/prepare-commit-msg` 会根据 `coauthor.*` 配置自动追加 `Co-authored-by` 尾注；需执行 `git config --unset-all coauthor.0.name` 与 `git config --unset-all coauthor.0.email` 才能保证提交里不出现 MonkeyCode-AI。

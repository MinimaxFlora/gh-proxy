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

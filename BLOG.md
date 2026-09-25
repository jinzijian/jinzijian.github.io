# 写博客

网站入口：https://jinzijian.github.io/blog/

文章放在 `content/blog/`，每篇一个 Markdown 文件。文件名会成为网址，例如 `async-rl-notes.md` 对应 `/blog/async-rl-notes/`。

## 新建文章

在 `personal-website-github` 源码目录操作，首次运行先执行 `npm install`。

```sh
npm run blog:new -- async-rl-notes "关于异步 RL 的一些笔记"
```

打开生成的文件，填写摘要和正文：

```markdown
---
title: "关于异步 RL 的一些笔记"
date: "2026-09-25"
description: "文章的一句话摘要。"
draft: true
---

这里写正文，支持中英文。

## 小标题

支持列表、链接、图片、表格和代码块。
```

日期要加引号。文章按日期从新到旧排列。图片可以放在 `public/blog/`，正文用 `![说明](/blog/文件名.jpg)` 引用。

## 预览与发布

1. 正文完成后把 `draft: true` 改成 `draft: false`。
2. 运行 `npm run dev`，查看 `/blog/` 和文章页面。修改 Markdown 后重新启动开发服务，或在另一个终端运行 `npm run blog:prepare`。
3. 提交源码：`git add content/blog public/blog`（没有图片时只添加 `content/blog`），然后 `git commit`、`git push origin master`。
4. 在 GitHub 源码仓库运行 `npm run deploy:pages`，生成并发布到 GitHub Pages。提交 master 本身不会部署。

也可以把 Markdown 文章发给 Codex，让它完成预览、正式站发布和 Sites 预览版同步。

`draft: true` 的文章不会出现在网站、生成的数据或静态页面中。不过这个 GitHub 仓库是公开的，提交进仓库的草稿源码仍然可以被别人阅读；私人草稿请先保存在仓库外。

文章不会执行嵌入的 HTML 或脚本。正文的代码块、链接和图片使用标准 Markdown。

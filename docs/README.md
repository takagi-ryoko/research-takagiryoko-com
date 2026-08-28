# 移行と運用のドキュメント

高木良子｜弔いとテクノロジー研究サイトの Astro 移行・デプロイ・運用ガイド。

## 目次

1. **[01-github-setup.md](./01-github-setup.md)** — GitHub リポジトリの作成と初回プッシュ
2. **[02-cloudflare-setup.md](./02-cloudflare-setup.md)** — Cloudflare Pages との連携とプレビュー
3. **[03-dns-setup.md](./03-dns-setup.md)** — ムームードメインの DNS を Cloudflare に向ける
4. **[04-cutover-and-cleanup.md](./04-cutover-and-cleanup.md)** — 本番切替後の確認とロリポップ解約
5. **[05-operations-manual.md](./05-operations-manual.md)** — 日常運用マニュアル（ニュースの追加方法）

## 推奨する進行順

**初回セットアップ**：1 → 2 → 3 → 4 の順で進めてください。それぞれ間に確認期間を設けるのが安全です。

**日常運用**：5 だけを繰り返し参照。

## 移行の全体像

```
（現状）
Lolipop の HTML/CSS/JS 素直サーバー
  ↓
（今回）
Astro プロジェクト（Content Collections 導入）
  ↓
GitHub（takagi-ryoko/research-takagiryoko-com）
  ↓
Cloudflare Pages（自動ビルド＆デプロイ）
  ↓
research.takagiryoko.com（ムームードメイン → CNAME → Cloudflare）
```

## 移行のメリット

- **ニュース追加が劇的に楽に**：Markdown 1ファイルの追加のみ
- **年間コストが約 4,000 円削減**（Lolipop 解約分）
- **配信速度が世界最速級**に（Cloudflare CDN）
- **プレビュー環境**が自動発行される
- **バージョン管理**が完璧（何をいつ変えたか全部残る）

## 必要な作業時間

- 手順書 1（GitHub）：20〜30分（初回のみ）
- 手順書 2（Cloudflare）：15分
- 手順書 3（DNS）：15分＋反映待ち数時間
- 手順書 4（切替）：確認 30分／解約手続き 15分／観察期間 1〜2週間
- 手順書 5（運用）：慣れれば1件追加につき 3〜5分

**合計初期作業**：約 2〜3 時間（分割可能）

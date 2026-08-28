# research.takagiryoko.com

高木良子｜弔いとテクノロジー研究 の公式サイト。

## 開発

```bash
npm install         # 初回のみ
npm run dev         # 開発サーバー（http://localhost:4321）
npm run build       # 本番用ビルド → dist/
npm run preview     # ビルド結果のプレビュー
```

## デプロイ

`main` ブランチにプッシュすると、Cloudflare Pages が自動的にビルドして
`https://research.takagiryoko.com` に反映します。

## ニュースの追加方法

1. `src/content/news/` に新しい Markdown ファイルを作成
   - ファイル名の推奨形式: `YYYY-MM-DD-slug.md`（例: `2026-08-13-nikkei.md`）
2. フロントマターに必須項目を記入（例は既存ファイル参照）
3. GitHub Desktop で commit → push
4. 数十秒後に本番反映

## ディレクトリ構成

```
src/
├── content/
│   ├── config.ts          # Content Collections のスキーマ
│   └── news/              # ニュース1件 = 1 Markdown ファイル
├── layouts/
│   └── BaseLayout.astro   # 全ページ共通レイアウト
├── components/            # 再利用可能なコンポーネント
├── pages/                 # ルーティング
│   ├── index.astro        # トップページ
│   └── news.astro         # ニュースアーカイブ
├── styles/
│   └── global.css         # サイト全体のスタイル
└── scripts/
    └── site.js            # 共通 JavaScript
public/
├── images/                # 静的画像
├── interview-selfai.html  # 現状の HTML をそのまま静的配信
├── interview-burial.html
└── ...
```

## ライセンス

Copyright © 2026 Takagi Ryoko. All rights reserved.

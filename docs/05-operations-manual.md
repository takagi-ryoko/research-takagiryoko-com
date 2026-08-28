# 手順書5：日常運用マニュアル

ニュースの追加、修正、削除など日常の運用方法です。

---

## 基本的な流れ

```
1. VS Code などのエディタで Markdown を編集
2. GitHub Desktop で commit → push
3. Cloudflare Pages が自動でビルド＆公開（30秒〜1分）
4. 本番サイトに反映
```

**1件追加の所要時間：慣れれば 3〜5 分**

---

## ニュースを1件追加する（もっともよくやる操作）

### Step 1: 新しい Markdown ファイルを作成

`~/Library/Mobile Documents/com~apple~CloudDocs/research/research-takagiryoko-com/src/content/news/` に新しいファイルを作成。

**ファイル名の推奨形式**：`YYYY-MM-DD-slug.md`

例：
- `2026-09-15-nikkei-2.md`（日経の記事）
- `2026-10-01-book-publish.md`（新刊出版）
- `2026-11-20-conference.md`（学会発表）

### Step 2: フロントマターを記入

Markdown ファイルの中身を以下のフォーマットで記入：

```markdown
---
date: 2026-09-15
displayDate: "2026.09.15"
category: media
title_ja: 'ここに日本語タイトル'
title_en: 'Here comes English title'
links:
  - url: https://example.com/article
    label_ja: 記事を開く
    label_en: Open article
---
```

### 各フィールドの説明

| フィールド | 必須 | 説明 |
|---|---|---|
| `date` | 必須 | 日付。ソート順に使う。`YYYY-MM-DD` 形式 |
| `displayDate` | 任意 | 表示用の日付文字列。例：`"2026.09.15"` や `"2026.06.20–21"` |
| `category` | 必須 | カテゴリ（後述） |
| `title_ja` | 必須 | 日本語タイトル |
| `title_en` | 必須 | 英語タイトル |
| `pinned` | 任意 | `true` にするとトップページ最上段にピン留め表示 |
| `archiveOnly` | 任意 | `true` にするとトップページには載らず、アーカイブページだけに表示 |
| `links` | 任意 | 外部リンクの配列（複数可） |
| `extraCategories` | 任意 | 複数カテゴリの場合。例：`[media]` |

### カテゴリ（category）の値

| 値 | 意味 |
|---|---|
| `paper` | 論文 |
| `book` | 著書 |
| `conf` | 学会発表 |
| `lect` | 講演・登壇 |
| `media` | 寄稿・メディア |
| `grant` | 助成金・受賞 |
| `other` | その他 |

### Step 3: GitHub Desktop で公開

1. GitHub Desktop を開く
2. 「Changes」タブに新しいファイルが表示される
3. 左下の「Summary」に「Add news: 2026.09.15 日経新聞掲載」のようなメモを書く
4. 「Commit to main」ボタンをクリック
5. 「Push origin」ボタンをクリック
6. 30秒〜1分で本番反映

---

## ニュースを修正する

1. 該当の `.md` ファイルを VS Code などで開く
2. 内容を編集
3. 保存
4. GitHub Desktop で commit → push

---

## ニュースを削除する

1. 該当の `.md` ファイルを Finder で削除
2. GitHub Desktop で「Changes」に削除が表示される
3. Summary に「Remove news: 〜」と書いて commit → push

---

## ピン留めを変更する

`pinned: true` を追加すると、そのニュースはトップページ最上段に固定表示される。

例：
```markdown
---
date: 2026-06-06
displayDate: "2026.06.06"
category: paper
pinned: true         # ← これを追加
title_ja: '...'
---
```

**注意**：ピン留めは 2〜3 件までにするのが視覚的に良い（多すぎると意味が薄まる）。

---

## アーカイブ移動（トップから外す）

古いニュースをトップから外したいときは `archiveOnly: true` を追加。
アーカイブページ（`/news.html`）には表示されるが、トップページには載らない。

```markdown
---
date: 2025-08-21
displayDate: "2025.08.21"
category: media
archiveOnly: true    # ← これを追加
title_ja: '...'
---
```

---

## 実例：完璧な1件の Markdown

```markdown
---
date: 2026-09-15
displayDate: "2026.09.15"
category: media
title_ja: '朝日新聞に「AI故人と葬送の未来」に関する寄稿掲載'
title_en: 'Contributed essay on "AI Deceased and the Future of Mourning" published in the Asahi Shimbun'
links:
  - url: https://researchmap.jp/takagiryoko/media_coverage/xxxxxxxx
    label_ja: researchmapで見る
    label_en: View on researchmap
  - url: https://digital.asahi.com/articles/xxxxxxxx.html
    label_ja: 記事を開く
    label_en: Open article
---
```

---

## トラブルシューティング

### ビルドに失敗する

- Cloudflare Pages の「Deployments」タブでエラーログを確認
- よくある原因：
  - YAML の書式エラー（インデント、引用符など）
  - `date` が正しくない形式（`2026-09-15` の形式に）
  - `category` が想定外の値

### ローカルで確認したい場合

以下のコマンドを Mac の「ターミナル」で実行：

```bash
cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/research/research-takagiryoko-com
npm run dev
```

- ブラウザで `http://localhost:4321` にアクセス
- ローカルのプレビューが見える
- Markdown を編集すると自動でリロード
- 終了は `Ctrl + C`

---

## 定期的に確認したいこと

### 月次

- Cloudflare Pages の「Analytics」タブでアクセス数を確認
- Google Search Console でインデックス状況を確認

### 年次

- ドメイン（ムームードメイン）の更新（自動更新にしておくと安心）

---

## その他の変更（プロフィール、業績、インタビュー等）

現在の設計では、ニュース以外の内容変更は **Astro のソースファイルを直接編集** します：

| 変更したい箇所 | 編集するファイル |
|---|---|
| ヒーロー（自己紹介、タグライン） | `src/pages/index.astro` |
| 研究について | `src/pages/index.astro` |
| 業績（書籍） | `src/pages/index.astro` |
| ニュースレター | `src/pages/index.astro` |
| お問い合わせ | `src/pages/index.astro` |
| ナビゲーション | `src/components/Header.astro` |
| CSS | `public/styles/global.css` |
| JavaScript | `public/scripts/site.js` |
| インタビュー詳細ページ | `public/interview-selfai.html` または `public/interview-burial.html` |

これらも同じく：編集 → commit → push で自動反映。

---

## 完了確認

- [ ] このマニュアルを一度読んだ
- [ ] 実際に1件試しにニュース追加してみて、正常に反映されることを確認した
- [ ] トラブル時の対応方法を把握した

これで通常運用はできるようになります。

# 手順書1：GitHub リポジトリの作成と初回プッシュ

このドキュメントは Astro プロジェクトを GitHub に配置する初回セットアップの手順です。
所要時間：約 20-30 分（初回のみ）

---

## 前提

- GitHub アカウント（`takagi-ryoko`）を作成済み
- Astro プロジェクト一式が `~/Library/Mobile Documents/com~apple~CloudDocs/research/research-takagiryoko-com/` にある

---

## Step 1: GitHub Desktop のインストール

1. https://desktop.github.com/ を開く
2. 「Download for macOS」をクリック
3. ダウンロードした `.dmg` を開く
4. GitHub Desktop アプリを「Applications」フォルダにドラッグ
5. 「Applications」から GitHub Desktop を起動
6. 「Sign in to GitHub.com」をクリック
7. ブラウザが開いたら GitHub アカウント（`takagi-ryoko`）でサインイン
8. 「Authorize desktop」で承認
9. アプリに戻り、Configure Git 画面が出たら Name と Email を確認して「Finish」

---

## Step 2: プロジェクトフォルダを GitHub Desktop に追加

1. GitHub Desktop の画面で「Add an Existing Repository from your Hard Drive...」または `File > Add local repository...` を選択
2. 「Choose...」で `~/Library/Mobile Documents/com~apple~CloudDocs/research/research-takagiryoko-com/` を選択
3. 「This directory does not appear to be a Git repository. Would you like to create a repository here instead?」と出るので、「**create a repository**」のリンクをクリック

4. 「Create a New Repository」画面で以下を設定：
   - **Name**: `research-takagiryoko-com`（自動入力される）
   - **Description**: `高木良子｜弔いとテクノロジー研究 の公式サイト`
   - **Local Path**: 自動入力されるので触らない
   - **Git ignore**: `Node`（すでに .gitignore があるので任意）
   - **License**: None
5. 「Create Repository」をクリック

---

## Step 3: 初回コミットを作成

1. GitHub Desktop の画面で「Changes」タブに、多数のファイル（package.json, src/, public/, docs/, README.md など）が表示されているはず
2. 画面左下の **Summary** に「Initial commit - Astro migration」と入力
3. 「Commit to main」ボタンをクリック
4. 数秒でコミット完了

---

## Step 4: GitHub へプッシュ（アップロード）

1. 画面上部に「Publish repository」ボタンが表示される（青色）
2. クリックすると「Publish Repository」ダイアログが開く
3. 以下を設定：
   - **Name**: `research-takagiryoko-com`
   - **Description**: `高木良子｜弔いとテクノロジー研究 の公式サイト`
   - **Keep this code private**: **チェックを外す**（Cloudflare Pages が読み取れるようパブリックに）
   - **Organization**: `None` のまま
4. 「Publish Repository」をクリック
5. 数十秒で完了

---

## Step 5: GitHub 上での確認

1. ブラウザで https://github.com/takagi-ryoko/research-takagiryoko-com にアクセス
2. リポジトリが表示されていれば成功
3. `src/content/news/` に 20件の Markdown が並んでいるはず
4. README.md がリポジトリのトップに表示される

---

## トラブルシューティング

### 「Publish Repository」でエラーが出る場合

- ネットワーク接続を確認
- GitHub Desktop を再起動
- 再度サインインを試す

### コミット時に大量のファイル（node_modules など）が表示される場合

- `.gitignore` が正しく機能していない可能性
- プロジェクトのルートに `.gitignore` があるか確認
- なければ、リポジトリのルートに以下の内容で `.gitignore` を作成

```
.astro/
dist/
node_modules/
.DS_Store
.env
```

- 保存後、GitHub Desktop で再度コミット

---

## 完了確認

- [ ] GitHub Desktop がインストールされている
- [ ] `research-takagiryoko-com` フォルダが GitHub Desktop に登録されている
- [ ] 初回コミットが「main」ブランチに作成された
- [ ] GitHub 上に `takagi-ryoko/research-takagiryoko-com` リポジトリが存在
- [ ] リポジトリは Public（Cloudflare Pages がアクセス可能）

次は **02-cloudflare-setup.md**（Cloudflare Pages との連携）に進みます。

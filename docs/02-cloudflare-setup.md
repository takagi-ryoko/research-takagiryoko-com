# 手順書2：Cloudflare Pages との連携とプレビュー

このドキュメントは Cloudflare Pages に Astro プロジェクトをデプロイする手順です。
所要時間：約 15 分

---

## 前提

- Cloudflare アカウントを作成済み
- GitHub 上に `takagi-ryoko/research-takagiryoko-com` リポジトリが作成済み（手順書1参照）

---

## Step 1: Cloudflare にログイン

1. https://dash.cloudflare.com/ にアクセス
2. サインインする

---

## Step 2: Workers & Pages プロジェクトを作成

1. 左メニューの「**Workers & Pages**」（旧「Pages」）をクリック
2. 「**Create application**」をクリック
3. 上部タブの「**Pages**」を選択
4. 「**Connect to Git**」をクリック

---

## Step 3: GitHub と接続

1. 「Connect GitHub」ボタンをクリック
2. ブラウザで GitHub の認証画面が開く
3. 「Authorize Cloudflare Pages」で承認
4. Repository access で以下を選択：
   - **Only select repositories** を選択
   - `research-takagiryoko-com` にチェック
   - 「Install & Authorize」
5. Cloudflare に戻る

---

## Step 4: リポジトリを選択してビルド設定

1. リポジトリ一覧から `research-takagiryoko-com` を選択
2. 「**Begin setup**」をクリック
3. 以下の設定を入力：

   | 項目 | 値 |
   |---|---|
   | **Project name** | `research-takagiryoko-com` |
   | **Production branch** | `main` |
   | **Framework preset** | `Astro`（自動検出されるはず） |
   | **Build command** | `npm run build` |
   | **Build output directory** | `dist` |
   | **Root directory** | 空欄のまま |

4. **Environment variables** は追加不要
5. 「**Save and Deploy**」をクリック

---

## Step 5: 初回デプロイの完了を待つ

- 「Building your site...」と表示されるので、そのまま待つ（1〜3分）
- ログ出力を眺めていると、Astro が npm install → npm run build を実行しているのが見える
- 「Deployment successful」と出たら完了

---

## Step 6: プレビュー URL でサイトを確認

1. 「Continue to project」または `Workers & Pages > research-takagiryoko-com` を開く
2. 上部に本番 URL が表示される（例：`https://research-takagiryoko-com.pages.dev`）
3. クリックして新しいタブで開く
4. サイトが表示されることを確認

### 確認ポイント

- [ ] トップページのヒーロー画像・肩書きが表示される（Profile.png がない場合は画像が壊れる）
- [ ] ニュース一覧に 20件のニュースが表示される
- [ ] 各ニュースにカテゴリタグ（論文、学会発表など）が付いている
- [ ] 各ニュースに外部リンクアイコンが付いている
- [ ] ページ最下部の「すべてのニュースを見る →」からアーカイブページに飛べる
- [ ] アーカイブページのカテゴリフィルタが動く（クリックで絞り込み）
- [ ] インタビュー協力募集の2バナー（AI・土葬）がインタビューページに遷移する
- [ ] `?lang=en` を付けると英語表示になる
- [ ] お問い合わせフォームが表示される

### 「Profile.png がない」問題について

現状 `public/images/` に `Profile.png` が入っていません。プロフィール写真として使いたい画像を用意して、`public/images/Profile.png` として配置してください。配置後、GitHub Desktop で commit → push すれば自動的に再デプロイされて反映されます。

---

## Step 7: 自動再デプロイの仕組みを理解する

これで以降は、`main` ブランチに変更をプッシュするたびに Cloudflare Pages が自動的にビルド＆公開してくれます。

### ニュース1件追加の実際の流れ

1. VSCode 等で `src/content/news/YYYY-MM-DD-slug.md` を作成
2. GitHub Desktop で commit → push
3. Cloudflare Pages が自動検知
4. 30秒〜1分でビルド完了
5. 自動的にプレビュー URL に反映

---

## トラブルシューティング

### ビルドが失敗する

- Cloudflare Pages の「Deployments」タブでログを確認
- ローカルで `npm run build` を実行してエラーが出ないか確認
- Markdown のフロントマターの構文エラーが原因のことが多い

### GitHub と接続できない

- 「Settings」→「Git integration」から接続をリセット
- GitHub 側で「Cloudflare Pages」の app permissions を再確認

---

## 完了確認

- [ ] Cloudflare Pages プロジェクトが作成されている
- [ ] GitHub と正しく連携されている
- [ ] 初回デプロイに成功
- [ ] `xxxx.pages.dev` の URL でサイトが閲覧できる
- [ ] ニュースが 20件表示されている

次は **03-dns-setup.md**（ムームードメインの DNS を Cloudflare に向ける）に進みます。

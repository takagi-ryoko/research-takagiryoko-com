# 手順書3：ムームードメインの DNS を Cloudflare に向ける

このドキュメントは `research.takagiryoko.com` を新サイト（Cloudflare Pages）に向ける手順です。

⚠️ **これが本番切り替えのステップ**です。慎重に進めてください。
所要時間：約 15 分（＋ DNS 反映待ちで数時間）

---

## 前提

- Cloudflare Pages で新サイトが動いていることを確認済み（プレビューURLで正常表示）
- ムームードメインのログイン情報を持っている

---

## Step 1: Cloudflare でカスタムドメインを追加

1. Cloudflare Dashboard → Workers & Pages → `research-takagiryoko-com` プロジェクト
2. 「**Custom domains**」タブを開く
3. 「**Set up a custom domain**」をクリック
4. `research.takagiryoko.com` と入力
5. 「Continue」

Cloudflare が「このドメインを Cloudflare で管理するか」を聞いてきます：

### パターンA：ドメインを Cloudflare に移管する場合（推奨されない）
- サブドメイン管理のみ Cloudflare に委任する方法（次のパターンB）が簡単

### パターンB：ムームードメインのまま、CNAME で向ける場合（推奨）
- Cloudflare が「以下の CNAME レコードを追加してください」と指示を出す
- 表示された CNAME 値（例：`research-takagiryoko-com.pages.dev`）を**メモ**

---

## Step 2: ムームードメイン側で DNS を設定

1. https://muumuu-domain.com/ にログイン
2. コントロールパネル → 「ドメイン操作」→「**ムームー DNS**」を選択
3. `takagiryoko.com` の行を探し、「**変更**」ボタンをクリック

4. **カスタム設定**の画面で、以下のレコードを追加：

   | サブドメイン | 種別 | 内容 | 優先度 |
   |---|---|---|---|
   | `research` | `CNAME` | `research-takagiryoko-com.pages.dev` | 空欄 |

5. 「セットアップ情報変更」で保存

⚠️ **既存の `research` サブドメインのレコード（Aレコードなど）がある場合は削除**してください。CNAME と競合します。

---

## Step 3: DNS 反映を待つ

- ムームードメイン側の設定変更は**最大で 24 時間**かかることがあります
- 通常は **5〜30 分**で反映されます
- 反映されると `research.takagiryoko.com` にアクセスしたら新サイト（Cloudflare Pages 版）が表示される

### 反映を確認する方法

**ターミナル**（Mac の「アプリケーション → ユーティリティ → ターミナル」）で以下を実行：

```bash
dig research.takagiryoko.com CNAME +short
```

- `research-takagiryoko-com.pages.dev.` のような値が返れば反映済み
- 返らなければまだ反映中

または、以下のオンラインツールでも確認可能：
https://www.whatsmydns.net/#CNAME/research.takagiryoko.com

---

## Step 4: HTTPS 証明書の自動発行を待つ

DNS が反映された後、Cloudflare Pages が自動的に SSL 証明書を発行します（数分〜数十分）。
「Custom domains」タブで `research.takagiryoko.com` の Status が「**Active**」になれば完了。

---

## Step 5: 本番動作確認

1. ブラウザで https://research.takagiryoko.com にアクセス
2. 新サイトが表示されることを確認
3. HTTPS（鍵マーク）が付いていることを確認
4. 「手順書2」の Step 6 と同じ確認項目を再度チェック

---

## トラブルシューティング

### `dig` で `pages.dev` が返らない
- ムームー DNS の設定を再確認
- サブドメインが `research` になっているか
- CNAME 値の末尾のドット有無を確認（通常はドットなしで OK）

### DNS は反映されたのにサイトが表示されない
- Cloudflare Pages 側で `research.takagiryoko.com` が Custom domain として登録されているか確認
- 「Verify」ボタンがあれば押す
- 30分〜1時間ほど待つ

### 「SSL/TLS handshake failed」エラー
- SSL 証明書の発行がまだ完了していない可能性
- 数十分待つ
- それでも解決しない場合、Cloudflare Custom domain の状態を確認

### 旧サイト（ロリポップ）が表示され続ける
- ブラウザキャッシュのクリア
- シークレット/プライベートウィンドウで開いてみる
- スマホの LTE 回線からアクセスしてみる（自宅の DNS キャッシュを避ける）

---

## 完了確認

- [ ] Cloudflare Custom domain に `research.takagiryoko.com` を追加
- [ ] ムームードメインで CNAME レコードを設定
- [ ] DNS が反映された（`dig` で確認）
- [ ] SSL 証明書が有効
- [ ] https://research.takagiryoko.com で新サイトが表示される

次は **04-cutover-and-cleanup.md**（本番切替後の確認とロリポップ解約）に進みます。

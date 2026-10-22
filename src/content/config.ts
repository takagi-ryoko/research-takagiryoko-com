import { defineCollection, z } from 'astro:content';

/**
 * ニュース項目のスキーマ
 * 1件 = 1 Markdown ファイル。
 * ファイル配置: src/content/news/YYYY-MM-DD-slug.md
 */
const news = defineCollection({
  type: 'content',
  schema: z.object({
    /** 掲載日。範囲の場合は文字列（例: "2026-06-20〜21"） */
    date: z.union([z.date(), z.string()]),

    /** 表示用の日付文字列（例: "2026.08.13" / "2026.06.20–21"）。省略時は date から自動生成 */
    displayDate: z.string().optional(),

    /** カテゴリー（news-tag のクラスと対応） */
    category: z.enum([
      'paper',       // 論文
      'book',        // 著書
      'conf',        // 学会発表
      'lect',        // 講演・登壇
      'media',       // 寄稿・メディア
      'grant',       // 助成金・受賞
      'newsletter',  // ニュースレター
      'other'        // その他
    ]),

    /** 追加カテゴリー（複数タグ対応、例: 論文かつ寄稿・メディア） */
    extraCategories: z.array(z.enum([
      'paper', 'book', 'conf', 'lect', 'media', 'grant', 'newsletter', 'other'
    ])).optional(),

    /** 日本語タイトル（HTMLタグ許可） */
    title_ja: z.string(),

    /** 英語タイトル（HTMLタグ許可） */
    title_en: z.string(),

    /** ピン留め（トップページの最上段に固定表示） */
    pinned: z.boolean().default(false),

    /** アーカイブページのみ表示（トップページには載せない） */
    archiveOnly: z.boolean().default(false),

    /** 外部リンク（複数可）
     *  url を1つ指定するか、言語別に url_ja / url_en を指定する。
     *  言語別がある場合は、該当言語の span でその URL が使われる。
     *  url のみの場合はどちらの言語でも共通で使われる。
     */
    links: z.array(z.object({
      url: z.string().url().optional(),
      url_ja: z.string().url().optional(),
      url_en: z.string().url().optional(),
      label_ja: z.string().optional(),
      label_en: z.string().optional()
    }).refine(
      (link) => link.url || link.url_ja || link.url_en,
      { message: 'url か url_ja/url_en のいずれかが必要です' }
    )).optional()
  })
});

export const collections = {
  news
};

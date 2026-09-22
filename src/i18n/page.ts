/* Tiện ích dùng chung cho các trang trong app/[lang]/. */
import type { Metadata } from 'next';
import { isLang, alternates, type Lang, type RouteKey } from '@/i18n/routes';

export type LangParams = { params: Promise<{ lang: string }> };

export async function langOf(params: Promise<{ lang: string }>): Promise<Lang> {
  const { lang } = await params;
  return isLang(lang) ? lang : 'vi';
}

/** Metadata chuẩn một trang: tiêu đề, mô tả, canonical + hreflang cho cả 2 ngôn ngữ. */
export function pageMeta(lang: Lang, key: RouteKey, title: string | undefined, description: string, slug?: string): Metadata {
  return { ...(title ? { title } : {}), description, alternates: alternates(lang, key, slug) };
}

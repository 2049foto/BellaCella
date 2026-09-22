import type { Metadata } from 'next';
import NotFoundView from '@/components/NotFoundView';
import { ui } from '@/i18n/ui';
import { langOf, type LangParams } from '@/i18n/page';

/* Middleware chuyển mọi đường dẫn không tồn tại về đây, kèm mã HTTP 404.
   Render trực tiếp (không gọi notFound()): với root layout nằm trong [lang],
   notFound() làm Next trả khung lỗi trần thay vì trang có header/footer. */
export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  return { title: ui(await langOf(params)).notFound.h, robots: { index: false, follow: false } };
}

export default async function Missing({ params }: LangParams) {
  return <NotFoundView lang={await langOf(params)} />;
}

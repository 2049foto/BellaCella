'use client';

import { usePathname } from 'next/navigation';
import { ui } from '@/i18n/ui';

// Thông báo đang tải cho trình đọc màn hình; ẩn khỏi mắt.
// loading.tsx không nhận params → đọc ngôn ngữ từ URL hiện tại.
export function LoadingLabel() {
  const lang = usePathname().startsWith('/en') ? 'en' : 'vi';
  return <p className="sr-only" role="status">{ui(lang).loading}</p>;
}

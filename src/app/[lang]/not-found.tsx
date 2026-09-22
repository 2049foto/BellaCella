'use client';

import { usePathname } from 'next/navigation';
import NotFoundView from '@/components/NotFoundView';

// not-found không nhận params → đọc ngôn ngữ từ URL.
export default function NotFound() {
  return <NotFoundView lang={usePathname().startsWith('/en') ? 'en' : 'vi'} />;
}

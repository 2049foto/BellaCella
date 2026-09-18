import { BRAND } from '@/data/products';

// Link chat Zalo dựng từ số điện thoại thương hiệu.
export const zaloUrl = 'https://zalo.me/' + BRAND.phoneHref.replace('+', '');

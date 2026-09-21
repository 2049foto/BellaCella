'use client';

import { useState } from 'react';
import { PRODUCTS, BRAND } from '@/data/products';
import { zaloUrl } from '@/lib/brand';

/* Website chưa có backend nhận form. Nút gửi KHÔNG được giả vờ đã gửi.
   Thay vào đó: dựng sẵn nội dung khách điền, cố gắng chép vào clipboard,
   rồi mở Zalo để khách dán và gửi thật. */

function composeMessage(name: string, phone: string, productLabel: string, note: string) {
  const lines = [
    'Xin tư vấn sản phẩm BELLA CELLA',
    `Họ tên: ${name}`,
    `Điện thoại: ${phone}`,
  ];
  if (productLabel) lines.push(`Quan tâm: ${productLabel}`);
  if (note) lines.push(`Tình trạng da: ${note}`);
  return lines.join('\n');
}

export default function EnquiryForm({ selected }: { selected?: string }) {
  const [status, setStatus] = useState<'idle' | 'error' | 'ready'>('idle');
  const [errorText, setErrorText] = useState('');
  const [copied, setCopied] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value.trim();
    const productSel = form.elements.namedItem('product') as HTMLSelectElement;
    const productLabel = productSel.value ? productSel.options[productSel.selectedIndex].text : '';
    const note = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim();

    if (!name || !phone) {
      setStatus('error');
      setErrorText('Vui lòng nhập họ tên và số điện thoại để chúng tôi liên hệ lại.');
      const target = (name ? form.elements.namedItem('phone') : form.elements.namedItem('name')) as HTMLElement | null;
      target?.focus();
      return;
    }

    const text = composeMessage(name, phone, productLabel, note);
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => setCopied(true)).catch(() => setCopied(false));
    }
    setStatus('ready');
    window.open(zaloUrl, '_blank', 'noopener');
  }

  return (
    <form className="enq" onSubmit={onSubmit} noValidate>
      <div className="field"><label htmlFor="c-name">Họ và tên</label><input id="c-name" name="name" autoComplete="name" required /></div>
      <div className="field"><label htmlFor="c-phone">Số điện thoại</label><input id="c-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required /></div>
      <div className="field">
        <label htmlFor="c-prod">Sản phẩm quan tâm</label>
        <select id="c-prod" name="product" defaultValue={selected ?? ''}>
          <option value="">Chưa xác định — cần tư vấn</option>
          {PRODUCTS.map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="c-msg">Tình trạng da / liệu trình đang thực hiện</label>
        <textarea id="c-msg" name="message" placeholder="Ví dụ: vừa làm laser 1 tuần, da đang khô và bong nhẹ." />
      </div>
      <button className="btn solid" type="submit" style={{ justifyContent: 'center' }}>Nhắn tư vấn qua Zalo</button>
      {status === 'error' && <div className="formmsg" role="alert">{errorText}</div>}
      {status === 'ready' && (
        <div className="formmsg" role="status">
          Website chưa nhận yêu cầu tự động. {copied ? 'Nội dung bạn điền đã được chép sẵn — dán vào Zalo và gửi giúp chúng tôi.' : 'Vui lòng nhắn nội dung bạn cần tư vấn qua Zalo.'} Nếu cửa sổ Zalo chưa mở, bấm <a href={zaloUrl} target="_blank" rel="noopener" style={{ textDecoration: 'underline' }}>mở Zalo tư vấn</a> hoặc gọi <a href={`tel:${BRAND.phoneHref}`} style={{ textDecoration: 'underline' }}>{BRAND.phone}</a>.
        </div>
      )}
    </form>
  );
}

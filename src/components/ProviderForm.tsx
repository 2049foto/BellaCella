'use client';

import { useState } from 'react';
import { BRAND } from '@/data/products';
import { zaloUrl } from '@/lib/brand';

/* Không có backend — không giả vờ đã gửi. Dựng nội dung đăng ký, chép clipboard,
   mở Zalo để cơ sở gửi thật. */

function composeMessage(name: string, phone: string, city: string, type: string) {
  const lines = [
    'Đăng ký hợp tác BELLA CELLA',
    `Cơ sở / người phụ trách: ${name}`,
    `Điện thoại: ${phone}`,
  ];
  if (city) lines.push(`Tỉnh / thành: ${city}`);
  if (type) lines.push(`Loại hình: ${type}`);
  return lines.join('\n');
}

export default function ProviderForm() {
  const [status, setStatus] = useState<'idle' | 'error' | 'ready'>('idle');
  const [errorText, setErrorText] = useState('');
  const [copied, setCopied] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value.trim();
    const city = (form.elements.namedItem('city') as HTMLInputElement).value.trim();
    const type = (form.elements.namedItem('type') as HTMLSelectElement).value;

    if (!name || !phone) {
      setStatus('error');
      setErrorText('Vui lòng nhập họ tên và số điện thoại để chúng tôi liên hệ lại.');
      const target = (name ? form.elements.namedItem('phone') : form.elements.namedItem('name')) as HTMLElement | null;
      target?.focus();
      return;
    }

    const text = composeMessage(name, phone, city, type);
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => setCopied(true)).catch(() => setCopied(false));
    }
    setStatus('ready');
    window.open(zaloUrl, '_blank', 'noopener');
  }

  return (
    <form className="enq" onSubmit={onSubmit} noValidate>
      <div className="field"><label htmlFor="pv-name">Tên cơ sở / người phụ trách</label><input id="pv-name" name="name" autoComplete="organization" required /></div>
      <div className="field"><label htmlFor="pv-phone">Số điện thoại</label><input id="pv-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required /></div>
      <div className="field"><label htmlFor="pv-city">Tỉnh / thành</label><input id="pv-city" name="city" autoComplete="address-level1" /></div>
      <div className="field">
        <label htmlFor="pv-type">Loại hình</label>
        <select id="pv-type" name="type" defaultValue="Spa">
          <option>Spa</option><option>Phòng khám da liễu</option><option>Thẩm mỹ viện</option><option>Nhà phân phối</option><option>Khác</option>
        </select>
      </div>
      <button className="btn solid" type="submit" style={{ justifyContent: 'center' }}>Đăng ký qua Zalo</button>
      {status === 'error' && <div className="formmsg" role="alert">{errorText}</div>}
      {status === 'ready' && (
        <div className="formmsg" role="status">
          Website chưa nhận đăng ký tự động. {copied ? 'Nội dung bạn điền đã được chép sẵn — dán vào Zalo và gửi giúp chúng tôi.' : 'Vui lòng nhắn nội dung đăng ký qua Zalo.'} Nếu cửa sổ Zalo chưa mở, bấm <a href={zaloUrl} target="_blank" rel="noopener" style={{ textDecoration: 'underline' }}>mở Zalo</a> hoặc gọi <a href={`tel:${BRAND.phoneHref}`} style={{ textDecoration: 'underline' }}>{BRAND.phone}</a>.
        </div>
      )}
    </form>
  );
}

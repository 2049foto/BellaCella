'use client';

import { useState } from 'react';
import { PRODUCTS, BRAND } from '@/data/products';
import { zaloUrl } from '@/lib/brand';
import type { Lang } from '@/i18n/routes';
import { ui } from '@/i18n/ui';

/* Website chưa có backend nhận form. Nút gửi KHÔNG được giả vờ đã gửi.
   Thay vào đó: dựng sẵn nội dung khách điền, cố gắng chép vào clipboard,
   rồi mở Zalo để khách dán và gửi thật. */

export default function EnquiryForm({ selected, lang }: { selected?: string; lang: Lang }) {
  const t = ui(lang).form;
  const [status, setStatus] = useState<'idle' | 'error' | 'ready'>('idle');
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
      const target = (name ? form.elements.namedItem('phone') : form.elements.namedItem('name')) as HTMLElement | null;
      target?.focus();
      return;
    }

    const lines = [t.msg.title, `${t.msg.name}: ${name}`, `${t.msg.phone}: ${phone}`];
    if (productLabel) lines.push(`${t.msg.product}: ${productLabel}`);
    if (note) lines.push(`${t.msg.note}: ${note}`);
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(lines.join('\n')).then(() => setCopied(true)).catch(() => setCopied(false));
    }
    setStatus('ready');
    window.open(zaloUrl, '_blank', 'noopener');
  }

  return (
    <form className="enq" onSubmit={onSubmit} noValidate>
      <div className="field"><label htmlFor="c-name">{t.name}</label><input id="c-name" name="name" autoComplete="name" required /></div>
      <div className="field"><label htmlFor="c-phone">{t.phone}</label><input id="c-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required /></div>
      <div className="field">
        <label htmlFor="c-prod">{t.product}</label>
        <select id="c-prod" name="product" defaultValue={selected ?? ''}>
          <option value="">{t.productNone}</option>
          {PRODUCTS.map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="c-msg">{t.message}</label>
        <textarea id="c-msg" name="message" placeholder={t.messagePh} />
      </div>
      <button className="btn solid" type="submit" style={{ justifyContent: 'center' }}>{t.submit}</button>
      {status === 'error' && <div className="formmsg" role="alert">{t.required}</div>}
      {status === 'ready' && (
        <div className="formmsg" role="status">
          {t.readyA} {copied ? t.copied : t.notCopied} {t.ifNot} <a href={zaloUrl} target="_blank" rel="noopener" style={{ textDecoration: 'underline' }}>{t.openZalo}</a> {t.orCall} <a href={`tel:${BRAND.phoneHref}`} style={{ textDecoration: 'underline' }}>{BRAND.phone}</a>.
        </div>
      )}
    </form>
  );
}

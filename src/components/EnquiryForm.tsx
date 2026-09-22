'use client';

import { useState } from 'react';
import { PRODUCTS, BRAND } from '@/data/products';
import { zaloUrl } from '@/lib/brand';
import type { Lang } from '@/i18n/routes';
import { ui } from '@/i18n/ui';

/* Website chưa có backend nhận form. Nút gửi KHÔNG được giả vờ đã gửi.
   Thay vào đó: dựng sẵn nội dung khách điền, cố gắng chép vào clipboard,
   rồi mở Zalo để khách dán và gửi thật.
   Lỗi báo ngay tại ô thiếu (aria-invalid + mô tả dưới ô), không chỉ một dòng chung. */

export default function EnquiryForm({ selected, lang }: { selected?: string; lang: Lang }) {
  const t = ui(lang).form;
  const [status, setStatus] = useState<'idle' | 'ready'>('idle');
  const [bad, setBad] = useState<{ name?: boolean; phone?: boolean }>({});
  const [copied, setCopied] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const el = (n: string) => form.elements.namedItem(n) as HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement;
    const name = el('name').value.trim();
    const phone = el('phone').value.trim();
    const productSel = el('product');
    const productLabel = productSel.value ? productSel.options[productSel.selectedIndex].text : '';
    const note = el('message').value.trim();

    const errs = { name: !name, phone: !phone || phone.replace(/\D/g, '').length < 8 };
    setBad(errs);
    if (errs.name || errs.phone) {
      el(errs.name ? 'name' : 'phone').focus();
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
      <div className="field">
        <label htmlFor="c-name">{t.name}</label>
        <input id="c-name" name="name" autoComplete="name" required aria-invalid={bad.name || undefined} aria-describedby={bad.name ? 'c-name-err' : undefined} onInput={() => bad.name && setBad((b) => ({ ...b, name: false }))} />
        {bad.name && <span className="fielderr" id="c-name-err">{t.errName}</span>}
      </div>
      <div className="field">
        <label htmlFor="c-phone">{t.phone}</label>
        <input id="c-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-invalid={bad.phone || undefined} aria-describedby={bad.phone ? 'c-phone-err' : undefined} onInput={() => bad.phone && setBad((b) => ({ ...b, phone: false }))} />
        {bad.phone && <span className="fielderr" id="c-phone-err">{t.errPhone}</span>}
      </div>
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
      {status === 'ready' && (
        <div className="formmsg" role="status">
          {t.readyA} {copied ? t.copied : t.notCopied} {t.ifNot} <a href={zaloUrl} target="_blank" rel="noopener" style={{ textDecoration: 'underline' }}>{t.openZalo}</a> {t.orCall} <a href={`tel:${BRAND.phoneHref}`} style={{ textDecoration: 'underline' }}>{BRAND.phone}</a>.
        </div>
      )}
    </form>
  );
}

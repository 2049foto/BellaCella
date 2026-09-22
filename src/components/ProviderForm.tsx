'use client';

import { useState } from 'react';
import { BRAND } from '@/data/products';
import { zaloUrl } from '@/lib/brand';
import type { Lang } from '@/i18n/routes';
import { ui } from '@/i18n/ui';

/* Không có backend — không giả vờ đã gửi. Dựng nội dung đăng ký, chép clipboard,
   mở Zalo để cơ sở gửi thật. Lỗi báo ngay tại ô thiếu. */

export default function ProviderForm({ lang }: { lang: Lang }) {
  const f = ui(lang).form;
  const t = f.pv;
  const [status, setStatus] = useState<'idle' | 'ready'>('idle');
  const [bad, setBad] = useState<{ name?: boolean; phone?: boolean }>({});
  const [copied, setCopied] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const el = (n: string) => form.elements.namedItem(n) as HTMLInputElement & HTMLSelectElement;
    const name = el('name').value.trim();
    const phone = el('phone').value.trim();
    const city = el('city').value.trim();
    const type = el('type').value;

    const errs = { name: !name, phone: !phone || phone.replace(/\D/g, '').length < 8 };
    setBad(errs);
    if (errs.name || errs.phone) {
      el(errs.name ? 'name' : 'phone').focus();
      return;
    }

    const lines = [t.msg.title, `${t.msg.name}: ${name}`, `${f.msg.phone}: ${phone}`];
    if (city) lines.push(`${t.msg.city}: ${city}`);
    if (type) lines.push(`${t.msg.type}: ${type}`);
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(lines.join('\n')).then(() => setCopied(true)).catch(() => setCopied(false));
    }
    setStatus('ready');
    window.open(zaloUrl, '_blank', 'noopener');
  }

  return (
    <form className="enq" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="pv-name">{t.name}</label>
        <input id="pv-name" name="name" autoComplete="organization" required aria-invalid={bad.name || undefined} aria-describedby={bad.name ? 'pv-name-err' : undefined} onInput={() => bad.name && setBad((b) => ({ ...b, name: false }))} />
        {bad.name && <span className="fielderr" id="pv-name-err">{t.errName}</span>}
      </div>
      <div className="field">
        <label htmlFor="pv-phone">{f.phone}</label>
        <input id="pv-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-invalid={bad.phone || undefined} aria-describedby={bad.phone ? 'pv-phone-err' : undefined} onInput={() => bad.phone && setBad((b) => ({ ...b, phone: false }))} />
        {bad.phone && <span className="fielderr" id="pv-phone-err">{f.errPhone}</span>}
      </div>
      <div className="field"><label htmlFor="pv-city">{t.city}</label><input id="pv-city" name="city" autoComplete="address-level1" /></div>
      <div className="field">
        <label htmlFor="pv-type">{t.type}</label>
        <select id="pv-type" name="type" defaultValue={t.types[0]}>
          {t.types.map((x) => <option key={x}>{x}</option>)}
        </select>
      </div>
      <button className="btn solid" type="submit" style={{ justifyContent: 'center' }}>{t.submit}</button>
      {status === 'ready' && (
        <div className="formmsg" role="status">
          {t.readyA} {copied ? f.copied : t.notCopied} {f.ifNot} <a href={zaloUrl} target="_blank" rel="noopener" style={{ textDecoration: 'underline' }}>{t.openZalo}</a> {f.orCall} <a href={`tel:${BRAND.phoneHref}`} style={{ textDecoration: 'underline' }}>{BRAND.phone}</a>.
        </div>
      )}
    </form>
  );
}

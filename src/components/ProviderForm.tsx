'use client';

import { useState } from 'react';
import { BRAND } from '@/data/products';
import { zaloUrl } from '@/lib/brand';
import type { Lang } from '@/i18n/routes';
import { ui } from '@/i18n/ui';

/* Không có backend — không giả vờ đã gửi. Dựng nội dung đăng ký, chép clipboard,
   mở Zalo để cơ sở gửi thật. */

export default function ProviderForm({ lang }: { lang: Lang }) {
  const f = ui(lang).form;
  const t = f.pv;
  const [status, setStatus] = useState<'idle' | 'error' | 'ready'>('idle');
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
      const target = (name ? form.elements.namedItem('phone') : form.elements.namedItem('name')) as HTMLElement | null;
      target?.focus();
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
      <div className="field"><label htmlFor="pv-name">{t.name}</label><input id="pv-name" name="name" autoComplete="organization" required /></div>
      <div className="field"><label htmlFor="pv-phone">{f.phone}</label><input id="pv-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required /></div>
      <div className="field"><label htmlFor="pv-city">{t.city}</label><input id="pv-city" name="city" autoComplete="address-level1" /></div>
      <div className="field">
        <label htmlFor="pv-type">{t.type}</label>
        <select id="pv-type" name="type" defaultValue={t.types[0]}>
          {t.types.map((x) => <option key={x}>{x}</option>)}
        </select>
      </div>
      <button className="btn solid" type="submit" style={{ justifyContent: 'center' }}>{t.submit}</button>
      {status === 'error' && <div className="formmsg" role="alert">{f.required}</div>}
      {status === 'ready' && (
        <div className="formmsg" role="status">
          {t.readyA} {copied ? f.copied : t.notCopied} {f.ifNot} <a href={zaloUrl} target="_blank" rel="noopener" style={{ textDecoration: 'underline' }}>{t.openZalo}</a> {f.orCall} <a href={`tel:${BRAND.phoneHref}`} style={{ textDecoration: 'underline' }}>{BRAND.phone}</a>.
        </div>
      )}
    </form>
  );
}

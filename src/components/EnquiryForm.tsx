'use client';

import { useState } from 'react';
import { PRODUCTS, BRAND } from '@/data/products';

const OK_TEXT = 'Đã ghi nhận yêu cầu. BELLA CELLA sẽ liên hệ với bạn trong giờ làm việc. Cần gấp, vui lòng gọi ' + BRAND.phone + ' hoặc chat Zalo.';

export default function EnquiryForm({ selected }: { selected?: string }) {
  const [msg, setMsg] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value.trim();
    if (!name || !phone) {
      setMsg('Vui lòng nhập họ tên và số điện thoại để chúng tôi liên hệ lại.');
      const target = (name ? form.elements.namedItem('phone') : form.elements.namedItem('name')) as HTMLElement | null;
      target?.focus();
      return;
    }
    setMsg(OK_TEXT);
    setSent(true);
  }

  return (
    <form className="enq" onSubmit={onSubmit} noValidate>
      <div className="field"><label htmlFor="c-name">Họ và tên</label><input id="c-name" name="name" required /></div>
      <div className="field"><label htmlFor="c-phone">Số điện thoại</label><input id="c-phone" name="phone" type="tel" inputMode="tel" required /></div>
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
      <button className="btn solid" type="submit" style={{ justifyContent: 'center' }}>{sent ? 'Đã gửi' : 'Gửi yêu cầu'}</button>
      {msg && <div className="formmsg">{msg}</div>}
    </form>
  );
}

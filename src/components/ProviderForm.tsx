'use client';

import { useState } from 'react';

const OK_TEXT = 'Đã ghi nhận đăng ký hợp tác. Đội ngũ BELLA CELLA sẽ liên hệ trao đổi chính sách dành cho cơ sở của bạn.';

export default function ProviderForm() {
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
      <div className="field"><label htmlFor="pv-name">Tên cơ sở / người phụ trách</label><input id="pv-name" name="name" required /></div>
      <div className="field"><label htmlFor="pv-phone">Số điện thoại</label><input id="pv-phone" name="phone" type="tel" inputMode="tel" required /></div>
      <div className="field"><label htmlFor="pv-city">Tỉnh / thành</label><input id="pv-city" name="city" /></div>
      <div className="field">
        <label htmlFor="pv-type">Loại hình</label>
        <select id="pv-type" name="type" defaultValue="Spa">
          <option>Spa</option><option>Phòng khám da liễu</option><option>Thẩm mỹ viện</option><option>Nhà phân phối</option><option>Khác</option>
        </select>
      </div>
      <button className="btn solid" type="submit" style={{ justifyContent: 'center' }}>{sent ? 'Đã gửi' : 'Gửi đăng ký'}</button>
      {msg && <div className="formmsg">{msg}</div>}
    </form>
  );
}

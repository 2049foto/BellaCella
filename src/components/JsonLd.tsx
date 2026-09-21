/* Nhúng JSON-LD an toàn. Dữ liệu chỉ lấy từ products.ts + BRAND (nội bộ),
   không có input người dùng, nên chuỗi hoá trực tiếp. */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

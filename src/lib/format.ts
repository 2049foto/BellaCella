// Định dạng số theo locale Việt Nam, dùng cho giá VND.
export const vnd = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

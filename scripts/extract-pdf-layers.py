"""Trích các lớp ảnh gốc 2480x3507 từ catalogue PDF ra .src-img/ (đã gitignore).

Chạy:  python scripts/extract-pdf-layers.py "C:/Users/.../Catalogue BELLA CELLA VN.pdf"
Cần:   pip install pymupdf

Catalogue dựng bằng nhiều lớp ảnh chồng nhau, mỗi lớp một ảnh JPEG phủ cả trang.
Lớp nào chứa nội dung thật thì nặng (hàng trăm KB trở lên); lớp phủ gần rỗng chỉ ~100KB.
Các số xref dưới đây đo trên bản catalogue hiện tại; catalogue đổi thì chạy với --list để dò lại.
"""
import sys
import pathlib
import pymupdf

LAYERS = {
    177: 'layer-177',  # trang 1: người mẫu (hero)
    95: 'layer-95',    # trang 3: ảnh chứng thực
    126: 'layer-126',  # trang 4: kết cấu tinh chất
}

def main() -> None:
    if len(sys.argv) < 2:
        sys.exit('Thiếu đường dẫn PDF.')
    doc = pymupdf.open(sys.argv[1])
    if '--list' in sys.argv:
        for pno in range(doc.page_count):
            for img in doc[pno].get_images(full=True):
                info = doc.extract_image(img[0])
                print(f"trang {pno + 1}  xref {img[0]:4}  {info['width']}x{info['height']}  {len(info['image']) // 1024} KB")
        return
    out = pathlib.Path('.src-img')
    out.mkdir(exist_ok=True)
    for xref, name in LAYERS.items():
        info = doc.extract_image(xref)
        path = out / f"{name}.{info['ext']}"
        path.write_bytes(info['image'])
        print(f"{path}  {info['width']}x{info['height']}")

if __name__ == '__main__':
    main()

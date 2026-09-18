// Cho phép import ảnh tĩnh (next/image tự suy ra kích thước).
declare module '*.webp' {
  const content: import('next/image').StaticImageData;
  export default content;
}

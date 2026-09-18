import Image from "next/image";

export function AdminLogo() {
  return (
    <div className="gr-admin-logo">
      <Image
        src="/brand/wordmark.png"
        alt="growthrush.ai"
        width={1078}
        height={166}
        priority
      />
      <span>Content</span>
    </div>
  );
}

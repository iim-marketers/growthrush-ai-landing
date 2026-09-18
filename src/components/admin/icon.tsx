import Image from "next/image";

export function AdminIcon() {
  return (
    <Image
      className="gr-admin-icon"
      src="/brand/admin-icon.png"
      alt="growthrush.ai"
      width={256}
      height={256}
    />
  );
}

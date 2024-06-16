import Image from "next/image";
import LogoPng from "../../public/icon (1).png";

export default function Logo() {
  return (
    <Image
      src={LogoPng.src}
      alt="Logo"
      width={48}
      height={48}
      priority={true}
      className="size-10"
    />
  );
}

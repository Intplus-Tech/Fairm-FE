import Image from "next/image";

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
};

export default function Logo({
  width = 120,
  height = 40,
  className = "",
}: LogoProps) {
  return (
    <Image
      src="/images/fairm-logo.svg"
      alt="FAIRM Admin Logo"
      width={width}
      height={height}
      className={className}
      priority // preloads logo for faster rendering
    />
  );
}

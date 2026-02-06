import Image from "next/image";

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
};

export default function Word({
  width = 120,
  height = 40,
  className = "",
}: LogoProps) {
  return (
    <Image
      src="/images/fairm-word.svg"
      alt="FAIRM word Logo"
      width={width}
      height={height}
      className={className}
      priority // preloads logo for faster rendering
    />
  );
}

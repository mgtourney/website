import Image from "next/image";
export default function Icon({
  path,
  open,
  h,
  w,
}: {
  path: string;
  open: string | URL | undefined;
  h: number;
  w: number;
}) {
  return (
    <>
      <Image
        src={`/assets/icons/${path}`}
        onClick={() => window.open(open)}
        alt="Icon"
        width={w}
        height={h}
        className={`w-[${w}px] h-[${h}px] darkModeIcon`}
      />
    </>
  );
}

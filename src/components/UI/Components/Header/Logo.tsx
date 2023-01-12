import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="select-none flex items-center drop-shadow-[1px_1px_1px_rgba(0,0,0,0.10)] hover:cursor-pointer">
        <h1 className="LogoTextDark LogoText transition-all duration-500">
          MAGNESIUM
        </h1>
      </div>
    </Link>
  );
};

export default Logo;

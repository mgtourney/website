import { useEffect } from "react";
export default function PageHeader({ title }: { title: string }) {
  useEffect(() => {
    setTimeout(() => {
      const bannerDiv = document.querySelector(".bannerDiv");
      const textTag = document.querySelector(".textTag");
      bannerDiv!.classList.remove("opacity-0");
      textTag!.classList.remove("opacity-0");
      textTag!.classList.add("translate-x-[5px]");
    }, 0);
  }, []);

  return (
    <div className="bannerDiv skew-x-[-10deg] rounded-md opacity-0 bg-gradient-to-r from-[#B97EF5] dark:from-[#7B52A5] text-white h-[70px] pl-6 mb-5 flex justify-start items-center transition-all duration-500">
      <p className="textTag select-none font-bold ease-in-out transition-all hover:cursor-default skew-x-[10deg]">
        {title}
      </p>
    </div>
  );
}

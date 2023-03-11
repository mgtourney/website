export default function Divider({ text }: { text: any }) {
  return (
    <div className="relative my-5 transition-all duration-500">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-black dark:border-gray-400 opacity-[20%]" />
      </div>
      <div className="relative flex justify-center drop-shadow-[0_0_1px_rgba(0,0,0,0.30)]">
        <span className="select-none px-3 bg-[#007BC3] text-white dark:bg-[#333333] rounded-md text-lg font-medium skew-x-[-10deg]">
          <p className="skew-x-[10deg]">{text}</p>
        </span>
      </div>
    </div>
  );
}

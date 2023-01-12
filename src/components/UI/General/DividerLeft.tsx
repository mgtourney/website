export default function DividerLeft() {
  return (
    <div className="relative">
      <div className="inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t mt-[2rem] mb-[1rem] border-gray-300 dark:border-gray-700" />
      </div>
      <div className="relative flex justify-start" />
    </div>
  );
}

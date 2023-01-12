export default function H3({ text }: { text: string }) {
  return (
    <>
      <h3
        className={`text-2xl font-medium mt-2 mb-5 uppercase text-gray-900 dark:text-white border-b-[1px] border-gray-400 table`}
      >
        {text}
      </h3>
    </>
  );
}

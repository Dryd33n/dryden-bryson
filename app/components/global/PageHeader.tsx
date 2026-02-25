export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="py-60 md:py-20 px-4  sm:px-8 lg:py-30 lg:px-40 lg:mr-[40%] cursor-default">
      <div className="flex">
        <h1 className="text-5xl sm:text-6xl lg:text-6xl font-bold text-[#f76855] ">/</h1>
        <h1 className="text-5xl sm:text-6xl lg:text-6xl font-bold">{title}</h1>
      </div>
    </div>
  );
}
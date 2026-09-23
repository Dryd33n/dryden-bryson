import DarkModeToggle from "./DarkModeToggle";

export default function PageHeader({ title }: { title: string }) {
  return (
    <>
      <div className="absolute top-4 right-4 z-10">
        <DarkModeToggle />
      </div>
      <div className="pt-48 pb-8 px-4 sm:px-8 lg:py-30 lg:px-40 lg:mr-[40%] cursor-default">
        <h1 className="flex text-5xl sm:text-6xl lg:text-6xl font-bold">
          <span className="text-accent">/</span>{title}
        </h1>
      </div>
    </>
  );
}

import { Card } from "./categoryComponents/Card";

export function Category({ categories: { categories } }) {
  return (
    <div className="mx-4 sm:mx-6 my-6">
      <h2 className="text-white text-center text-2xl sm:text-3xl ">
        Your One And Only Destination for{" "}
        <span className="text-parrotGreen italic  underline decoration-parrotGreen">
          Sports
        </span>{" "}
        Equipment
      </h2>
      <div className="flex gap-4 items-center justify-around sm:justify-between flex-wrap mt-6 mx-8">
        {categories.map((category) => (
          <Card category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
}

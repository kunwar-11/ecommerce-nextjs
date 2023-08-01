import Image from "next/image";
import "../../styles/card.css";
import Link from "next/link";

export function Card({ category }) {
  return (
    <Link href={`${category.name}`}>
      <div className="category-card flex flex-col items-center justify-between border border-white hover:border-parrotGreen w-[320px] relative overflow-hidden">
        <img
          src={category.image}
          alt="text"
          // width={500}
          // height={500}
          className="w-full h-[200px]"
        />
        <div className="flex-grow bg-black/[0.7] w-full absolute textcontent">
          <h3 className="text-white p-4 text-center">{category.name}</h3>
          <p className="text-white px-2">{category.description}</p>
        </div>
      </div>
    </Link>
  );
}

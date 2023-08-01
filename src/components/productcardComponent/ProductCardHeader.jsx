import { WishlistButton } from "./WishlistButton";
import { Star } from "lucide-react";

export function ProductCardHeader({ product }) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-full">
        <img
          src={product.image}
          className="w-full h-[200px] rounded-md"
          alt="image"
        />
        <WishlistButton />
        <span className="flex items-center justify-center gap-1 absolute left-0 bottom-[4px] bg-black text-white px-1">
          {product.ratings} <Star fill="#97fb57" color="#97fb57" size={16} />
        </span>
      </div>
      <div className="w-full text-white mt-2">
        <small className="text-parrotGreen p-0.5text-[12px]">
          {product.category}
        </small>
        <div className="flex items-center justify-between">
          <h3 className="text-md font-semibold">{product.name}</h3>
          <p className="font-semibold">Rs {product.price}</p>
        </div>
      </div>
    </div>
  );
}

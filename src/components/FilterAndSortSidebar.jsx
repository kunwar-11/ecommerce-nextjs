"use client";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const initialPriceRanges = [
  {
    name: "above",
    label: "3000 and above",
    min: 9000,
    max: Number.MAX_SAFE_INTEGER,
    selected: false,
  },
  {
    name: "range1",
    label: "2600 - 2999",
    min: 7000,
    max: 8999,
    selected: false,
  },
  {
    name: "range2",
    label: "2000 - 2599",
    min: 7000,
    max: 8999,
    selected: false,
  },
  {
    name: "range3",
    label: "1600 - 1999",
    min: 5000,
    max: 6999,
    selected: false,
  },
  {
    name: "range4",
    label: "1000 - 1599",
    min: 3000,
    max: 4999,
    selected: false,
  },
  {
    name: "range5",
    label: "less than 999",
    selected: false,
  },
];

export function FilterAndSortSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [ratings, setRatings] = useState("");
  const [includeOutOfStock, setIncludeOutOfStock] = useState(false);
  const [priceSortOrder, setPriceSortOrder] = useState("");
  const [priceRange, setPriceRange] = useState(initialPriceRanges);

  useEffect(() => {
    setRatings(searchParams.get("ratings") || "");
    setIncludeOutOfStock(!!searchParams.get("addOutOfStock") || false);
    setPriceSortOrder(searchParams.get("pricesort") || "");
    const priceRangeObj = searchParams
      .getAll("priceRange")
      .reduce((acc, curr) => {
        return { ...acc, [curr]: true };
      }, {});
    setPriceRange((prev) =>
      prev.map((each) =>
        priceRangeObj[each.name] ? { ...each, selected: true } : each
      )
    );
  }, []);

  function ratingSelectHandler(e) {
    setRatings(e.target.value);
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    // update as necessary
    const value = e.target.value.trim();

    if (!value) {
      current.delete("ratings");
    } else {
      current.set("ratings", e.target.value);
    }

    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }

  function priceSoter(e) {
    setPriceSortOrder(e.target.value);
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    // update as necessary
    const value = e.target.value.trim();

    if (!value) {
      current.delete("pricesort");
    } else {
      current.set("pricesort", e.target.value);
    }

    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }

  function resetFilters() {
    setIncludeOutOfStock(false);
    setPriceSortOrder("");
    setRatings("");
    setPriceRange(initialPriceRanges);
    router.replace(pathname);
  }

  function checkOutOfStockIncluded(e) {
    setIncludeOutOfStock((prev) => !prev);
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const value = e.target.checked;
    if (!value) {
      current.delete("addOutOfStock");
    } else {
      current.set("addOutOfStock", e.target.checked);
    }

    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }

  function priceRangeSelector(e) {
    setPriceRange((prev) =>
      prev.map((each) =>
        each.name === e.target.name
          ? { ...each, selected: e.target.checked }
          : each
      )
    );

    const selectedRanges = priceRange
      .filter((range) => range.selected)
      .map((range) => range.name);
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (current.get("priceRange")) {
      //append
      if (selectedRanges.includes(e.target.name)) {
        console.log("true");
        const paramshere = current
          .getAll("priceRange")
          .filter((each) => each !== e.target.name);
        console.log(paramshere);
        current.delete("priceRange");
        paramshere.forEach((param) => {
          current.append("priceRange", param);
        });
      } else {
        console.log("false");
        current.append("priceRange", e.target.name);
      }
    } else {
      //set
      console.log("setting");
      current.set("priceRange", e.target.name);
    }

    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }

  return (
    <aside className="hidden sm:flex sm:flex-col sm:fixed sm:top-[74px] sm:left-0 sm:h-screen sm:w-[250px] sm:z-30 bg-black text-white text-center py-4">
      <div className="flex flex-col gap-2 items-center justify-center">
        {(ratings ||
          includeOutOfStock ||
          priceSortOrder ||
          new URLSearchParams(Array.from(searchParams.entries())).get(
            "priceRange"
          )) && <button onClick={resetFilters}>CLEAR FILTERS</button>}
        <div className="flex flex-col gap-4 py-4">
          <h5 className="text-sm">RATINGS</h5>
          <div className="flex items-center justify-center gap-4">
            <input
              type="radio"
              checked={ratings === "4andabove"}
              className="accent-parrotGreen"
              name="ratings"
              id="4andabove"
              value="4andabove"
              onChange={ratingSelectHandler}
            />
            <label
              htmlFor="4andabove"
              className="flex items-center justify-center"
            >
              <Star size={20} fill="#97fb57" color="#97fb57" />
              <Star size={20} fill="#97fb57" color="#97fb57" />
              <Star size={20} fill="#97fb57" color="#97fb57" />
              <Star size={20} fill="#97fb57" color="#97fb57" />
              <Star size={20} color="#97fb57" />
              <small className="text-white hover:text-parrotGreen text-sm ml-1">
                & Up
              </small>
            </label>
          </div>
          <div className="flex items-center justify-center gap-4">
            <input
              type="radio"
              checked={ratings === "3andabove"}
              className="accent-parrotGreen"
              name="ratings"
              id="3andabove"
              value="3andabove"
              onChange={ratingSelectHandler}
            />
            <label
              htmlFor="3andabove"
              className="flex items-center justify-center"
            >
              <Star size={20} fill="#97fb57" color="#97fb57" />
              <Star size={20} fill="#97fb57" color="#97fb57" />
              <Star size={20} fill="#97fb57" color="#97fb57" />
              <Star size={20} color="#97fb57" />
              <Star size={20} color="#97fb57" />
              <small className="text-white hover:text-parrotGreen text-sm ml-1">
                & Up
              </small>
            </label>
          </div>
          <div className="flex items-center justify-center gap-4">
            <input
              type="radio"
              checked={ratings === "2andabove"}
              className="accent-parrotGreen"
              name="ratings"
              id="2andabove"
              value="2andabove"
              onChange={ratingSelectHandler}
            />
            <label
              htmlFor="2andabove"
              className="flex items-center justify-between"
            >
              <Star size={20} fill="#97fb57" color="#97fb57" />
              <Star size={20} fill="#97fb57" color="#97fb57" />
              <Star size={20} color="#97fb57" />
              <Star size={20} color="#97fb57" />
              <Star size={20} color="#97fb57" />
              <small className="text-white hover:text-parrotGreen text-sm ml-1">
                & Up
              </small>
            </label>
          </div>
        </div>
        <div className="h-0.5 w-full bg-gray"></div>
        <div className="flex flex-col gap-4 py-4">
          <h5 className="text-sm">PRICE</h5>
          {priceRange.map((each) => (
            <div
              className="flex items-center justify-between gap-4"
              key={each.name}
            >
              <input
                type="checkbox"
                className="accent-parrotGreen"
                name={each.name}
                id="priceRange"
                checked={each.selected}
                onChange={priceRangeSelector}
              />
              <label htmlFor="priceRange" className="flex-grow text-left">
                {each.label}
              </label>
            </div>
          ))}
        </div>
        <div className="h-0.5 w-full bg-gray"></div>
        <div className="flex flex-col gap-2 py-4">
          <div className="flex items-center justify-between gap-4">
            <input
              type="checkbox"
              className="accent-parrotGreen"
              name="includeOutOfStockItems"
              id="includeOutOfStock"
              checked={includeOutOfStock}
              onChange={checkOutOfStockIncluded}
            />
            <label htmlFor="includeOutOfStock" className="flex-grow">
              Include Out Of Stock
            </label>
          </div>
        </div>
      </div>
      <div className="h-0.5 w-full bg-gray"></div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <input
              type="radio"
              checked={priceSortOrder === "ASC"}
              value="ASC"
              onChange={priceSoter}
              className="accent-parrotGreen"
              name="price-sort"
              id="lowtohigh"
            />
            <label htmlFor="lowtohigh" className="flex-grow">
              Price Low to High
            </label>
          </div>
          <div className="flex items-center justify-between gap-4">
            <input
              type="radio"
              checked={priceSortOrder === "DESC"}
              value="DESC"
              onChange={priceSoter}
              className="accent-parrotGreen"
              name="price-sort"
              id="hightolow"
            />
            <label htmlFor="hightolow" className="flex-grow">
              Price High to low
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
}

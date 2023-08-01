import React from "react";

export function FilterAndSort() {
  return (
    <footer className="flex justify-center z-10 fixed bottom-0 right-0 items-center w-full bg-black sm:hidden">
      <div className="p-4 border-r border-r-parrotGreen text-white text-center w-full">
        SORT
      </div>
      <div className="p-4 text-white text-center w-full">FILTER</div>
    </footer>
  );
}

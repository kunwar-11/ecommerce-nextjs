import Link from "next/link";
import { SearchBar } from "./navbarComponents/Searchbar";

export function Navbar() {
  return (
    <>
      <nav className="hidden sm:flex w-full sm:items-center sm:justify-between p-4 bg-black px-8 fixed top-0 left-0 z-20">
        <div>
          <Link href="/">
            <h1 className="text-2xl bolder text-white ">
              Sport<span className="text-parrotGreen text-4xl">X</span>
            </h1>
          </Link>
        </div>
        <SearchBar />
        <div>
          <Link href={"/login"}>
            <button className="bg-parrotGreen text-black py-2 px-10">
              Log In
            </button>
          </Link>
        </div>
      </nav>
      <nav className="flex sm:hidden w-full items-center flex-col justify-between p-4 bg-black px-4 gap-4 fixed top-0 left-0 z-20">
        <div className="flex items-center justify-between w-full ">
          <div>
            <h1 className="text-2xl bolder text-white ">
              Sport<span className="text-parrotGreen text-4xl">X</span>
            </h1>
          </div>
          <div>
            <Link href={"/login"}>
              <button className="bg-parrotGreen text-black py-2 px-10">
                Log In
              </button>
            </Link>
            {/* <Menu size={40} color="#fffafa" /> */}
          </div>
        </div>
        <SearchBar />
      </nav>
    </>
  );
}

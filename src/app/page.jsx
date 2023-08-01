import { Navbar, Banner, Category } from "../components";

async function getCategories() {
  const res = await fetch(`${process.env.DOMAIN}api/category`);
  return res.json();
}

export default async function Home() {
  const categories = await getCategories();

  console.log(categories, "f");
  return (
    <main>
      <Navbar />
      <Banner />
      {/* Show Categories */}
      <Category categories={categories} />
    </main>
  );
}

import {
  FilterAndSort,
  FilterAndSortSidebar,
  Navbar,
  ProductCard,
} from "../../components";
import { ProductCardHeader } from "../../components/productcardComponent/ProductCardHeader";

async function getProducts(category, searchParams) {
  const fetchUrl = `${process.env.DOMAIN}api/product/${category}`;
  if (Object.keys(searchParams).length) {
    const searchParam = new URLSearchParams(searchParams);
    const res = await fetch(`${fetchUrl}?${searchParam.toString()}`, {
      cache: "no-cache",
    });
    return res.json();
  } else {
    const res = await fetch(fetchUrl, {
      cache: "no-cache",
    });
    return res.json();
  }
}

export default async function Categories({ params, searchParams }) {
  const { products } = await getProducts(params.categories, searchParams);

  return (
    <div>
      <Navbar />
      <div>
        <FilterAndSortSidebar />
        <div className="my-[130px] sm:ml-[300px] sm:my-[110px] flex flex-wrap justify-center sm:justify-start items-center sm:gap-16">
          {products.length ? (
            products.map((product) => (
              <ProductCard product={product} key={product.id}>
                <ProductCardHeader product={product} />
              </ProductCard>
            ))
          ) : (
            <h1 className="text-white">
              No Products Avaialable with selected filtes
            </h1>
          )}
        </div>
      </div>
      <FilterAndSort />
    </div>
  );
}

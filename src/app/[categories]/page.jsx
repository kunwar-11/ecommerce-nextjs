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
    const res = await fetch(fetchUrl, {
      searchParams,
    });
    return res.json();
  } else {
    const res = await fetch(fetchUrl);
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
          {products.map((product) => (
            <ProductCard product={product} key={product.id}>
              <ProductCardHeader product={product} />
            </ProductCard>
          ))}
        </div>
      </div>
      <FilterAndSort />
    </div>
  );
}

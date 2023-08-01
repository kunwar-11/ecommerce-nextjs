import { connect } from "../../../../dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Product from "../../../../models/productModal";

connect();

const priceRangeObj = {
  above: {
    min: 3000,
    max: Number.MAX_SAFE_INTEGER,
  },
  range1: {
    min: 2600,
    max: 2999,
  },
  range2: {
    min: 2000,
    max: 2599,
  },
  range3: {
    min: 1600,
    max: 1999,
  },
  range4: {
    min: 1000,
    max: 1599,
  },
  range5: {
    min: 0,
    max: 999,
  },
};

export async function GET(request, context) {
  const { categories } = context.params;
  console.log(request.nextUrl.searchParams, "context");
  const options = {};
  options.category = categories;
  request.nextUrl.searchParams.get("ratings")
    ? (options.ratings = {
        $gte: request.nextUrl.searchParams.get("ratings").split("and")[0],
      })
    : delete options.ratings;
  request.nextUrl.searchParams.get("addOutOfStock")
    ? options.inStock
      ? delete options.inStock
      : ""
    : (options.inStock = true);
  const priceRangeQuery = request.nextUrl.searchParams.getAll("priceRange");
  if (priceRangeQuery.length) {
    options.$or = [];
    console.log(priceRangeQuery[0].split(","));
    // let min = Number.MAX_SAFE_INTEGER;
    // let max = Number.MIN_SAFE_INTEGER;
    priceRangeQuery[0].split(",").forEach((price) => {
      options.$or.push({
        price: {
          $gte: priceRangeObj[price].min,
          $lte: priceRangeObj[price].max,
        },
      });
    });

    // priceRangeQuery[0].split(",").forEach((price) => {
    //   if (priceRangeObj[price].max > max) {
    //     max = priceRangeObj[price].max;
    //   }
    // });
    // console.log(min, max);

    // options.price = {
    //   $gte: min,
    //   $lte: max,
    // };
  } else {
    options.price ? delete options.$or : "";
  }
  try {
    let productByCategory = await Product.find(options);

    if (!productByCategory.length) {
      return NextResponse.json({
        message: "No Products Found !!",
      });
    }
    if (request.nextUrl.searchParams.get("pricesort") === "ASC") {
      productByCategory = productByCategory.sort((a, b) => a.price - b.price);
    } else if (request.nextUrl.searchParams.get("pricesort") === "DESC") {
      productByCategory = productByCategory.sort((a, b) => b.price - a.price);
    }
    return NextResponse.json({
      success: true,
      products: productByCategory,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}

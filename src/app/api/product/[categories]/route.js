import { connect } from "../../../../dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Product from "../../../../models/productModal";

connect();

export async function GET(request, context) {
  const { categories } = context.params;
  console.log(context, "context");
  try {
    const productByCategory = await Product.find({
      category: categories,
    });
    if (!productByCategory.length) {
      return NextResponse.json({
        message: "No Products Found !!",
      });
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

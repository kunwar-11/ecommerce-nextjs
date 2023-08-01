import { connect } from "../../../dbConfig/dbConfig";
import Category from "../../../models/categoryModel";
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const categories = await Category.find({});
    return NextResponse.json({
      categories: categories,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}

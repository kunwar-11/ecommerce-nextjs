import { connect } from "../../../../dbConfig/dbConfig";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "../../../../models/userModel";
import Cart from "../../../../models/cartModel";
import Wishlist from "../../../../models/wishlistModel";

connect();

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "User Already Exists" },
        {
          status: 409,
        }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const newCart = new Cart({
      _id: savedUser._id,
      items: [],
    });

    await newCart.save();

    const newWishlist = new Wishlist({
      _id: savedUser._id,
      items: [],
    });

    await newWishlist.save();

    return NextResponse.json(
      {
        message: "User Created SuccessFully",
        user: savedUser,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

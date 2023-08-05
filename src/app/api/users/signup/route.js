import { connect } from "../../../../dbConfig/dbConfig";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "../../../../models/userModel";

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

    delete savedUser.password;
    console.log(savedUser);

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

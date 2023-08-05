import { connect } from "../../../../dbConfig/dbConfig";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "../../../../models/userModel";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          message: "Email Does not exxist , Please Sign Up!",
        },
        {
          status: 404,
        }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const tokenData = {
      id: user._id,
      firstname: user.firstName,
      lastname: user.lastName,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
        success: true,
      },
      {
        status: 200,
      }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

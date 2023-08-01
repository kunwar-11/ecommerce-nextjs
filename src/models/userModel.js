import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "please provide an firstName"],
  },
  lastName: {
    type: String,
    required: [true, "please provide an lastName"],
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide an password"],
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;

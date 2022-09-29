import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
    },
  },
  { timestamps: true }
);

//Password hashing
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//method that checks if the pass in the db and the pass given match
UserSchema.methods.comparePassword = async function (
  canditatePassword: string
) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

export default model<User>("User", UserSchema);

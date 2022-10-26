import mongoose, { Schema, model, ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

interface User {
  hotel: ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
  comparePassword: (arg0: string) => Boolean;
  lastName: string;
  phone: string;
  salary: string;
  admin: ObjectId;
}

const UserSchema = new Schema<User>(
  {
    hotel: {
      type: mongoose.Types.ObjectId,
      ref: "Hotel",
    },
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
      select: false,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    phone: {
      type: String,
    },
    salary: {
      type: String,
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

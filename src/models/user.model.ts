import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

const userSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, required: false, default: true },
    role: {
      type: String,
      enum: ["patient", "technician", "hospitaladmin"],
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;

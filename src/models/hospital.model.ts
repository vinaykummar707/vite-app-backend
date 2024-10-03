import mongoose, { Schema, Document } from "mongoose";

interface IHospital extends Document {
  name: string;
  branch: string;
  pincode: string;
  city: string;
  country: string;
  location: {
    lat: number;
    lng: number;
  };
  logo: string;
  isActive: boolean;
  createdBy: mongoose.Schema.Types.ObjectId; // Reference to the user who created the hospital
}

const hospitalSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    branch: { type: String, required: true },
    pincode: { type: String, required: true },
    city: { type: String, required: true }, // New field
    country: { type: String, required: true }, // New field
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    logo: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
  },
  { timestamps: true }
);

const Hospital = mongoose.model<IHospital>("Hospital", hospitalSchema);
export default Hospital;

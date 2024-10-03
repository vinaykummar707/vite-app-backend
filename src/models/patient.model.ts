import mongoose, { Schema, Document } from "mongoose";

interface IPatient extends Document {
  userId: mongoose.Types.ObjectId;
  hospitalId: mongoose.Types.ObjectId;
  regno: string;
  viralstatus: string;
  billingtype: "cash" | "credit" | "govt" | "other";
  isActive: boolean;
}

const patientSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    regno: { type: String, required: true },
    viralstatus: { type: String, required: true },
    billingtype: {
      type: String,
      enum: ["cash", "credit", "govt", "other"],
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Add a unique index on userId and hospitalId combination
patientSchema.index({ userId: 1, hospitalId: 1 }, { unique: true });

const Patient = mongoose.model<IPatient>("Patient", patientSchema);
export default Patient;

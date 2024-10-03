import Patient from "../models/patient.model";
import User from "../models/user.model";
import Hospital from "../models/hospital.model";
import mongoose from "mongoose";

export const createPatient = async (data: any) => {
  const { userId, hospitalId, regno, viralstatus, billingtype } = data;

  // Check if the user exists and has the role of 'patient'
  const user = await User.findById(userId);
  if (!user || user.role !== "patient") {
    throw new Error("Invalid user or user is not a patient");
  }

  // Check if the hospital exists
  const hospital = await Hospital.findById(hospitalId);
  if (!hospital) {
    throw new Error("Hospital not found");
  }

  // Check if a patient with the same userId and hospitalId already exists
  const existingPatient = await Patient.findOne({ userId, hospitalId });
  if (existingPatient) {
    throw new Error("Patient already exists for this user and hospital");
  }

  // Create a new patient record
  const newPatient = new Patient({
    userId,
    hospitalId,
    regno,
    viralstatus,
    billingtype,
  });

  return await newPatient.save();
};


export const getPatientsWithUserDetails = async (hospitalId: string) => {
    // Validate hospitalId format if necessary
    if (!hospitalId) {
      throw new Error('Hospital ID is required');
    }
  
    // Aggregate patients with user details
    const patients = await Patient.aggregate([
      { $match: { hospitalId: new mongoose.Types.ObjectId(hospitalId) } },
      {
        $lookup: {
          from: 'users', // The name of the users collection
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      { $unwind: '$userDetails' }, // Unwind the userDetails array
      {
        $project: {
          userId: 0, // Exclude userId from the response if needed
          'userDetails.password': 0, // Exclude password field from userDetails
          'userDetails.__v': 0, // Optionally exclude version key
          'userDetails.createdAt': 0, // Optionally exclude timestamps
          'userDetails.updatedAt': 0 // Optionally exclude timestamps
        }
      }
    ]);
  
    if (!patients || patients.length === 0) {
      throw new Error('No patients found for this hospital');
    }
  
    return patients;
  };
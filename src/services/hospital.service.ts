import Hospital from '../models/hospital.model';
import User from '../models/user.model';

export const createHospital = async (data: any) => {
  const { createdBy, name, branch, pincode, city, country, location, logo } = data;

  // Fetch the user who is creating the hospital
  const user = await User.findById(createdBy);
  if (!user || user.role !== 'hospitaladmin') {
    throw new Error('User not found or insufficient role');
  }

  // Check if hospital already exists
  const existingHospital = await Hospital.findOne({ name, branch, pincode, city, country });
  if (existingHospital) {
    throw new Error('Hospital already exists');
  }

  // Create a new hospital
  const newHospital = new Hospital({
    name,
    branch,
    pincode,
    city,
    country,
    location,
    logo,
    createdBy: user._id
  });

  return await newHospital.save();
};

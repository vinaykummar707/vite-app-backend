import User from "../models/user.model";
import bcrypt from "bcryptjs";

interface RegisterUserInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

export const getUserById = async (userId: string) => {
  // Validate userId format if necessary
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Fetch user details by userId and exclude the password field
  const user = await User.findById(userId).select('-password'); // Exclude password field
  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const registerUser = async (userData: RegisterUserInput) => {
  const { email, firstName, lastName, password, role } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the new user
  const newUser = new User({
    email,
    firstName,
    lastName,
    password: hashedPassword,
    role,
  });

  await newUser.save();

  return newUser;
};

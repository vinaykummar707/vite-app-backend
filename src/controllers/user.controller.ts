import { FastifyReply, FastifyRequest } from 'fastify';
import User from '../models/user.model';

export const getUserByIdController = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = request.params as { userId: string };

  try {
    // Validate userId format if necessary
    if (!userId) {
      return reply.status(400).send({ message: 'User ID is required' });
    }

   // Fetch user details by userId and exclude the password field
   const user = await User.findById(userId).select('-password'); // Exclude password field
   if (!user) {
     throw new Error('User not found');
   }

    return reply.status(200).send(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message });
    } else {
      return reply.status(500).send({ message: 'Server error' });
    }
  }
};

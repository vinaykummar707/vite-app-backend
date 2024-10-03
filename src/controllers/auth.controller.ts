import { FastifyReply, FastifyRequest } from 'fastify';
import { registerUser } from '../services/user.service';

export const registerUserController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userData = request.body as any;

    const newUser = await registerUser(userData);

    return reply.status(201).send({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    if (error instanceof Error) {
        // Handle known errors
        if (error.message === 'User already exists') {
          return reply.status(400).send({ message: error.message });
        }
        // Generic server error
        return reply.status(500).send({ message: 'Server error', error: error.message });
      } else {
        // Handle unknown errors
        return reply.status(500).send({ message: 'Unexpected error occurred' });
      }
  }
};

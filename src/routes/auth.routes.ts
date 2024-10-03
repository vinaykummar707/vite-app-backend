import { FastifyInstance } from 'fastify';
import { registerUserController } from '../controllers/auth.controller';

export default async function (app: FastifyInstance) {
  app.post('/register', registerUserController);
}

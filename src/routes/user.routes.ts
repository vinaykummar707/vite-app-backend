import { FastifyInstance } from 'fastify';
import { getUserByIdController } from '../controllers/user.controller';

export default async function (app: FastifyInstance) {
  app.get('/:userId', getUserByIdController);
}

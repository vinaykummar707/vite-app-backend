import { FastifyInstance } from 'fastify';
import { createHospitalController } from '../controllers/hospital.controller';

export default async function (app: FastifyInstance) {
  app.post('/', createHospitalController);
}

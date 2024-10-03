import { FastifyInstance } from 'fastify';
import { createPatientController, getPatientsByHospitalIdController } from '../controllers/patient.controller';

export default async function (app: FastifyInstance) {
    app.post('/', createPatientController);
    app.get('/hospital/:hospitalId', getPatientsByHospitalIdController); // New route
}

import { FastifyReply, FastifyRequest } from "fastify";
import { createPatient, getPatientsWithUserDetails } from "../services/patient.service";

export const createPatientController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const patient = await createPatient(request.body);
    return reply
      .status(201)
      .send({ message: "Patient created successfully", patient });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message });
    } else {
      return reply.status(500).send({ message: "Server error" });
    }
  }
};

export const getPatientsByHospitalIdController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { hospitalId } = request.params as { hospitalId: string };

  try {
    const patients = await getPatientsWithUserDetails(hospitalId);
    return reply.status(200).send(patients);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message });
    } else {
      return reply.status(500).send({ message: "Server error" });
    }
  }
};

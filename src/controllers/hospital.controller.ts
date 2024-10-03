import { FastifyReply, FastifyRequest } from "fastify";
import { createHospital } from "../services/hospital.service";

export const createHospitalController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const hospital = await createHospital(request.body);
    return reply
      .status(201)
      .send({ message: "Hospital created successfully", hospital });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message });
    } else {
      return reply.status(500).send({ message: "Server error" });
    }
  }
};

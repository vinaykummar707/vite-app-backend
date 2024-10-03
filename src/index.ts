import fastify from "fastify";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import hospitalRoutes from "./routes/hospital.routes";
import patientRoutes from "./routes/patient.routes";
import userRoutes from "./routes/user.routes";
import cors from "fastify-cors";
// Initialize environment variables
dotenv.config();

const app = fastify({ logger: true });

// Register CORS plugin
app.register(cors, {
  origin: "*", // Replace '*' with specific origins if you want to restrict access
  methods: ["GET", "POST", "PUT", "DELETE"], // Adjust allowed methods if needed
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/dialysisdb")
  .then(() => {
    app.log.info("MongoDB connected");
  })
  .catch((err) => {
    app.log.error("MongoDB connection failed", err);
  });

// Register routes
app.register(authRoutes, { prefix: "/api/auth" });
app.register(hospitalRoutes, { prefix: "/api/hospitals" }); // Hospital routes
app.register(patientRoutes, { prefix: "/api/patients" });
app.register(userRoutes, { prefix: "/api/users" });

// Start server
app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server running at ${address}`);
});

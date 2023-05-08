import fastify from "fastify";
import dotenv from "dotenv";
import multer from "fastify-multer";
import fastifyStatic from "@fastify/static";
import path from "path";
import cors from "@fastify/cors";
import { fastifySchedule } from "@fastify/schedule";

import userRoutes from "./routes/userRoute";
import profileRoutes from "./routes/profileRoute";
import galleryRoutes from "./routes/galeryRoute";
import paymentRoutes from "./routes/paymentRoute";

import { schedulerReport } from "./controllers/utilityController";

const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";

const app = fastify({});

dotenv.config();
app.register(cors, {
  origin: "*",
});
app.register(multer.contentParser);
app.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
});
app.register(fastifySchedule);

app.decorateRequest("email", "");
app.decorateRequest("id", 0);

// register route
app.register(userRoutes);
app.register(profileRoutes);
app.register(galleryRoutes);
app.register(paymentRoutes);

app.get("/", async (req, rep) => {
  rep.type("application/json").code(200);
  return {
    status: true,
    message: "Ping!",
  };
});

app.ready().then(() => {
  app.scheduler.addSimpleIntervalJob(schedulerReport);
});

app.listen({ port: PORT, host: HOST }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

export default app;

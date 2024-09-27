import express from "express";
import course from "./routes/courseRoutes.js";
import users from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import ErrorMiddleware from "./middlewars/Error.js";
import other from "./routes/otherRoutes.js";
import codeSnippetsRoutes from "./routes/codeSnippetRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/v1", course);
app.use("/api/v1", users);
app.use("/api/v1", other);
app.use("/api/v1", codeSnippetsRoutes);

export default app;

app.use(ErrorMiddleware);

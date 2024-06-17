import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productsRoutes.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", userRouter);
app.use("/api/products", productRouter);

app.listen(port, () =>
  console.log(`Server has started and running on port: ${port}`)
);

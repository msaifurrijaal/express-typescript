import express, { Request, Response } from "express";
import router from "./routes/Routes";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send({
    response: "Hello world guys",
  });
});

app.use(router);

app.listen(process.env.APP_PORT, () => {
  console.log(`Running on port ${process.env.APP_PORT}`);
});

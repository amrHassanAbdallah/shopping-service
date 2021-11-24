import { Router } from "express";
import images from "./routes/products";

export default () => {
  const app = Router();
  images(app);
  return app;
};

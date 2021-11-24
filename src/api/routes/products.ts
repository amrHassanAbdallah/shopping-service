import { Router, Request } from "express";
import path from "path";
import fs from "fs";
import config from "../../config";
import { Container } from "typedi";
import { Logger } from "winston";

import formidable from "formidable";
import ImageShaper from "../../services/imageShaper";
import FileNotFoundErr from "../../errors/FileNotFoundErr";
const route = Router();
const logger: Logger = Container.get("logger");
const productsService:ImageShaper = Container.get(ImageShaper);

export default (app: Router) => {
  app.use("/products", route);
  route.get("/:imageName", async (req: Request, res, next) => {

  });

  route.post("/", (req: Request, res) => {

  });
};

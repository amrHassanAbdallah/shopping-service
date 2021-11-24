import {Service, Inject} from "typedi";
import config from "../config";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import FileNotFoundErr from "../errors/FileNotFoundErr";


@Service()
class ProductService {
    constructor(@Inject("logger") private logger,@Inject("logger") private productsStore) {
    }

    public async list(
    ): Promise<> {

        try {
           let products = await this.productsStore.list();
           return products
        } catch (e) {
            throw e;
        }
    }
}


export default ImageShaper

import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import checkAuth from "../middleware/checkAuth";
import {productCreateValidator} from "../validators/product";
import {expressValidator} from "../validators/validator";

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    const data = await store.index()
    res.json(data)
}

const show = async (req: Request, res: Response) => {
    const data = await store.show(req.params.id)
    //todo handle 404
    res.json(data)
}

const create = async (req: Request, res: Response) => {

    //todo change it to be middleware
    const errors = expressValidator(req)
    if (errors.length > 0) {
        return res.status(400).json({
            method: req.method,
            status: res.statusCode,
            error: errors
        })
    }

    const obj: Product = {
        name: req.body.name,
        price:req.body.price,
        category:req.body.category,
    }

    try {


        const newObj = await store.create(obj)
        res.json(newObj)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.params.id)
    res.json(deleted)
}

const productsRoutes = (app: express.Application) => {
    app.get('/products/', index)
    app.get('/products/:id', show)
    app.post('/products/',productCreateValidator(), checkAuth,create)
    app.delete('/products/:id', destroy)
}

export default productsRoutes

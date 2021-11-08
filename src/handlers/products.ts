import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    const data = await store.index()
    res.json(data)
}

const show = async (req: Request, res: Response) => {
    const data = await store.show(req.body.id)
    res.json(data)
}

const create = async (req: Request, res: Response) => {
    try {
        const obj: Product = {
            title: req.body.title,
        }

        const newObj = await store.create(obj)
        res.json(newObj)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const productsRoutes = (app: express.Application) => {
    const routes = app.routes("/products")
    routes.get('/', index)
    routes.get('/:id', show)
    routes.post('/', create)
    routes.delete('/', destroy)
}

export default productsRoutes

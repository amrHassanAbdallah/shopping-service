import express, {Request, Response} from 'express'
import checkAuth from "../middleware/checkAuth";
import {productCreateValidator} from "../validators/product";
import {expressValidator} from "../validators/validator";
import {Order, OrderStore,OrderStatus} from "../models/order";
import {orderCreateValidator} from "../validators/order";
import {getUserIdFromHeaders} from "./utils";

const store = new OrderStore()

/*
const show = async (req: Request, res: Response) => {
    const data = await store.show(req.params.id)
    //todo handle 404
    res.json(data)
}*/

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
    const userId = getUserIdFromHeaders(req)

    const obj: Order = {
        products:req.body.products,
        user_id:parseInt(userId),
        status:OrderStatus.Active
    }

    try {

        const newObj = await store.create(obj)
        res.json(newObj)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
/*

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.params.id)
    res.json(deleted)
}
*/

const ordersRoutes = (app: express.Application) => {
    app.post('/orders/', checkAuth,orderCreateValidator(), create)
/*
    app.get('/orders/:id', show)
    app.delete('/orders/:id', destroy)
*/
}

export default ordersRoutes

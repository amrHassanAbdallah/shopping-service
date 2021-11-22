import express, { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { User, UserStore } from '../models/user'
import DuplicateRecordErr from "../errors/DuplicateRecordErr";
import config from "../config";
import checkAuth from "../middleware/checkAuth";
import {userCreateValidator} from "../validators/user";
import {expressValidator} from "../validators/validator";
import {OrderStore} from "../models/order";
import {getUserIdFromHeaders} from "./utils";




const store = new UserStore()
const ordersStore = new OrderStore()

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (_req: Request, res: Response) => {
    const user = await store.show(_req.params.id)
    res.json(user)
}
const myOrders = async (req: Request, res: Response) => {
    const userId = req.params.id
    if (userId != getUserIdFromHeaders(req)){
        return res.status(403).json({
            "message":"user not auth"
        })
    }
    const orders = await ordersStore.getUserOrders(userId)
    res.json(orders)
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

    const user: User = {
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    }
    try {
        const newUser = await store.create(user)
        res.json({
            "token":jwt.sign({user:newUser},config.TOKEN_SECRET,{
                expiresIn: "1h"
            })

        })

    } catch(err) {
        if (err instanceof DuplicateRecordErr){
            return res.status(err.statusCode).json({
                message:err.message
            })
        }
        console.log(err)
        res.status(500)
        res.json({
            "message":"failure happened while storing a user"
        })
    }
}

const destroy = async (_req: Request, res: Response) => {
    const deleted = await store.delete(_req.params.id)
    res.json(deleted)
}

const authenticate = async (_req: Request, res: Response) => {
    const user: User = {
        username: _req.body.username,
        password: _req.body.password,
    }
    try {
        const u = await store.authenticate(user.username, user.password)
        res.json({
            "token":jwt.sign({user:u},config.TOKEN_SECRET,{
                expiresIn: "1h"
            })
        })
    } catch(err) {
        res.status(401)
        res.json({
            "message":"invalid credentials"
        })
    }
}
const userRoutes = (app: express.Application) => {
    app.get('/users', checkAuth,index)
    app.get('/users/:id',checkAuth, show)
    app.get('/users/:id/orders',checkAuth, myOrders)
    app.post('/users', userCreateValidator(),create)
    app.delete('/users/:id',checkAuth, destroy)
    app.post('/users/auth', authenticate)
}
export default userRoutes

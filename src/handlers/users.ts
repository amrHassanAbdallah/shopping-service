import express, { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { User, UserStore } from '../models/user'
import DuplicateRecordErr from "../errors/DuplicateRecordErr";
import config from "../config";
import checkAuth from "../middleware/checkAuth";


const userRoutes = (app: express.Application) => {
    app.get('/users', checkAuth,index)
    app.get('/users/{:id}',checkAuth, show)
    app.post('/users', create)
    app.delete('/users/{:id}',checkAuth, destroy)
    app.post('/users/auth', authenticate)
}

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (_req: Request, res: Response) => {
    const user = await store.show(_req.body.id)
    res.json(user)
}

const create = async (_req: Request, res: Response) => {
    const user: User = {
        username: _req.body.username,
        password: _req.body.password,
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
    const deleted = await store.delete(_req.body.id)
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

export default userRoutes

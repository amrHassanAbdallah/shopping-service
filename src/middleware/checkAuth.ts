import express from "express";
import * as jwt from 'jsonwebtoken';
import config from '../config'
import {User} from "../models/user";

function checkAuth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    let token = req.header("Authorization")
    if (!token|| token.split("Bearer ").length != 2){
        return res.status(401).json({
            "message":"Authorization is required"
        })
    }else{
        token = token.split("Bearer ")[1]
    }
    try {
        let jwtPayload =  jwt.verify(token,config.TOKEN_SECRET)
        let castedObj = (jwtPayload as {user :User})
        req.headers["X-User-Id"] = castedObj.user.id
    }catch (err){
        return res.status(401).send({
            "message":"Authorization is required"
        });
    }

    next()

}

export default checkAuth;

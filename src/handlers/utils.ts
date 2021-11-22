import express, {Request, Response} from 'express'

export function getUserIdFromHeaders(req: Request) {
    return req.headers["X-User-Id"] as string
}
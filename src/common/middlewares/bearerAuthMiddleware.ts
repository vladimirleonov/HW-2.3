import {Request, Response, NextFunction} from 'express'
import {HTTP_CODES} from "../../settings"
import {bearerAdapter} from "../adapters/bearer.adapter"
import {JwtPayload} from "jsonwebtoken"

export const bearerAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader: string | undefined = req.headers.authorization

    if (!authHeader || authHeader.indexOf('Bearer ') === -1) {
        res.status(HTTP_CODES.UNAUTHORIZED).send()
        return
    }

    const token: string = authHeader.split(' ')[1]

    try {
        const decoded: JwtPayload = bearerAdapter.verifyToken(token) as JwtPayload
        req.user = decoded
        next()
    } catch (err) {
        res.status(HTTP_CODES.UNAUTHORIZED).send()
        return
    }
}
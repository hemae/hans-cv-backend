import {Request, Response, NextFunction} from 'express'
import {error403, error500} from '../../requestHTTPHandlers'
import jwt from 'jsonwebtoken'
import configGetter from '../../configGetter'
import {generateAdminCode} from '../../tools/generateAdminCode'


export async function adminAuth(req: Request, res: Response, next: NextFunction) {

    if (req.method === 'OPTIONS') {
        return next()
    }

    try {

        const {code} = req.query as {code: string}

        try {
            jwt.verify(code, configGetter('jwtSecret')!)
        } catch (e: any) {
            switch (true) {
                case e.name === 'TokenExpiredError':
                    await generateAdminCode()
                    return error403(res)
                case e.name === 'JsonWebTokenError':
                    return error403(res)
                case e.name === 'NotBeforeError':
                    return error403(res)
                default:
                    throw new Error('Cannot get authorization')
            }
        }

        next()
    } catch (e) {
        error500('admin auth middleware', res, e)
    }
}

import {Request, Response, NextFunction} from 'express'
import {error401, error500} from '../../requestHTTPHandlers'
import {cookieParser} from '../../helpers'
import jwt from 'jsonwebtoken'
import configGetter from '../../configGetter'


export async function auth(req: Request & {isAuth?: boolean}, res: Response, next: NextFunction) {

    if (req.method === 'OPTIONS') {
        return next()
    }

    try {

        const {headers} = req
        const {cookie} = headers

        if (!cookie) return error401(res)

        const parsedCookie = cookieParser(cookie, ['jwt'])

        if (!parsedCookie.jwt) return error401(res)

        try {
            jwt.verify(parsedCookie.jwt, configGetter('jwtSecret')!)
        } catch (e: any) {
            switch (true) {
                case e.name === 'TokenExpiredError':
                    return error401(res)
                case e.name === 'JsonWebTokenError':
                    return error401(res)
                case e.name === 'NotBeforeError':
                    return error401(res)
                default:
                    throw new Error('Cannot get authorization')
            }
        }

        req['isAuth'] = true

        next()
    } catch (e) {
        error500('auth middleware', res, e)
    }
}

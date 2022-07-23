import {Request, Response, NextFunction} from 'express'
import {error500} from '../../requestHTTPHandlers'
// import orderRequestUserMessage from '../../tools/nodemailer/messages/orderRequestUserMessage'


export async function orderRequestMessage(req: Request, res: Response, next: NextFunction) {

    if (req.method === 'OPTIONS') {
        return next()
    }

    try {

        // const {data} = req.body

        // orderRequestUserMessage(data)

        next()
    } catch (e) {
        error500('user agent middleware', res, e)
    }
}

import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import crypt from 'hans-cryptor'
import configGetter from '../../configGetter'
import {getArrayData} from '../../dataHandlers/getArrayData'
import {error403, status200, status200Message} from '../../requestHTTPHandlers'
import {generateAdminCode} from '../../tools/generateAdminCode'



export async function login(req: Request, res: Response) {
    const {data} = req.body as {data: {username: string, password: string}}
    const {username, password} = data

    const admins = getArrayData({folderName: 'admins'})

    const admin = admins.find(adm => adm.username === username)
    if (!admin) return error403(res)

    if (!crypt.compare(password, admin.password, configGetter('passwordSecret')!)) return error403(res)

    const token = jwt.sign(
        {username: admin.username},
        configGetter('jwtSecret')!,
        {expiresIn: '12h'}
    )

    status200(res, {token})
}

export async function generateNewAdminCode(req: Request, res: Response) {
    const {data} = req.body as {data: {username: string, password: string}}
    const {username, password} = data

    const admins = getArrayData({folderName: 'admins'})

    const admin = admins.find(adm => adm.username === username)
    if (!admin) return error403(res)

    if (!crypt.compare(password, admin.password, configGetter('passwordSecret')!)) return error403(res)

    await generateAdminCode()

    status200Message(res, 'Check your email')
}

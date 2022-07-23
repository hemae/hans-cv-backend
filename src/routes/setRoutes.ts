import {DatabaseDataFolderName} from '../configGetter'
import {IRouter} from 'express'
import {HandlerType, MyMethod, myMethods} from '../controllers/generalController/types'
import {getControllers} from '../controllers/generalController'
import {getMethodAndPath} from './helpers'
import {auth} from '../middlewares'


type Options = {
    availableMethods?: [boolean, boolean, boolean, boolean, boolean],
    isAuth: [boolean, boolean, boolean, boolean, boolean]
    additionalMiddlewares?: {middleware: HandlerType, method: MyMethod}[]
}

export default function setRoutes(folderName: DatabaseDataFolderName, router: IRouter, options: Options): void {

    const {
        availableMethods = [true, true, true, true, true],
        isAuth = [false, false, false, false, false],
        additionalMiddlewares
    } = options

    const controllers = getControllers(folderName)

    myMethods.forEach((myMethod, index) => {
        const middlewares = []
        if (!availableMethods[index]) return
        if (isAuth[index]) middlewares.push(auth)
        const additionalMiddleware = additionalMiddlewares?.find(middleware => middleware.method === myMethod)
        if (additionalMiddleware) middlewares.push(additionalMiddleware.middleware)
        const [method, path] = getMethodAndPath(myMethod)
        router[method](path, ...middlewares, controllers[myMethod])
    })
}

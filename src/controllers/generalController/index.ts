import {error500} from '../../requestHTTPHandlers'
import {Controller, Controllers, GControllerType, HandlerType} from './types'
import {DatabaseDataFolderName} from '../../configGetter'
import {deleteData, getData, getsData, postData, putData} from '../../requestHandlers'
export {
    HandlerType,
    GControllerType,
    Controller
} from './types'



export const controller = (handler: HandlerType): HandlerType => async (req, res) => {
    try {return await handler(req, res)} catch (e) {error500('general controller', res, e)}
}


export function getControllers(folderName: DatabaseDataFolderName): Controllers {
    return {
        gets: controller(getsData(folderName)),
        get: controller(getData(folderName)),
        post: controller(postData(folderName)),
        put: controller(putData(folderName)),
        delete: controller(deleteData(folderName))
    }
}

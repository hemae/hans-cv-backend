import {Request, Response} from 'express'
import {DatabaseFolderName} from '../configGetter'
import pagination from '../queryHandlers/pagination'
import {getArrayDataForResponse} from '../dataHandlers'
import generateId from 'hans-id'
import {jsonFileDeleter, jsonFileReader, jsonFileWriter} from '../fileHandlers'
import {status200, status201} from '../requestHTTPHandlers'


export function getsData(folderName: DatabaseFolderName) {
    return async function(req: Request, res: Response) {
        let {page, pageSize, sort, filters} = req.query as {
            page?: string,
            pageSize?: string,
            sort?: string,
            filters?: string | string[]
        }
        if (typeof filters === 'string') filters = [filters]
        res.json(pagination(page, pageSize, getArrayDataForResponse({folderName, sort, filters})))
    }
}

export function getData(folderName: DatabaseFolderName) {
    return async function(req: Request, res: Response) {
        const {id} = req.params
        status200(res, getArrayDataForResponse({folderName}).find(s => s.id === id) || null)
    }
}

export function postData(folderName: DatabaseFolderName) {
    return async function(req: Request, res: Response) {
        const {data} = req.body
        const uniqueId = generateId()
        data['id'] = uniqueId
        data['createdAt'] = new Date().toISOString()
        data['updatedAt'] = new Date().toISOString()
        data['publicVisible'] = false
        data['order'] = 0
        jsonFileWriter<string>({
            fileName: uniqueId,
            folderName: folderName,
            data
        })
        status201(res, jsonFileReader(folderName)(uniqueId))
    }
}

export function putData(folderName: DatabaseFolderName) {
    return async function(req: Request, res: Response) {
        const {id} = req.params
        const {data} = req.body
        data['updatedAt'] = new Date().toISOString()
        const itemData = {...jsonFileReader(folderName)(id), ...data}
        jsonFileWriter<string>({
            fileName: id,
            folderName: folderName,
            data: itemData
        })
        status200(res, jsonFileReader(folderName)(id))
    }
}

export function deleteData(folderName: DatabaseFolderName) {
    return async function(req: Request, res: Response) {
        const {id} = req.params
        const item = jsonFileReader(folderName)(id)
        jsonFileDeleter(folderName, id)
        status200(res, item)
    }
}


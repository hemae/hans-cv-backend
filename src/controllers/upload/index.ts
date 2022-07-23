import {Request, Response} from 'express'
import configGetter, {FolderName, ImagesFolderName} from '../../configGetter'
import {status200, status200Message, status201} from '../../requestHTTPHandlers'
import {rmSync} from 'fs'
import {dirReader} from '../../fileHandlers'


export async function upload(req: Request & {files: any}, res: Response) {
    const {chunkName} = req.params
    for (let file of req.files) {
        let ext: 'jpeg' | 'png' | 'gif' | 'jpg' = file.originalname.split('.').pop()
        if (ext === 'jpg') {
            ext = 'jpeg'
        }
    }
    const imageLinks: string[] = []
    //@ts-ignore
    req.files.forEach(file => {
        imageLinks.push(`/api/upload/${chunkName}/${file.filename}`)
    })
    status201(res, {imageLinks})
}

export async function deleteImage(req: Request, res: Response) {
    const {chunkName} = req.params

    const {data} = req.body as {data: {imageLinks: string[]}}
    const {imageLinks} = data

    const imageNames = imageLinks.map(imageLink => imageLink.split('/').pop())

    imageNames.forEach(imageName => rmSync(`${configGetter('images')}/${chunkName}/${imageName}`))

    status200Message(res, 'Files have been deleted successfully')
}

export async function getImage(req: Request, res: Response) {
    const {chunkName, imageName} = req.params

    res.statusCode = 200
    res.setHeader('Content-Type', 'image')
    //@ts-ignore
    require('fs').readFile(`${configGetter('images')}/${chunkName}/${imageName}`, (err, image) => {
        res.end(image)
    })
}

export async function getAllImages(req: Request, res: Response) {
    const {chunkName} = req.params as {chunkName: FolderName}

    status200(res, dirReader((chunkName + 'Images') as ImagesFolderName).map(fileName => `/api/upload/${chunkName}/${fileName}`))
}

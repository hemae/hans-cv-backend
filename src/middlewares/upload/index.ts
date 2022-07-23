import multer, {FileFilterCallback} from 'multer'
import {Request, Express} from 'express'
import generateId from 'hans-id'
import {createFile} from '../../tools/fileCreator'
import configGetter from '../../configGetter'


const storage = multer.diskStorage({
    destination(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        const {chunkName} = req.params
        createFile(`${configGetter('images')}/${chunkName}/images-${chunkName}-Data.dat`, '')
        callback(null, `${configGetter('images')}/${chunkName}/`)
    },
    filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        const {chunkName} = req.params
        const ext = file.originalname.split('.').pop()
        callback(null, `${generateId()}-${chunkName}.${ext}`)
    }
})

const acceptedExtensions = ['jpeg', 'jpg', 'png', 'bmp', 'gif', 'ico']

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
    if (!!~acceptedExtensions.indexOf(file.mimetype.split('/')[1])) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

export const upload = multer({storage, fileFilter})

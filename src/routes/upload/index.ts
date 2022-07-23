import {Router} from 'express'
import {upload} from '../../middlewares'
import {deleteImage, getAllImages, getImage, upload as uploadController} from '../../controllers/upload'
import {controller} from '../../controllers/generalController'


const router = Router()

//@ts-ignore
router.post('/:chunkName', upload.array('images'), controller(uploadController))
router.post('/delete/:chunkName', controller(deleteImage))
router.get('/:chunkName/:imageName', controller(getImage))
router.get('/all/images/:chunkName', controller(getAllImages))

module.exports = router

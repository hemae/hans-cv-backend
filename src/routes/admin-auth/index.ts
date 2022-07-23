import {Router} from 'express'
import {adminAuth} from '../../middlewares'
import {generateNewAdminCode, login} from '../../controllers/admin-auth'
import {controller} from '../../controllers/generalController'

const router = Router()

router.post('/', adminAuth, controller(login))
router.post('/generate-new-admin-code', controller(generateNewAdminCode))

module.exports = router

const { signup, login , getData} = require('../controllers/authController')
const auth = require('../middleware/auth')
const { loginValidation, signupValidation } = require('../middleware/validation')

const router=require('express').Router()

router.post('/login', loginValidation, login)
router.post('/signup', signupValidation, signup)
router.get('/home', auth, getData)


module.exports=router
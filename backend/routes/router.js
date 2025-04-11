const { signup, login , getData} = require('../controllers/authController')
const auth = require('../middleware/auth')
const { loginValidation, signupValidation } = require('../middleware/validation')

const router=require('express').Router()

router.post('/login', loginValidation, login)
router.get('/login', (req, res)=>{
    res.send('login khul gya')
})
router.get('/signup', (req, res)=>{
    res.send('signup khul gya')
})

router.post('/signup', signupValidation, signup)
router.get('/home', auth, getData)


module.exports=router
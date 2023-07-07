import { Router } from 'express';
import { createUser, getAll, getByEmail, updateUserPassword } from '../dao/session.js';
import { authMiddleware } from '../middlewares/auth.js';
import { createHash, isValidPassword } from '../utils/index.js';
const sessionRouter = Router();

sessionRouter.get('/register', (req, res) => {
    res.render('register', {})
})

sessionRouter.post('/register', async (req, res) => {
    let user = req.body;
    let userFound = await getByEmail(user.email);
    if(userFound){
        res.render('register-error', {})
    }
    user.password = createHash(user.password);
    let result = await createUser(user)
    console.log(result)
    res.render('login', {})
})

sessionRouter.get('/login', (req, res) => {
    res.render('login', {})
})

sessionRouter.post('/login', async (req, res) => {
    let user = req.body;
    let result = await getByEmail(user.email)
    if(!user || !isValidPassword(result, user.password)){
        res.render('login-error',{})
    }
    req.session.user = user.email;
    res.render('datos', { user: req.session.user })
})

sessionRouter.get('/profile', authMiddleware, async (req, res) => {
    let user = await getByEmail(req.session.user);
    res.render('datos', { user })
})

sessionRouter.get('/logout', (req, res) => {
    req.session.destroy(error => {
        res.render('login')
    })
})

sessionRouter.get('/restore', (req, res) => {
    res.render('restore-password', {})
})

sessionRouter.post('/restore', async (req, res) => {
    let user = req.body;
    let userFound = await getByEmail(user.email);
    if(!userFound){
        res.render('register', {})
    }else{
        let newPassword = createHash(user.password);
        let result = await updateUserPassword(user.email, newPassword);
    }

    res.render('login', { user })
})

export default sessionRouter;

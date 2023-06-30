import { Router } from 'express';
import { createUser, getAll, getByEmail } from '../dao/session.js';
import { authMiddleware } from '../middlewares/auth.js';
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
    if(user.password !== result.password){
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

export default sessionRouter;

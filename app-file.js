import express from 'express';
import session from 'express-session';
import FileStore from 'session-file-store';

const app = express();

const fileStorage = FileStore(session);

app.use(session({
    store: new fileStorage({ path: './sessions', ttl: 1000, retries: 0}),
    secret: 'esteesmisecret',
    resave: false,
    saveUninitialized: false
}))

app.get('/', (req, res) => {
    req.session.user = 'admin';
    res.send('ok')
})

app.get('/value', (req, res) => {
    res.send(req.session.user)
})

const server = app.listen(8080, () =>  console.log(`Server running on port: ${server.address().port}`))
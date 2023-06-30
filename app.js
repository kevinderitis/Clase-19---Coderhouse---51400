import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import sessionRouter from './src/routes/session.js';
import handlebars from 'express-handlebars';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('.hbs', handlebars.engine({ extname: '.hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://coderhouse:coder123456@coderhouse.z88zdi9.mongodb.net/session?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 3600
    }), 
    secret: 'esteesmisecret',
    resave: false,
    saveUninitialized: false
}))

app.use('/api/session', sessionRouter)

const server = app.listen(8080, () =>  console.log(`Server running on port: ${server.address().port}`))
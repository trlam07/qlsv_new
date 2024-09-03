const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const hostname = '127.0.0.1';
const port = 80;

const app = express();

app.use(session({
  secret: 'con ga an thoc',
  resave: false,
  saveUninitialized: true,
//   cookie: { secure: true }
}))

app.use(ejsLayouts);
app.use(express.static(path.join(__dirname, 'public')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('views', './views');
app.set('view engine', 'ejs');

const studentRouter = require('./routers/StudentRouter');
app.use('/', studentRouter);

app.listen(port, hostname, () => {
    console.log(`Server is running in ${port}`)
})
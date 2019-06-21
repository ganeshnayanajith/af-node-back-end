//import packages
const Express = require('express');
const app = Express();
const Morgan = require('morgan');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');

//import files
const UserRoutes = require('./api/routes/user.routes');
const CoursesRoutes = require('./api/routes/course.routes');
// const userRoutes = require('./api/routes/userRoutes');
// const mobilePaymentsRoutes = require('./api/routes/mobilePaymentsRoutes');
// const creditPaymentsRoutes = require('./api/routes/creditPaymentsRoutes');

//connect mongodb atlas cloud
Mongoose.connect('mongodb://localhost:27017/react-group-project', {
    useCreateIndex: true,
    useNewUrlParser: true
});

Mongoose.Promise=global.Promise;

app.use(Morgan('dev'));
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

//config cross origin servers.allows to communicate with api
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json();
    }
    next();
});


//redirect relevent routes to relavant files
app.use('/node/user', UserRoutes);
app.use('/node/course', CoursesRoutes);
// app.use('/books', booksRoutes);
// app.use('/mobilePayments', mobilePaymentsRoutes);
// app.use('/creditPayments', creditPaymentsRoutes);


//if enter wrong url this code execute and show error
app.use((req, res, next) => {
    const error = new Error('Url Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
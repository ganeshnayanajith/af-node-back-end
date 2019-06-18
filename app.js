//import packages
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//import files
// const trainsRoutes = require('./api/routes/trainsRoutes');
// const booksRoutes = require('./api/routes/booksRoutes');
// const userRoutes = require('./api/routes/userRoutes');
// const mobilePaymentsRoutes = require('./api/routes/mobilePaymentsRoutes');
// const creditPaymentsRoutes = require('./api/routes/creditPaymentsRoutes');

//connect mongodb atlas cloud
mongoose.connect('mongodb://localhost:27017/react-group-project', {
    useCreateIndex: true,
    useNewUrlParser: true
});

mongoose.Promise=global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
app.use('/node/test', function(req,res){
    console.log('done');
});
// app.use('/trains', trainsRoutes);
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
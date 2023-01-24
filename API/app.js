const express = require('express');
const app = express();
const morgan = require('morgan'); 
const bodyParser = require('body-parser') 
const mongoose = require('mongoose'); 

const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');


//MongoDB connection
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/SocialMedia_MERN')
.then(() => console.log('Connected to DB!'));


app.use(morgan('dev'));
app.use('/uploads/profileImages',express.static('uploads/profileImages'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next) => {
    res.header(
        "Access-Control-Allow-Origin",
        "*"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested_With,Content_type,Accept,Authorization"
    );
    if(req.method === 'PRTIONS'){
        res.header(
            "Access-Control-Allow-Methods",
            "PUT,POST,PATCH.DELETE,GET"
        );
        return res.status(200).json({});
    }
    next();
});


app.use('/users',userRoutes);
app.use('/posts',postRoutes);

//error handling
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message
        }
    });
});


module.exports = app;
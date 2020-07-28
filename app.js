const express = require('express');
const mongoose = require('mongoose');
const appProp = require('./app-properties');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const agencyRouter = require('./api/routes/agency')
const app = express();

app.use(morgan('dev'));
mongoose.connect(appProp.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/login', (req, res, next) => {
    //demo user
    const user = {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        email: "johndoe@gmail.com"
    };

    jwt.sign(user, appProp.jwtSecret, (err, token) => {
        if(!err) {
            res.status(200).json({token});
        }
    });
});

app.use('/agency', verifyToken, agencyRouter);

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if(authHeader != null) {
        const splittedToken = authHeader.split(" ");
        const token = splittedToken[1];
        jwt.verify(token, appProp.jwtSecret, (err, authData) => {
            if(err) {
                res.status(403).json({
                    message: "Invalid token"
                });
            } else {
                next();
            }
        });
    } else {
        res.status(403).json({
            message: "Please provide a token"
        });
    }
}

module.exports = app;
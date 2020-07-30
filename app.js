const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appProp = require('./app-properties');
const morgan = require('morgan');
const agencyRouter = require('./src/api/routes/agency');
const clientRouter = require('./src/api/routes/client');
const AuthService = require('./src/api/services/authentication');
const swaggerJSDOC = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = require('./swagger-options');

const app = express();


const swaggerDocs = swaggerJSDOC(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect(appProp.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/login', (req, res, next) => {

    AuthService.login().then((token) => {
        res.status(200).json({ token });
    }).catch((error) => {
        throw error;
    });
});

app.use('/agency', AuthService.verifyToken, agencyRouter);
app.use('/client', AuthService.verifyToken, clientRouter);

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
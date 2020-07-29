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

const app = express();
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Agency API",
            description: "Agency API Information",
            contact: {
                name: "Prathamesh Madur"
            },
            servers: [{ url: "http://localhost:3000", description: "Local server" }],
            version: "1.0.0"
        },
        components: {
            schemas: {
                agency: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string"
                        },
                        address1: {
                            type: "string"
                        },
                        address2: {
                            type: "string"
                        },
                        state: {
                            type: "string"
                        },
                        city: {
                            type: "string"
                        },
                        phoneNumber: {
                            type: "string"
                        }
                    }
                },
                client: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string"
                        },
                        email: {
                            type: "string"
                        },
                        phoneNumber: {
                            type: "string"
                        },
                        totalBill: {
                            type: "integer"
                        }
                    }
                },
                agencyandclient: {
                    type: "object",
                    properties: {
                        agencyDetails: {
                            $ref: "#/components/schemas/agency"
                        },
                        clientDetails: {
                            $ref: "#/components/schemas/client"
                        }
                    }
                }
            }
        },
        paths: {
            "/login": {
                get: {
                    tags: ["login"],
                    summary: "Returns jwt token",
                    description: "Returns a jwt token for authentication",
                    responses: {
                        "200": {
                            description: "Successfully returns token",
                            content: "application/json"
                        }
                    }
                }
            },
            "/agency/addAgencyAndClient": {
                post: {
                    tags: ["addAgencyAndClient"],
                    summary: "Add agency and client",
                    description: "Adds a new agency and client",
                    parameters: [
                        {
                            in: "body",
                            name: "body",
                            required: "true",
                            schema: {
                                $ref: "#/components/schemas/agencyandclient"
                            }
                        },
                        {
                            in: "header",
                            name: "Authorization",
                            description: "JWT token for authentication",
                            type: "string",
                            required: "true"
                        }
                    ],
                    responses: {
                        "201": {
                            description: "Successfully created/updated agency and client",
                            content: "application/json"
                        }
                    }
                }
            },
            "/client/update": {
                put: {
                    tags: ["updateClient"],
                    summary: "Update client",
                    description: "Update the client document",
                    parameters: [
                        {
                            in: "body",
                            name: "body",
                            required: "true",
                            schema: {
                                allOf: [
                                    {
                                        type: "object",
                                        properties: {
                                            "_id": {
                                                type: "string"
                                            }
                                        }
                                    },
                                    {
                                        $ref: "#/components/schemas/client"
                                    }
                                ]
                            }
                        },
                        {
                            in: "header",
                            name: "Authorization",
                            description: "JWT token for authentication",
                            type: "string",
                            required: "true"
                        }
                    ],
                    responses: {
                        "201": {
                            description: "Successfully updated client",
                            content: "application/json"
                        }
                    }
                }
            }
        }
    },
    apis: ["app.js", "./src/api/routes/*.js"]
};

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
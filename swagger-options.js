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
                        },
                        "500": {
                            description: "Exception occured on server side"
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
                        },
                        "500": {
                            description: "Exception occured on server side"
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
                        },
                        "500": {
                            description: "Exception occured on server side"
                        }
                    }
                }
            },
            "/agency/getTopClient": {
                get: {
                    tags: ["getAllTopClients"],
                    summary: "get top client among all the agencies",
                    description: "get top client among all the agencies",
                    parameters: [
                        {
                            in: "header",
                            name: "Authorization",
                            description: "JWT token for authentication",
                            type: "string",
                            required: "true"
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Successfully fetched top clients for all agencies",
                            content: "application/json"
                        },
                        "500": {
                            description: "Exception occured on server side"
                        }
                    }
                }
            }
        }
    },
    apis: ["app.js", "./src/api/routes/*.js"]
};

module.exports = swaggerOptions;
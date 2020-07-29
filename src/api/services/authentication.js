const jwt = require('jsonwebtoken');
const appProp = require('../../../app-properties');

class AuthService {
    constructor() { }

    static login() {
        return new Promise((resolve, reject) => {
            //demo user
            const user = {
                id: 1,
                firstname: "John",
                lastname: "Doe",
                email: "johndoe@gmail.com"
            };

            jwt.sign(user, appProp.jwtSecret, (err, token) => {
                if (!err) {
                    resolve("Bearer " + token);
                } else {
                    reject(err);
                }
            });
        });
    }

    static verifyToken(req, res, next) {
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
}

module.exports = AuthService;
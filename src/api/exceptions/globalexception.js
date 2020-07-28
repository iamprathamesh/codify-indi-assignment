class GlobalException {
    constructor(status, message) { 
            this.status = status;
            this.message = message;
    }

    getStatus() {
        return this.status;
    }

    getMessage() {
        return this.message;
    }
}

module.exports = GlobalException;
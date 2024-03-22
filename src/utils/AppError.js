class AppError{
    message;
    statusCode;

    constructor(mensage, statusCode = 400){
        this.message = mensage
        this.statusCode = statusCode
    }
}

module.exports = AppError
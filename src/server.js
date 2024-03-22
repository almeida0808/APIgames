require("express-async-errors")

const AppError = require("./utils//AppError")

const express = require("express");

const routes = require("./routes")

const app = express();

app.use(express.json());

app.use(routes)

app.use((error, request, response, next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status:"error",
            message: error.message
        })
    }

    console.error(error)

    return response.status.json({
        status: "error",
        message: error.message
    })
})


const PORT = 7777; // definimos o ndereço da porta
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

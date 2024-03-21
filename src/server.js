const express = require("express");

const routes = require("./routes")

const app = express();

app.use(express.json());

app.use(routes)


const PORT = 7777; // definimos o ndereço da porta
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

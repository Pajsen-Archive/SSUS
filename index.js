const express = require("express");
const app = express();


app.get("/r/:code", (request, response) => {});


app.listen(3030, () => { console.log("Started server at port 3030")})

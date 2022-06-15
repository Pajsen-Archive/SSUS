const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const { getUrl, save, checkUnique } = require("./database.js")


function splitString(str) {
    const indexOfSpace = str.indexOf(' ');

    if (indexOfSpace === -1) {
        return '';
    }

    return str.substring(indexOfSpace + 1);
}


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/q/:code", async function(request, response) {
    let code = request.params.code;
    console.log(code)
    const Unique = checkUnique(code);
    if (Unique === false) {
        getUrl(`${code}`, function(data) {
            response.redirect("searchofchoice.jontes.page/?q=" + data[0].TERM)
        })
    }
    if (Unique === true) {
        response.send("URL does not exist").status(200).end()
    }
});

app.post("/add", async function(request, response) {
    let term = request.body.term;
    let code = CreateCode(8);
    database.save(term, code)
    response.send(code).status(200).end()
})
app.listen(3030, () => { console.log("Started server at port 3030") })


async function CreateCode(len, callback) {
    let text = "";
    let text2 = "";
    let charset =
        "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < len / 2; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    for (let i = 0; i < len / 2; i++)
        text2 += charset.charAt(Math.floor(Math.random() * charset.length));

    callback(text + "-" + text2);
};
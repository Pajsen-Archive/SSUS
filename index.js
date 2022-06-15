const express = require("express"); //Import the Express.JS package
const app = express(); //Create an application
const bodyParser = require("body-parser") //Import body parser
const { getUrl, save, checkUnique } = require("./database.js") //Import the KEY and database handler


//Start Body parser
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());


//Create a path that has params
app.get("/q/:code", async function(request, response) {
    let code = request.params.code; //get the param
    const Unique = checkUnique(code); //Check if it exsists or not
    if (Unique === false) { 
        //If it exists, get the code from the database
        getUrl(`${code}`, function(data) {
            //Redirect the user to the main page
            response.redirect("https://searchofchoice.jontes.page/?q=" + data[0].TERM)
        })
    }
    if (Unique === true) {
        //If it does not exist, redirect the user
        response.redirect("https://searchofchoice.jontes.page/").status(200).end()
    }
});


app.post("/add", async function(request, response) {
    let term = request.body.term;
    //Store the term thats posted in the body
    let code = CreateCode(8);
    //generate a random 8 key long string and assign it to code
    database.save(term, code)
    //tell the database handler to save the term and the code
    response.send(code).status(200).end()
    //send the code to the client, assign the 200 OK HTTP status and end the request
})


//Generate a random key/code
function CreateCode(len, callback) {
    let text = "";
    let charset = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < len / 2; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));

    return (text);
};

//Handle 404
app.all('*', (req, res) => {
  res.status(404).redirect('https://searchofchoice.jontes.page/');
});

app.listen(3030, () => { console.log("Started server at port 3030") })

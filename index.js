const express = require("express");
const app = express();
const {database} = require("./database.js")
app.get("/q/:code", async function(request, response){

});

app.post("/add", async function(request, response){
	let term = request.body.term;
	let code = CreateCode(8);
	database.save(term, code)
})
app.listen(3030, () => { console.log("Started server at port 3030")})


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
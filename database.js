var mysql = require("mysql");
var config = require("./config.js");
var fs = require("fs");
let pool = mysql.createConnection(config.url);

var connection = mysql.createConnection({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("Connected to database as id " + connection.threadId);
});

function getUrl(code, callback) {
  pool.query(
    "SELECT *" + " FROM URLS WHERE ID =" + code + ";",
    function (error, results, fields) {
      if (error) throw error;
      //console.log('Response: ', results[0]);
      callback(results);
    }
  );
}

async function getAll() {
  pool.query("SELECT *" + " FROM URLS;", function (error, results, fields) {
    if (error) throw error;
    //console.log('Response: ', results);
  });
}

async function save(TERM, ID) {
  const Unique = checkUnique(ID);
  if (Unique === false) {
    console.log("The data was not Unique, cannot add to database");
  }
  if (Unique === true) {
    //console.log("The data was Unique")
    pool.query(
      'INSERT INTO URLS (ID,TERM) VALUES("' + ID + '","' + TERM + '")',
      function (error, results, fields) {
        console.log("Added the following data to database:", TERM, ",", ID);
        if (error) throw error;
      }
    );
  }
}
function checkUnique(code) {
  var data = fs.readFileSync("./codes.txt");

  if (data.includes("'" + code + "'")) {
    return false;
  } else {
    fs.appendFile("./codes.txt", "\n'" + code + "'", function (err) {});
    return true;
  }
}

module.exports.getUrl = getUrl;
module.exports.save = save;
module.exports.checkUnique = checkUnique;

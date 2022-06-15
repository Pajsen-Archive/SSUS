var mysql = require("mysql");
var config = require("./config.js")
var fs = require("fs");
var pool = mysql.createConnection(config.url);



function getUrl(code, callback) {
    pool.query('SELECT *' + " FROM URLS WHERE ID =" + code + ";", function(error, results, fields) {
        if (error) throw error;
        //console.log('The solution is: ', results[0]);
        callback(results);
    });

};
async function getAll() {
    pool.query('SELECT *' + " FROM URLS;", function(error, results, fields) {
        if (error) throw error;
        //console.log('The solution is: ', results);
    });
};


async function save(TERM, ID) {
    const Unique = checkUnique(ID);
    if (Unique === false) {
        console.log("The data was not Unique")
    }
    if (Unique === true) {
        //console.log("The data was Unique")
        pool.query('INSERT INTO URLS (ID,TERM) VALUES("' + ID + '","' + TERM + '")', function(error, results, fields) {
            if (error) throw error;
        });
    }
};
function checkUnique(code) {
    var data = fs.readFileSync("./codes.txt");

    if (data.includes("'" + code + "'")) {
        return false;
    } else {
        fs.appendFile("./codes.txt", "\n'" + code + "'", function(err) {})
        return true;
    }
}

module.exports.getUrl = getUrl;
module.exports.save = save;
module.exports.checkUnique = checkUnique;


var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
const app     = express();
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shreyas10",
  database: "voting"
});

app.post('/url',function(req, res) {
	var json_data=req.body;
	//console.log(json_data)
	var result=[]
	for(var i in json_data)
    result.push(json_data [i]);
    //console.log([result]);
    con.connect(function(err) {
		  if (err) throw err;
		  var sql = "INSERT INTO votes (bat, bowl,field,emerge,fair,catch) VALUES ?";
		  con.query(sql,[[result]], function (err, result) {
		    if (err) throw err;
		  });
	});
	return res.redirect('/index.html')
})
app.listen(port, function() {
  console.log('connected to:'+port);
});

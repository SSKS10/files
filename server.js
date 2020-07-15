const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var express = require('express');
var fs = require('fs'); 
var parse = require('csv-parse');
var bodyParser = require('body-parser');
var path=require('path')
const app     = express();
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


const url1='https://github.com/SSKS10/SlamBook/blob/master/out.csv';
app.get('*', (req, res)=>  {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.post('/url',function(req, res) {
	var json_data=req.body;
	//console.log(json_data)
	const csvWriter = createCsvWriter({
	  path: url1,
	  header: ['bat','bowl','field','emerge','fair','catch' ],
	  append: true
	});
    //console.log([result]);
    //console.log([json_data,]);
    csvWriter
  	.writeRecords([json_data]);

});


app.listen(port, function() {
  console.log('connected to:'+port);
});

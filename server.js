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


const url='https://github.com/SSKS10/SlamBook/blob/master/out.csv';
app.get('*', (req, res)=>  {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.post('/url',function(req, res) {
	var json_data=req.body;
	//console.log(json_data)
	const csvWriter = createCsvWriter({
	  path: './out.csv',
	  header: ['code','bat','bowl','field','emerge','fair','catch' ],
	  append: true
	});
    csvWriter
  	.writeRecords([json_data]);

  	return res.redirect('./index.html')
});
app.post('/resi',function(req, res) {
	var csvData=[];
	fs.createReadStream('./out.csv')
    .pipe(parse({delimiter: ':',from_line:2}))
    .on('data', function(csvrow) {
        row= csvrow[0].split('\n');
       //console.log(row.length);

        for(let x=0;x<row.length;x++)
        	if (row[x]!='')
        		csvData.push(row[x].split(','));
    //console.log(csvData[0]);       
    })
    .on('end',function() {
      //do something with csvData'
      let link='<link rel="stylesheet" href="./style.css">';
      let h='<h1> Result </h1>';
      let str= '<table>';
      let row='<tr><th>Code</th><th>Bat</th><th>bowl</th><th>field</th><th>emerge</th><th>fair</th><th>catch</th></tr>'
      for(let j=0;j<csvData.length;j++)
      {
      	row=row+'<tr>';
      	for(let k=0;k<csvData[j].length;k++)
      	{
      		row=row+'<td>'+csvData[j][k]+'</td>';
      	}
      	row=row+'</tr>';
      }

      str=link+str+row+'</table><br>';
      str=str+'<form action="/result.html"><input type="submit" value="Submit"></form>';
      return res.send(h+str);
      //console.log(csvData);
    });
});

app.post('/check',function(req, res) {
	var json_data=req.body;
	var data1=[];
	var flag=0;
	
	fs.createReadStream('./out1.csv')
    .pipe(parse({delimiter: ':',from_line:1}))
    .on('data', function(csvrow) {
        row= csvrow[0].split(',');
       //console.log(row);
       //console.log(json_data.name,json_data.code);
       	var data={'name':'','code':'','val':''};
        	data.name=row[0];
        	data.code=row[1];
        	data.val=row[2];
		if (row[2]=='0' && row[0]==json_data.name && row[1]==json_data.code)
        	{
        		flag=1;
        		data['val']='1';
        	} 
        	//console.log(data)
        	data1.push(data);
        	//votherconsole.log(data1)  	  
    })
    .on('end',function() {
        if(flag==1)
    	{
    		//console.log('\n');
    		//console.log(data1);
    		const csvWriter = createCsvWriter({
			  path: './out1.csv',
			  header: ['name','code','val' ],
			});
		    csvWriter.writeRecords(data1);

    		return res.redirect('./index.html');
    	}  
    });
});

app.listen(port, function() {
  console.log('connected to:'+port);
});

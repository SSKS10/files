
var express = require('express');
var fs = require('fs'); 
var parse = require('csv-parse');
var bodyParser = require('body-parser');
var path=require('path');
const https = require('https');
const app     = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


const data_url="https://raw.githubusercontent.com/SSKS10/Algorithmic_project/master/data.json";
const log_url="https://raw.githubusercontent.com/SSKS10/Algorithmic_project/master/log.json";

app.get('/', (req, res)=>  {
  res.sendFile(__dirname+ '/index.html');
});
console.log(__dirname);
app.post('/url',function(req, res) {
	var json_data=req.body;
	//console.log(json_data)
	let data = JSON.stringify(json_data);
	fs.writeFileSync(data_url, data);

  return res.render('/index.html');
});

app.post('/resi',function(req, res) {
  let str= '<table>';
	https.get(log_url,(res1) => {
    let body = "";

    res1.on("data", (chunk) => {
        body += chunk;
    });
    
    res1.on("end", () => {
        var json=(JSON.parse(body));

      let link='<link rel="stylesheet" href="./style.css">';
      let h='<h1> Result </h1>';
      let row='';
      //let row='<tr><th>Code</th><th>Bat</th><th>bowl</th><th>field</th><th>emerge</th><th>fair</th><th>catch</th></tr>'
      for(let j=0;j<json.length;j++)
      {
        //console.log(typeof(json[j]['Name']));
        row=row+'<tr>';
          row=row+'<td>'+(json[j]['Name'])+'</td>';
        row=row+'</tr>';
      }
      //str=link+str;
      str=str+row+'</table><br>';
      str=h+str+'<form action="/index.html"><input type="submit" value="Home"></form>';
     //console.log(str);
      return res.send(str);
    });

    
  }).on("error", (error) => {
      console.error(error.message);
  });
	
});

app.post('/check',function(req, res) {
	var json_data=req.body;
	var data1=[];
	var flag=0;
  https.get(log_url,(res) => {
      let body = "";

      res.on("data", (chunk) => {
          body += chunk;
      });
     //console.log('1');
      res.on("end", () => {
          var json=JSON.parse(body);
          var ind=-1;
          for(var i=0;i<json.length;i++)
          {
            if(json_data['Bool']==0 && json_data.name==json[i]['Name'] &&json_data.code==json[i]['Code'])
            {
                ind=i;
                res.render('/index.html');
                break;
            }
          }
          if(ind>=0)
          {
             //write to i th line
          }
         
      });

    }).on("error", (error) => {
        console.error(error.message);
    });
});

app.listen(port, function() {
  console.log('connected to:'+port);
});

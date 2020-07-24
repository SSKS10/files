var express = require('express');
const app     = express();
app.use(express.static(__dirname));
const simpleGit = require('simple-git')();
// Shelljs package for running shell tasks optional
// Simple Git with Promise for handling success and failure
//const simpleGitPromise = require('simple-git/promise')();

const gitHubUrl = `https://${'SSKS10'}:${'shreyask10'}@github.com/${'SSKS10'}/${'files'}`;
// add local git config like username and email
simpleGit.addConfig('user.email','shreyaskhadke@gmail.com');
simpleGit.addConfig('user.name','SSKS10');

try{simpleGit.init().addRemote('origin',gitHubUrl);}
catch{console.log('error');}


simpleGit.add('.')
    .then(
       (addSuccess) => {
       	console.log('1');
        simpleGit.commit('Intial commit by simplegit')
	   .then(
		      (successCommit) => {
		      	console.log('2');
				        simpleGit.push('origin','master')
				    .then((success) => {
				    	console.log('3');
				       console.log('repo successfully pushed');
				    },(failed)=> {
				       console.log(failed);
				 });  
	     }, (failed) => {
	        console.log('failed commmit');
	 });
       }, (failedAdd) => {
          console.log('adding files failed');
    });



  
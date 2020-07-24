// Simple-git without promise 
const simpleGit = require('simple-git')();
// Shelljs package for running shell tasks optional
const shellJs = require('shelljs');
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
          console.log(addSuccess);
       }, (failedAdd) => {
          console.log('adding files failed');
    });
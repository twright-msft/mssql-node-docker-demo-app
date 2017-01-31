'use strict';

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var ConnectionResult = "";

const express = require('express');

// Constants
const PORT = 8080;

//Use setInterval to retry the connection the SQL Server until it connects to allow time for the SQL Server container to come up
var connectionAttempts = 1;
var connected = false;
console.log("Attempting connection...");
setInterval(function () {
  if(!connected) {
    var config = {
        userName: 'sa'
        ,password: 'Yukon900'
        ,server: 'localhost'
        ,options: {database:'master'}
        //Uncomment if you need to debug connections/queries
        ,debug:
          {
          packet: true,
          data: true,
          payload: true,
          token: true,
          log: true
          }
        };
    var connection = new Connection(config);
    console.log("Connection attempt: " + connectionAttempts);
    connectionAttempts++;
    /* Uncomment if you need to debug connections/queries
    connection.on('infoMessage', infoError);
    connection.on('errorMessage', infoError);
    connection.on('debug', debug);
    */
    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
            ConnectionResult = "Connection failed.  :'("
        } else {
            ConnectionResult = "Connected! :)";
        }
    });
  }
}
, 10000);


// App
const app = express();
app.get('/', function (req, res) {
  res.send(ConnectionResult);
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);


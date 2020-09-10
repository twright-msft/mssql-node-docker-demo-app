var express = require('express'); // Web Framework
var app = express();
var sql = require('mssql'); // MS Sql Server client

// Connection string parameters.
var sqlConfig = {
    user: 'sa',
    password: 'Yukon900',
    server: 'localhost',
    port:'1433',
    database: 'DemoData'
}

function getData(res){
  var conn = new sql.Connection(sqlConfig);
  var req = new sql.Request(conn);
  conn.connect(function(err) {
    if (err) {
      console.log(err);
      return;
  }
  req.query("SELECT * FROM DemoData.dbo.Products", function (err, recordset) {
      if (err) {
          console.log(err);
          return;
      }
      else {
          console.log(recordset);
          res.end(JSON.stringify(recordset)); 
      }
      conn.close();
  });
  });
}
function getdatabyname(req,res){
 
  var conn = new sql.Connection(sqlConfig);
  var reques = new sql.Request(conn);
  conn.connect(function(err) {
    if (err) {
      console.log(err);
      return;
  }
  console.log(req.params)
  var stringRequest = "SELECT * FROM DemoData.dbo.Products Where ProductName = '" + req.params.ProductName + "'"; 
  reques.query(stringRequest, function (err, recordset) {
      if (err) {
          console.log(err);
          return;
      }
      else {
          console.log(recordset);
          res.end(JSON.stringify(recordset)); 
      }
      conn.close();
  });
})
}

app.get('/customers', function (req, res) {
  getData(res);
})
app.get('/customers/:ProductName/', function (req, res) {

getdatabyname(req,res);
})

// Start server and listen on http://localhost:8081/
var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});
var fs = require('fs');
var geojson = require('./sun2geojson.js')

fs.readFile('border.json', function(err, data){
  console.log(data.toString());
  var datj = JSON.parse(data.toString());
  console.log(datj)
  geojson(datj);
})

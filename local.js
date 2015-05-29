var fs = require('fs');
var geojson = require('./sun2geojson.js')

module.exports = blah;

function blah (cb){
  fs.readFile('border.json', 'utf-8', function(err, data){
  //console.log(data.toString());
  var datj = JSON.parse(data.toString());
//  console.log(datj);
  //var nowgeojson = geojson(datj);


  console.log('geojson turned to string') //JSON.stringify(data));


   cb( data);


 })

}

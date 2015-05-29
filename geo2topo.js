

var topojson = require("topojson");
var locey = require("./local.js");
var fs = require("fs")


var gogo = {
          type: "FeatureCollection",
          features: [

          ]
        }





//console.log()
locey(bleeper);
function bleeper (geoj){
var id = 1;
  console.log('what I try to use is');
  console.log(typeof(geoj));
  var tose = JSON.parse(geoj);
  console.log(typeof(tose));

  console.log(tose);

  var bleep = {
            type: "FeatureCollection",
            features: [

            ]
          }


console.log(bleep)

console.log(tose.features[2].geometry.coordinates)
  bleep.features.push(tose.features[0]);
//bleep.features.push(tose.features[2]);

  var toppy = topojson.topology({colli:tose}, function(d){
    console.log('in the topo callback')
  })


  for (i in tose.features){
    //console.log(i)


  }




 console.log(  //Object.key
 (toppy)
 ) //.objects.collection))

 fs.writeFile('bordop.topojson', JSON.stringify(toppy), function(err, dat){
   if(err){
     console.error('somehting was probably dumb');
   }

   console.log('a bordop file shoulda been made');

 })

}


var practer = {
          type: "FeatureCollection",
          features: [
            {type: "Feature", geometry: {type: "LineString", coordinates: [[.1, .2], [.3, .4]]}},
            {type: "Feature", geometry: {type: "Polygon", coordinates: [[[.5, .6], [.7, .8]]]}}
          ]
        }
  var toprac = topojson.topology({colli:gogo});

  console.log(practer)
  console.log(toprac)

var OpenStates = require('openstates');
var apiKey = require('./api/sunkey.js')
var openstates = new OpenStates(apiKey);

var geofeat = require('./sun2geojson.js');

var fs = require('fs');

var printit = false;
var geojson =
    { "type":"FeatureCollection",
      "features":[

      ]
    }


/* legDetail example
openstates.legDetail('NCL000173', function(err, json) {
  if (err) throw err;
  console.log(json.full_name);
});

*/
var states = [];
//getleginfo('wi');

openstates.metadataOverview(function(err, json) {
  if (err) throw err;
  //console.log(json);
  states = json;

  console.log(states[0]);
  stateDat(states[38]);

  getleginfo(states[29].abbreviation)


  json.forEach(function(d){
    //console.log(d)
    //stateDat(d);
  })
});


var feature = {};

function stateDat (d){
  var chambers = d.chambers;
  var state = d.abbreviation;
  //console.log(state)

  openstates.metadataState(state, function(err, json) {
  if (err) throw err;
  //console.log(json);
});

//getleginfo(state, chambers[0]);
 for (i in chambers){
   console.log(i);


 }
}
var upper, lower;

function getleginfo(stater){
  //console.log(stater)
  openstates.districtSearch(stater, function(err, json) {
 if (err) throw err;
 console.log('lenth of distsearch', json.length);
 upper = json.filter(function(d){
   return d.chamber == 'lower'
 })

 for(i in upper){
  // console.log('in th eupps',upper[i])
   if(i == upper.length -1){
     printit = true;
     console.log('doobie', i)
   }
   console.log('doobie', i)

   getbounds(upper[i].boundary_id, printit)

 }
// getbounds(json[1].boundary_id)
console.log(geojson)

});

}
var newfeat;
function getbounds(did, pri){

  console.log(did)
  openstates.districtBoundary(did, function(err,d){
    if(err) throw err;
    //console.log(d)
    newfeat = geofeat(d)

    if(newfeat.properties.name == null){
      console.log('got a nuller')
    }
    else{
    geojson.features.push(newfeat)
  }
    if(pri){
      console.log(geojson.features.length)
      makfi(JSON.stringify(geojson));
    }


  //  console.log(newfeat);
    var strubord = JSON.stringify(d);
    // uncomment below to make a new file of coordinates
  //  makfi(strubord)
  })
}

function makfi(bl){
  fs.writeFile('border.json', bl,function(err){
    console.log('should be a file of the border')
  })
}

/* basically what's going on is:

fill up the states array with metadata about all the states.

In here we call a function stateDat([now one state]) and it doesn't really do anything but give you some meta data about the state I think



*/
var OpenStates = require('openstates');

// the api key is in a file in /api and is just a string of the api key the Sunlight foundation gave me.
var apiKey = require('./api/sunkey.js')
var openstates = new OpenStates(apiKey);

var geofeat = require('./sun2geojson.js');

var fs = require('fs');

var printit = false;

// These are still not implemented.
console.log(process.argv)
var gostate = process.argv[2] || "ny";
var gohouse = process.argv[3] || "upper";

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

// this is just getting a json array of states metatdata
openstates.metadataOverview(function(err, json) {
  if (err) throw err;
  //console.log(json);
  states = json;

  console.log(states);
//  stateDat(states[38]);

  // this is where it's actually getting a state and making a geojson thing based on the abbreviation
  getleginfo(gostate, gohouse);


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
var houser;

function getleginfo(stater, cham){
  //console.log(stater)
  openstates.districtSearch(stater, function(err, json) {
 if (err) throw err;
 console.log('lenth of distsearch', json.length);
 houser = json.filter(function(d){
   return d.chamber == cham;
 })

 for(i in houser){
  // console.log('in th eupps',upper[i])
   if(i == houser.length -1){
     printit = true;
     console.log('doobie', i)
   }

   console.log('doobie', i)

   getbounds(houser[i].boundary_id, printit)

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

  var finame = gostate + gohouse + ".json";
  fs.writeFile(finame, bl,function(err){
    console.log('should be a file of the border')
  })
}

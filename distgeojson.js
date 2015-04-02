var OpenStates = require('openstates');
var apiKey = require('./api/sunkey.js')
var openstates = new OpenStates(apiKey);

var fs = require('fs');


/* legDetail example
openstates.legDetail('NCL000173', function(err, json) {
  if (err) throw err;
  console.log(json.full_name);
});

*/
var states = [];
getleginfo('wi');
/*
openstates.metadataOverview(function(err, json) {
  if (err) throw err;
  //console.log(json);
  states = json;

  console.log(states[0]);

  json.forEach(function(d){
    //console.log(d)
    //stateDat(d);
  })
});

*/
var feature = {};

function stateDat (d){
  var chambers = d.chambers;
  var state = d.abbreviation;
  //console.log(state)
/*
  openstates.metadataState(state, function(err, json) {
  if (err) throw err;
  console.log(json);
});
*/
//getleginfo(state, chambers[0]);
 for (i in chambers){
   console.log(i);

 }
}

function getleginfo(stater){
  console.log(stater)
  openstates.districtSearch(stater, function(err, json) {
 if (err) throw err;
 console.log(json);
 getbounds('ocd-division/country:us/state:ca/sldl:19')

});

}

function getbounds(did){
  console.log(did)
  openstates.districtBoundary(did, function(err,d){
    if(err) throw err;
    console.log(JSON.stringify(d));
    var strubord = JSON.stringify(d);
    makfi(strubord)
  })
}

function makfi(bl){
  fs.writeFile('border.json', bl,function(err){
    console.log('should be a file of the border')
  })
}

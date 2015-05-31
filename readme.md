# Atlas for State Congresses of the USA

Currently to make a geojson of a given state and house do:
  - Go into distgeojson.js
  - Change the gostate and gohouse variable to whatever you want the thing to go get.
  - Run [node distgeojson.js] at the command line in the directory with that file.
  - wam bam if everthing was successful the border.json should have all the data you wanted!


Number one todo is to organize this jam!!

As of now there is a little thing to grab a bunch of the data from the Sunlight foundation and make up a valid geojson file for a given state and house using:


distgeojson.js

which uses sun2geojson.js to create each feature.

then it will put it all together and give me a border.json thing.

Now to make more of a polished module which does all that and be able to convert my geojson to topojson easy like.



site/index.html is To make any given state houses districts data into a nice map.

and the js to make the map is in site/mapstate.js

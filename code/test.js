
var server = require('./mock-volcano-server');

var volcanoPromise = server.getVolcano();

console.log('volcanoPromise is:');
console.log(volcanoPromise);

var coordinatesPromise = volcanoPromise.then(function(volcano) {
  return {
    latitude: volcano.latitude,
    longitude: volcano.longitude,
  };
});

console.log('coordinatesPromise is:');
console.log(coordinatesPromise);

volcanoPromise.then(function(volcano) {
  console.log("Got a volcano");
  console.log(volcano);
});

var x = coordinatesPromise.then(function(coordinates) {
  console.log("Got the coordinates");
  console.log(coordinates);
});




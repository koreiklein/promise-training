
function dist(volcano, readings) {
  var min = null;
  for (var i = 0; i < readings.length; ++i) {
    var reading = readings[i];
    var a = readings.longitude - volcano.longitude;
    var b = readings.latitude - volcano.latitude;
    var d = Math.sqrt(a * a + b * b);
    if ((min === null) || (d < min)) {
      min = d;
    }
  }
  return min;
};

var volcanoPromise = server.getVolcano();
var closestGeologistPromise = server.getGeologists().then(function(geologists) {
  return RSVP.Promise.all(geologists.map(function(geologist) {
    return RSVP.hash({
      geologist: geologist,
      readings: server.getReadings(geologist),
    });
  }));
}).then(function(hashes) {
  return volcanoPromise.then(function(volcano) {
    var min = null;
    var geologist = null;
    for (var i = 0; i < hashes.length; ++i) {
      var geologist = hashes[i].geologist;
      var readings = hashes[i].readings;
      var d = dist(volcano, readings);
      if ((min === null) || (d < min)) {
        min = d;
        geologist = geologist;
      }
    }

    return geologist;
  });
});

closestGeologistPromise.then(function(closestGeologist) {
  console.log(closestGeologist.name + " has taken the closest reading to the volcano.");
});

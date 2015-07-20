
var firstGeologistPromise = server.getGeologists().then(function(geologists) {
  return geologists[0];
});

firstGeologistPromise.then(function(geologist) {
  console.log("The first geologist is " + geologist.name);
});


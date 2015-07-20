
// The message promise that makes requests in parallel.
var currentTimePromise = server.getCurrentTime();
var messagePromise = server.getVolcano().then(function(volcano) {
  return currentTimePromise.then(function(currentTime) {
    return volcano.name + " is looking good at " + currentTime;
  });
});

messagePromise.then(function(message) {
  console.log('Message is:');
  console.log(message);
});


/*
Mock Volcano Server

This file defines a mocked out server for returning promises
that later resolve with data about a volcano and some geologists.
*/

RSVP = require('rsvp');

var promiseController = {
  promiseTriggers: [],

  createPromiseTrigger: function(data) {
    var promiseTrigger = {

      resolveIn: function(ms) {
        var _this = this;
        setTimeout(function() {
          _this.resolve();
        }, ms);
      },

      resolve: null,
    };

    promiseTrigger.promise = new RSVP.Promise(function(resolve, reject) {
      promiseTrigger.resolve = function() {
        resolve(data);
      };
    });

    this.promiseTriggers.push(promiseTrigger);

    return promiseTrigger;
  },
};

// The mock volcano server.
// It returns promises for
var server = {
  getVolcano: function() {
    var trigger = promiseController.createPromiseTrigger({
      name: 'Vesuvius',
      latitute: 40.75,
      longitude: 14.4861,
    });

    trigger.resolveIn(1700);

    return trigger.promise;
  },

  getCurrentTime: function() {
    var d = new Date(79, 8, 25, 6, 30, 20, 3);
    d.setFullYear(79);
    var trigger = promiseController.createPromiseTrigger(d);

    trigger.resolveIn(1400);

    return trigger.promise;
  },

  geologists: [],

  getGeologists: function() {
    var trigger = promiseController.createPromiseTrigger([
      { name: "Moe", latitude: 40.75, longitude: 14.4863 },
      { name: "Larry", latitude: 40.76, longitude: 14.4868 },
      { name: "Curly", latitude: 40.7532, longitude: 14.4857 }
    ]);

    trigger.resolveIn(1100);

    return trigger.promise;
  },

  getReadings: function(geologist) {
    var time = null;
    var data = null;
    switch (geologist.name) {
      case 'Moe':
        data = { temperature: 70 };
        time = 444;
        break;
      case 'Larry':
        data = { temperature: 78 };
        time = 751;
        break;
      case 'Curly':
        data = { temperature: 96 };
        time = 272;
        break;
    };

    var trigger = promiseController.createPromiseTrigger(data);
    trigger.resolveIn(time);

    return trigger.promise;
  },
};

module.exports = server;

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

      resolveNow: function() {
        this.resolve();
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
      { name: "Moe" },
      { name: "Larry" },
      { name: "Curly" }
    ]);

    trigger.resolveIn(1100);

    return trigger.promise;
  },

  getReadings: function(geologist) {
    var time = null;
    var data = null;
    switch (geologist.name) {
      case 'Moe':
        data = [
          { temperature: 70, latitude: 40.75, longitude: 14.4833 },
          { temperature: 70, latitude: 40.77, longitude: 14.4872 },
        ];
        time = 444;
        break;
      case 'Larry':
        data = [
          { temperature: 70, latitude: 40.74, longitude: 14.4828 },
          { temperature: 70, latitude: 40.73, longitude: 14.4800 },
          { temperature: 70, latitude: 40.74, longitude: 14.4814 },
        ];
        time = 751;
        break;
      case 'Curly':
        data = [
          { temperature: 70, latitude: 40.75, longitude: 14.4873 },
          { temperature: 70, latitude: 40.75, longitude: 14.4664 },
          { temperature: 70, latitude: 40.74, longitude: 14.4897 },
          { temperature: 70, latitude: 40.78, longitude: 14.4827 },
        ];
        time = 272;
        break;
    };

    var trigger = promiseController.createPromiseTrigger(data);
    trigger.resolveIn(time);

    return trigger.promise;
  },
};

module.exports = server;

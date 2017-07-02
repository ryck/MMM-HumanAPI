/* Magic Mirror
 * Module: MMM-HumanAPI
 *
 * By Ricardo Gonzalez http://www.github.com/ryck/MMM-HumanAPI
 * MIT Licensed.
 */

Module.register("MMM-HumanAPI", {

  defaults: {
    updateInterval: 60 * 60 * 1000, // Every hour.
    accessToken: "demo",
    initialLoadDelay: 0, // No delay/
    animationSpeed: 1000, // One second.
    resources: ["weight", "bmi", "bodyFat", "heartRate", "height", "bloodGlucose", "bloodPressure"],
    debug: false
  },

  start: function() {
    Log.info('Starting module: ' + this.name);
    this.loaded = false;
    this,result = null;
    this.scheduleUpdate(this.config.initialLoadDelay);
    this.updateTimer = null;
    this.apiBase = "https://api.humanapi.co/v1/human/";
    this.url = encodeURI(this.apiBase + this.getParams());
    if(this.config.debug) {
      Log.info(this.url);
    }

    this.updateWellnessData(this);

  },

  getStyles: function() {
    return ["MMM-HumanAPI.css", "font-awesome.css"];
  },

  //Define header for module.
  getHeader: function() {
    return this.config.header;
  },

  // updateBusInfo
  updateWellnessData: function(self) {
    self.sendSocketNotification("GET_WELLNESS_DATA", {"url":self.url});
  },

  /* scheduleUpdate()
   * Schedule next update.
   * argument delay number - Milliseconds before next update. If empty, this.config.updateInterval is used.
   */
  scheduleUpdate: function(delay) {
    var nextLoad = this.config.updateInterval;
    if (typeof delay !== "undefined" && delay >= 0) {
      nextLoad = delay;
    }

    var self = this;
    clearTimeout(this.updateTimer);
    this.updateTimer = setTimeout(function() {
      self.updateWellnessData(self);
    }, nextLoad);
  },

  processWellnessData: function(result) {
    if (typeof result !== "undefined" && result !== null) {
      if(this.config.debug) {
        Log.info(result);
      }
      this.loaded = true;
      this.result = result;
      this.updateDom(this.config.animationSpeed);
    }
  },

  // Override dom generator.
  getDom: function() {
    var wrapper = document.createElement("div");

    if (!this.loaded) {
      wrapper.innerHTML = "Loading HumanAPI data...";
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    // Start building table.
    var resourceTable = document.createElement("table");
    resourceTable.className = "small";

    var resources = this.config.resources;
    console.log(resources);
    console.log(resources.length);
    for (var r=0; r < resources.length; r++) {
      resourceRow = document.createElement('tr');

      resourceName = document.createElement('td');
      resourceName.className = 'resource ' + resources[r];

      resourceValue = document.createElement('td');
      resourceValue.className = 'value ' + resources[r];


      switch (resources[r]) {
        case "weight":
          resourceName.innerHTML = "Weight";
          resourceValue.innerHTML = this.result[resources[r]].value.toFixed(1) + " " + this.result[resources[r]].unit;
          break;

        case "bmi":
          resourceName.innerHTML = "BMI";
          resourceValue.innerHTML = this.result[resources[r]].value + " " + this.result[resources[r]].unit;
          break;

        case "bodyFat":
          resourceName.innerHTML = "Body Fat";
          resourceValue.innerHTML = this.result[resources[r]].value + " " + this.result[resources[r]].unit;
          break;

        case "heartRate":
          resourceName.innerHTML = "Heart Rate";
          resourceValue.innerHTML = this.result[resources[r]].value + " " + this.result[resources[r]].unit;
          break;

        case "height":
          resourceName.innerHTML = "Height";
          resourceValue.innerHTML = this.result[resources[r]].value + " " + this.result[resources[r]].unit;
          break;

        default:
          resourceName.innerHTML = resources[r];
          resourceValue.innerHTML = this.result[resources[r]].value + " " + this.result[resources[r]].unit;

      }

      resourceRow.appendChild(resourceName);
      resourceRow.appendChild(resourceValue);
      resourceTable.appendChild(resourceRow);
    }

    wrapper.appendChild(resourceTable);
    return wrapper;
  },

  getParams: function() {
    var params = "?";
    params += "access_token=" + this.config.accessToken;
    if(this.config.debug) {
      Log.info(params);
    }
    return params;
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "WELLNESS_DATA") {
      this.processWellnessData(payload.result);
      this.scheduleUpdate(this.config.updateInterval);
      if(this.config.debug) {
        Log.info("socketNotificationReceived: WELLNESS_DATA");
      }
    }
  }
});

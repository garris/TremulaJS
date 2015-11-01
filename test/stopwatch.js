function stopwatch(label, resolution) {
  if (resolution === undefined) {
    resolution = 1;
  }
  if (!label) {
    label = '';
  }
  this.label = label;
  this.lastLapTime = 0.0;
  this.startTime = 0.0;
  this.stopTime = 0.0;
  this.selfTime = 0.0;
  this.laps = [];

  function getRoundedDelta(a, b) {
    return Math.round((a - b)*resolution)/resolution;
  }
  
  this.getTime = () => {
    return Math.round(window.performance.now() * resolution) / resolution;
  };
  
  this.lap = (lapLabel, toConsole) => {
    var lapTime = this.getTime();
    if (!this.lastLapTime) {
      this.lastLapTime = this.startTime;
    }
    var lapSelfTime = getRoundedDelta(lapTime, this.lastLapTime);
    
    if (!lapLabel) {
      lapLabel = '';
    }
    this.laps.push({
      id: this.laps.length,
      label: lapLabel,
      time: lapTime,
      self: lapSelfTime
    });
    this.lastLapTime = lapTime;
    if (toConsole) {
      console.log(lapLabel + ' ' + lapSelfTime + "ms")
    }
    return lapSelfTime;
  };
  this.stop = (toConsole) => {
    this.stopTime = this.getTime();
    this.selfTime = getRoundedDelta(this.stopTime, this.startTime);
    if (toConsole) {
      console.log(label + ' ' + this.selfTime + "ms")
    }
    return this.selfTime;
  };
  this.start = () => {
   this.startTime = this.getTime();   
  };
  this.start();
}

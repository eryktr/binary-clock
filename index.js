var clock = require("./script/clock");
const CLOCK = clock._api;

setInterval(CLOCK.tick, 1000);
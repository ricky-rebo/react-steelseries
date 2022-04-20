import "./fonts/index.css";

export { Altimeter } from "./gauges/altimeter-class";
export { Battery } from "./gauges/battery-class";
export { Clock } from "./gauges/clock-class";
export { Compass } from "./gauges/compass-class";
export { DisplayMulti } from "./gauges/display-multi-class";
export { DisplaySingle } from "./gauges/display-single-class";
export { Horizon } from "./gauges/horizon-class";
export { Led } from "./gauges/led-class";
export { Level } from "./gauges/level-class";

// FIXME(ricky-rebo) TypeError: steelseries__WEBPACK_IMPORTED_MODULE_0__.Lightbulb is not a constructor
// export { Lightbulb } from "./gauges/light-bulb"; 

export { Linear } from "./gauges/linear-class";
export { LinearBargraph } from "./gauges/linear-bargraph-class";
export { Odometer } from "./gauges/odometer-class";
export { Radial } from "./gauges/radial-class";
export { RadialBargraph } from "./gauges/radial-bargraph-class";
export { RadialVertical } from "./gauges/radial-vertical-class";

// FIXME(ricky-rebo) Finish the gauge
// export { Stopwatch } from "./gauges/stopwatch";

// FIXME(ricky-rebo) TypeError: steelseries__WEBPACK_IMPORTED_MODULE_0__.Trafficlight is not a constructor
// export { Trafficlight } from "./gauges/traffic-light";

export { WindDirection } from "./gauges/wind-direction-class";
export { Rose } from "./gauges/wind-rose-class";

// Functional Components
export { Altimeter as AltimeterFunctional } from "./gauges/altimeter"
export { Battery as BatteryFunctional } from "./gauges/battery"
export { Clock as ClockFunctional } from "./gauges/clock"

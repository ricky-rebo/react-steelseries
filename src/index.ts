import "./fonts/index.css";

export { Altimeter } from "./gauges/class-components/altimeter-class";
export { Battery } from "./gauges/class-components/battery-class";
export { Clock } from "./gauges/class-components/clock-class";
export { Compass } from "./gauges/class-components/compass-class";
export { DisplayMulti } from "./gauges/class-components/display-multi-class";
export { DisplaySingle } from "./gauges/class-components/display-single-class";
export { Horizon } from "./gauges/class-components/horizon-class";
export { Led } from "./gauges/class-components/led-class";
export { Level } from "./gauges/class-components/level-class";

// FIXME(ricky-rebo) TypeError: steelseries__WEBPACK_IMPORTED_MODULE_0__.Lightbulb is not a constructor
export { Lightbulb } from "./gauges/class-components/light-bulb-class";

export { Linear } from "./gauges/class-components/linear-class";
export { LinearBargraph } from "./gauges/class-components/linear-bargraph-class";
export { Odometer } from "./gauges/class-components/odometer-class";
export { Radial } from "./gauges/class-components/radial-class";
export { RadialBargraph } from "./gauges/class-components/radial-bargraph-class";
export { RadialVertical } from "./gauges/class-components/radial-vertical-class";

// TODO(ricky-rebo) Finish the gauge
// export { Stopwatch } from "./gauges/stopwatch";

// FIXME(ricky-rebo) TypeError: steelseries__WEBPACK_IMPORTED_MODULE_0__.Trafficlight is not a constructor
// export { Trafficlight } from "./gauges/traffic-light";

export { WindDirection } from "./gauges/class-components/wind-direction-class";
export { Rose } from "./gauges/class-components/wind-rose-class";

// Functional Components
export { Altimeter as AltimeterFunctional } from "./gauges/altimeter"
export { Battery as BatteryFunctional } from "./gauges/battery"
export { Clock as ClockFunctional } from "./gauges/clock"
export { Compass as CompassFunctional } from "./gauges/compass"
export { DisplayMulti as DisplayMultiFunctional } from "./gauges/display-multi"
export { DisplaySingle as DisplaySingleFunctional } from "./gauges/display-single"
export { Horizon as HorizonFunctional } from "./gauges/horizon"
export { Led as LedFunctional } from "./gauges/led"
export { Level as LevelFunctional } from "./gauges/level"
export { LightBulb as LightBulbFunctional } from "./gauges/light-bulb"
export { Linear as LinearFunctional } from "./gauges/linear"
export { LinearBargraph as LinearBargraphFunctional } from "./gauges/linear-bargraph"
export { OdometerGauge } from "./gauges/odometer"

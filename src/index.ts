import {
  rgbaColor,
  gradientWrapper,
  Section,
  BackgroundColor,
  LcdColor,
  ColorDef,
  LedColor,
  GaugeType,
  Orientation,
  KnobType,
  KnobStyle,
  FrameDesign,
  PointerType,
  ForegroundType,
  LabelNumberFormat,
  TickLabelOrientation,
  TrendState
} from "steelseries";

import { Altimeter } from "./gauges/altimeter";
import { Battery } from "./gauges/battery";
import { Clock } from "./gauges/clock";
import { Compass } from "./gauges/compass";
import { DisplayMulti } from "./gauges/display-multi";
import { DisplaySingle } from "./gauges/display-single";
import { Horizon } from "./gauges/horizon";
import { Led } from "./gauges/led";
import { Level } from "./gauges/level";

// FIXME(Riccardo Rebottini) TypeError: steelseries__WEBPACK_IMPORTED_MODULE_0__.Lightbulb is not a constructor
// Maybe a bug in '@types/steelseries'?
// import { Lightbulb } from "./gauges/light-bulb"; 

import { Linear } from "./gauges/linear";
import { LinearBargraph } from "./gauges/linear-bargraph";
import { Odometer } from "./gauges/odometer";
import { Radial } from "./gauges/radial";
import { RadialBargraph } from "./gauges/radial-bargraph";
import { RadialVertical } from "./gauges/radial-vertical";

// FIXME TypeError: steelseries__WEBPACK_IMPORTED_MODULE_0__.Trafficlight is not a constructor
// Maybe a bug '@type/steelseries'?
//import { Trafficlight } from "./gauges/traffic-light";

import { WindDirection } from "./gauges/wind-direction";
import { Rose } from "./gauges/wind-rose";


export {
  /* Steelseries tools & constants */
  rgbaColor,
  gradientWrapper,
  Section,
  BackgroundColor,
  LcdColor,
  ColorDef,
  LedColor,
  GaugeType,
  Orientation,
  KnobType,
  KnobStyle,
  FrameDesign,
  PointerType,
  ForegroundType,
  LabelNumberFormat,
  TickLabelOrientation,
  TrendState,

  /* React-Wrapped gauges */
  Altimeter,
  Battery,
  Clock,
  Compass,
  DisplayMulti,
  DisplaySingle,
  Horizon,
  Led,
  Level,
  // Lightbulb,
  Linear,
  LinearBargraph,
  Odometer,
  Radial,
  RadialBargraph,
  RadialVertical,
  // Trafficlight
  WindDirection,
  Rose
};

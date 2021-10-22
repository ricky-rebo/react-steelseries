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
// import { Lightbulb } from "./gauges/light-bulb"; 

import { Linear } from "./gauges/linear";
import { LinearBargraph } from "./gauges/linear-bargraph";

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
  LinearBargraph
};

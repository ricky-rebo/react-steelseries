import { 
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
// import { Lightbulb } from "./gauges/light-bulb"; // TypeError: steelseries__WEBPACK_IMPORTED_MODULE_0__.Lightbulb is not a constructor

export {
  /* Steelseries tools & constants */
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
};

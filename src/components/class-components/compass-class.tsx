import GaugeComponent from "./gauge-component"
import { Compass as ssCompass, CompassParams } from "steelseries"

interface Props extends CompassParams {
  size: number
  value?: number
  animate?: boolean
  animationCallback?: () => void
}

export class Compass extends GaugeComponent<Props, ssCompass, CompassParams> {
  GaugeClass = ssCompass
  IgnoredProps = ["animate", "animationCallback"]

  getGaugeParams() {
    return {
      frameDesign: this.props.frameDesign,
      frameVisible: this.props.frameVisible,
      backgroundColor: this.props.backgroundColor,
      backgroundVisible: this.props.backgroundVisible,
      foregroundType: this.props.foregroundType,
      foregroundVisible: this.props.foregroundVisible,
      knobType: this.props.knobType,
      knobStyle: this.props.knobStyle,
      pointerType: this.props.pointerType,
      pointerColor: this.props.pointerColor,
      size: this.props.size,
      pointSymbols: this.props.pointSymbols,
      pointSymbolsVisible: this.props.pointSymbolsVisible,
      degreeScale: this.props.degreeScale,
      roseVisible: this.props.roseVisible,
      rotateFace: this.props.rotateFace,
      customLayer: this.props.customLayer,
    }
  }

  gaugePostInit(animate = true) {
    if (this.props.value) {
      this.props.animate && animate
        ? this.gauge.setValueAnimated(
            this.props.value,
            this.props.animationCallback
          )
        : this.gauge.setValue(this.props.value)
    }
  }

  setFrameDesign() {
    this.gauge.setFrameDesign(this.props.frameDesign)
  }

  setBackgroundColor() {
    this.gauge.setBackgroundColor(this.props.backgroundColor)
  }

  setForegroundType() {
    this.gauge.setForegroundType(this.props.foregroundType)
  }

  setPointerColor() {
    this.gauge.setPointerColor(this.props.pointerColor)
  }

  setPointerType() {
    this.gauge.setPointerType(this.props.pointerType)
  }

  setPointSymbols() {
    this.gauge.setPointSymbols(this.props.pointSymbols)
  }

  setValue() {
    if (this.props.animate) {
      this.gauge.setValueAnimated(
        this.props.value,
        this.props.animationCallback
      )
    } else {
      this.gauge.setValue(this.props.value)
    }
  }
}

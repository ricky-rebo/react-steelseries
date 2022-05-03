import { Level as ssLevel, LevelParams } from "steelseries"

import GaugeComponent from "./gauge-component"

interface Props extends LevelParams {
  size: number
  value?: number

  animate?: boolean
  animationCallback?: () => void
}

export class Level extends GaugeComponent<Props, ssLevel, LevelParams> {
  GaugeClass = ssLevel
  IgnoredProps = ["animate", "animationCallback"]

  getGaugeParams = () => ({
    size: this.props.size,
    frameDesign: this.props.frameDesign,
    frameVisible: this.props.frameVisible,
    backgroundColor: this.props.backgroundColor,
    backgroundVisible: this.props.backgroundVisible,
    foregroundType: this.props.foregroundType,
    foregroundVisible: this.props.foregroundVisible,
    pointerColor: this.props.pointerColor,
    decimalsVisible: this.props.decimalsVisible,
    textOrientationFixed: this.props.textOrientationFixed,
    rotateFace: this.props.rotateFace,
  })

  gaugePostInit(animate: boolean) {
    if (this.props.value !== undefined) {
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

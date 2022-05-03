import { Odometer as ssOdometer, OdometerParams } from "steelseries"

import GaugeComponent from "./gauge-component"

interface Props extends Omit<OdometerParams, "_context"> {
  height: number

  animate?: boolean
  animationCallback?: () => {}
}

export class Odometer extends GaugeComponent<
  Props,
  ssOdometer,
  OdometerParams
> {
  GaugeClass = ssOdometer
  IgnoredProps = ["animate", "animationCallback"]

  getGaugeParams = () => ({
    height: this.props.height,
    digits: this.props.digits,
    decimals: this.props.decimals,
    decimalBackColor: this.props.decimalBackColor,
    decimalForeColor: this.props.decimalForeColor,
    font: this.props.font,
    value: this.props.animate ? 0 : this.props.value,
    valueBackColor: this.props.valueBackColor,
    valueForeColor: this.props.valueForeColor,
    wobbleFactor: this.props.wobbleFactor,
  })

  gaugePostInit(animate: boolean) {
    if (this.props.animate && animate && this.props.value) {
      this.gauge.setValueAnimated(
        this.props.value,
        this.props.animationCallback
      )
    }
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

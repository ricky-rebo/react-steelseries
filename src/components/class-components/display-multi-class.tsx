import GaugeComponent from "./gauge-component"
import { DisplayMulti as ssDisplayMulti, DisplayMultiParams } from "steelseries"

type ExcludedParams =
  | "headerStringVisible"
  | "detailStringVisible"
  | "unitStringVisible"
interface Props extends Omit<DisplayMultiParams, ExcludedParams> {
  width: number
  height: number

  showHeaderString?: boolean
  showDetailString?: boolean
  showUnitString?: boolean
}

export class DisplayMulti extends GaugeComponent<
  Props,
  ssDisplayMulti,
  DisplayMultiParams
> {
  GaugeClass = ssDisplayMulti

  getGaugeParams = () => ({
    width: this.props.width,
    height: this.props.height,
    headerString: this.props.headerString,
    headerStringVisible: this.props.showHeaderString,
    detailString: this.props.detailString,
    detailStringVisible: this.props.showDetailString,
    unitString: this.props.unitString,
    unitStringVisible: this.props.showUnitString,
    linkAltValue:
      this.props.linkAltValue === undefined ? false : this.props.linkAltValue,
    valuesNumeric: this.props.valuesNumeric,
    value: this.props.value,
    altValue: this.props.altValue,

    lcdColor: this.props.lcdColor,
    digitalFont: this.props.digitalFont,
    lcdDecimals: this.props.lcdDecimals,
  })

  setLcdColor() {
    this.gauge.setLcdColor(this.props.lcdColor)
  }

  setValue() {
    this.gauge.setValue(this.props.value)
  }

  setAltValue() {
    this.gauge.setAltValue(this.props.altValue)
  }
}

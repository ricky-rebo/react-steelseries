import React from "react"
// @ts-ignore
import { LightBulb as ssLightbulb, LightbulbParams } from "steelseries"

import GaugeComponent from "./gauge-component"

declare var __DEV__: boolean

interface Props extends Partial<LightbulbParams> {
  width: number
  height: number
  on?: boolean
  alpha?: number
}

export class Lightbulb extends GaugeComponent<
  Props,
  ssLightbulb,
  LightbulbParams
> {
  GaugeClass = ssLightbulb
  ID: string

  constructor(props: Props) {
    super(props)
    this.ID = "lightbulb-" + uid()
  }

  getGaugeParams = () => ({
    width: this.props.width,
    height: this.props.height,

    // Should be optional, but it's not...
    // Default value taken from 'steelseries' original library source
    // BUG fix in @types/steelseries
    glowColor:
      this.props.glowColor === undefined ? "#ffff00" : this.props.glowColor,
  })

  componentDidMount() {
    if (this.canvasRef.current && this.GaugeClass) {
      if (__DEV__) {
        this.log("init")
      }

      if (this.gaugePreInit) {
        this.gaugePreInit()
      }

      this.gauge = new this.GaugeClass(this.ID, this.getGaugeParams())

      if (this.gaugePostInit) {
        this.gaugePostInit()
      }
    }
  }

  gaugePostInit() {
    if (this.props.on !== undefined) {
      this.gauge.setOn(this.props.on)
    }

    if (this.props.alpha !== undefined) {
      this.gauge.setAlpha(this.props.alpha)
    }
  }

  setGlowColor() {
    this.gauge.setGlowColor(this.props.glowColor)
  }

  setOn() {
    this.gauge.setOn(this.props.on)
  }

  setAlpha() {
    this.gauge.setAlpha(this.props.alpha)
  }

  render() {
    return <canvas ref={this.canvasRef} id={this.ID}></canvas>
  }
}

function uid() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(
    /\./g,
    ""
  )
}

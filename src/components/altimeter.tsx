import React, { useRef, useEffect } from "react"
import { AltimeterParams, Altimeter } from "steelseries"
import { useSetGaugeProp, useSetGaugeValue, useUpdateGaugeProp } from "../hooks/gauge-update"

interface Props extends AltimeterParams {
  size: number

  value?: number
  animate?: boolean
  animationCallback?: () => void

  // Missing in AltimeterParams!
  // BUG fix in @types/steelseries
  titleString?: string
  unitString?: string

  resetValueOnUnitChange?: boolean
}

export function AltimeterGauge(props: Props) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const gauge = useRef<Altimeter>(null)

  // Gauge init
  useEffect(() => {
    gauge.current = new Altimeter(canvas.current, {
      frameDesign: props.frameDesign,
      frameVisible: props.frameVisible,
      backgroundColor: props.backgroundColor,
      backgroundVisible: props.backgroundVisible,
      foregroundType: props.foregroundType,
      foregroundVisible: props.foregroundVisible,
      knobType: props.knobType,
      knobStyle: props.knobStyle,
      lcdColor: props.lcdColor,
      digitalFont: props.digitalFont,
      lcdVisible: props.lcdVisible,
      size: props.size,
      unitAltPos: props.unitAltPos,
      customLayer: props.customLayer,
    })
  }, [])

  // Gauge update
  useUpdateGaugeProp(gauge, "setFrameDesign", props.frameDesign)
  useUpdateGaugeProp(gauge, "setBackgroundColor", props.backgroundColor)
  useUpdateGaugeProp(gauge, "setForegroundType", props.foregroundType)

  useUpdateGaugeProp(gauge, "setLcdColor", props.lcdColor)

  useSetGaugeProp(gauge, "setTitleString", props.titleString)
  useEffect(() => {
    if (gauge.current) {
      if (props.resetValueOnUnitChange) gauge.current.setValue(0)
      gauge.current.setUnitString(props.unitString)
    }
  }, [props.unitString])

  useSetGaugeValue(gauge, props.value, props.animate, props.animationCallback)

  return <canvas ref={canvas}></canvas>
}

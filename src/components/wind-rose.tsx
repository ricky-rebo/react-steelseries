// BUG @types/steelseries

import React, { useEffect, useRef } from "react"
import { OdometerParams } from "steelseries"
import { RoseParams, Rose } from "steelseries-rose-gauge"
import { useSetGaugeProp, useUpdateGaugeProp } from "../hooks/gauge-update"

// Define a subset of params for Radial/Rose Odometer
type RoseOdometerParams = Omit<
  OdometerParams,
  "_context" | "height" | "value" | "wobbleFactor"
>

interface Props extends RoseParams {
  size: number

  value?: number[]
  odometerValue?: number
  odometerParams?: RoseOdometerParams

  animate?: boolean
  animationCallback?: () => void
}

export function RoseGauge(props: Props) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const gauge = useRef<Rose>(null)

  // Init gauge
  useEffect(() => {
    if (canvas.current) {
      gauge.current = new Rose(canvas.current, {
        size: props.size,

        frameDesign: props.frameDesign,
        frameVisible: props.frameVisible,
        backgroundColor: props.backgroundColor,
        backgroundVisible: props.backgroundVisible,
        foregroundType: props.foregroundType,
        foregroundVisible: props.foregroundVisible,

        pointSymbols: props.pointSymbols,
        titleString: props.titleString,
        unitString: props.unitString,
        useOdometer: props.useOdometer,
        odometerParams: props.odometerParams,
      })
    }
  }, [])

  // Update gauge
  useUpdateGaugeProp(gauge, "setFrameDesign", props.frameDesign)
  useUpdateGaugeProp(gauge, "setBackgroundColor", props.backgroundColor)
  useUpdateGaugeProp(gauge, "setForegroundType", props.foregroundType)

  useUpdateGaugeProp(gauge, "setTitleString", props.titleString)
  useUpdateGaugeProp(gauge, "setUnitString", props.unitString)
  useUpdateGaugeProp(gauge, "setPointSymbols", props.pointSymbols)

  useSetGaugeProp(gauge, "setValue", props.value)
  useEffect(() => {
    if (gauge.current) {
      if (props.animate) {
        gauge.current.setOdoValueAnimated(
          props.odometerValue,
          props.animationCallback
        )
      } else {
        gauge.current.setOdoValue(props.odometerValue)
      }
    }
  }, [props.odometerValue])

  return <canvas ref={canvas}></canvas>
}

import React, { useEffect, useRef } from "react"
import { CompassParams, Compass } from "steelseries"
import { useSetGaugeValue, useUpdateGaugeProp } from "../hooks/gauge-update"

interface Props extends CompassParams {
  size: number

  value?: number
  animate?: boolean
  animationCallback?: () => void
}

export function CompassGauge(props: Props) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const gauge = useRef<Compass>(null)

  // Init gauge
  useEffect(() => {
    if (canvas.current) {
      gauge.current = new Compass(canvas.current, {
        frameDesign: props.frameDesign,
        frameVisible: props.frameVisible,
        backgroundColor: props.backgroundColor,
        backgroundVisible: props.backgroundVisible,
        foregroundType: props.foregroundType,
        foregroundVisible: props.foregroundVisible,
        knobType: props.knobType,
        knobStyle: props.knobStyle,
        pointerType: props.pointerType,
        pointerColor: props.pointerColor,
        size: props.size,
        pointSymbols: props.pointSymbols,
        pointSymbolsVisible: props.pointSymbolsVisible,
        degreeScale: props.degreeScale,
        roseVisible: props.roseVisible,
        rotateFace: props.rotateFace,
        customLayer: props.customLayer,
      })
    }
  }, [])

  // Update gauge
  useUpdateGaugeProp(gauge, "setFrameDesign", props.frameDesign)
  useUpdateGaugeProp(gauge, "setBackgroundColor", props.backgroundColor)
  useUpdateGaugeProp(gauge, "setForegroundType", props.foregroundType)

  useUpdateGaugeProp(gauge, "setPointerType", props.pointerType)
  useUpdateGaugeProp(gauge, "setPointerColor", props.pointerColor)

  useUpdateGaugeProp(gauge, "setPointSymbols", props.pointSymbols)

  useSetGaugeValue(gauge, props.value, props.animate, props.animationCallback)

  return <canvas ref={canvas}></canvas>
}

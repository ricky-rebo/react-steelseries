import React, { useEffect, useRef } from "react"
import { LevelParams, Level } from "steelseries"
import { useSetGaugeValue, useUpdateGaugeProp } from "../hooks/gauge-update"

interface Props extends LevelParams {
  size: number
  value?: number

  animate?: boolean
  animationCallback?: () => void
}

export function LevelGauge(props: Props) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const gauge = useRef<Level>(null)

  // Init gauge
  useEffect(() => {
    if (canvas.current) {
      gauge.current = new Level(canvas.current, {
        size: props.size,
        frameDesign: props.frameDesign,
        frameVisible: props.frameVisible,
        backgroundColor: props.backgroundColor,
        backgroundVisible: props.backgroundVisible,
        foregroundType: props.foregroundType,
        foregroundVisible: props.foregroundVisible,
        pointerColor: props.pointerColor,
        decimalsVisible: props.decimalsVisible,
        textOrientationFixed: props.textOrientationFixed,
        rotateFace: props.rotateFace,
      })
    }
  }, [])

  // Update gauge
  useUpdateGaugeProp(gauge, "setFrameDesign", props.frameDesign)
  useUpdateGaugeProp(gauge, "setBackgroundColor", props.backgroundColor)
  useUpdateGaugeProp(gauge, "setForegroundType", props.foregroundType)

  useUpdateGaugeProp(gauge, "setPointerColor", props.pointerColor)

  useSetGaugeValue(gauge, props.value, props.animate, props.animationCallback)

  return <canvas ref={canvas}></canvas>
}

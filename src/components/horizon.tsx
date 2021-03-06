import React, { useEffect, useRef } from "react"
import { HorizonParams, Horizon } from "steelseries"
import { useSetGaugeProp, useUpdateGaugeProp } from "../hooks/gauge-update"

interface Props extends HorizonParams {
  size: number

  roll?: number
  pitch?: number
  pitchOffset?: number

  animate?: boolean
  rollAnimationCallback?: () => void
  pitchAnimationCallback?: () => void
}

export function HorizonGauge(props: Props) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const gauge = useRef<Horizon>(null)

  // Init gauge
  useEffect(() => {
    if (canvas.current) {
      gauge.current = new Horizon(canvas.current, {
        size: props.size,
        pointerColor: props.pointerColor,
        frameDesign: props.frameDesign,
        frameVisible: props.frameVisible,
        foregroundType: props.foregroundType,
        foregroundVisible: props.foregroundVisible,
      })
    }
  }, [])

  // Update gauge
  useUpdateGaugeProp(gauge, "setFrameDesign", props.frameDesign)
  useUpdateGaugeProp(gauge, "setForegroundType", props.foregroundType)

  useSetGaugeProp(gauge, "setPitchOffset", props.pitchOffset)
  useEffect(() => {
    if (gauge.current) {
      props.animate
        ? gauge.current.setPitchAnimated(props.pitch, props.pitchAnimationCallback)
        : gauge.current.setPitch(props.pitch)
    }
  }, [props.pitch])
  useEffect(() => {
    if (gauge.current) {
      props.animate
        ? gauge.current.setRollAnimated(props.roll, props.rollAnimationCallback)
        : gauge.current.setRoll(props.roll)
    }
  }, [props.roll])

  return <canvas ref={canvas}></canvas>
}

import React, { useEffect, useRef } from "react"
import { BatteryParams, Battery } from "steelseries"
import { useSetGaugeProp } from "../hooks/gauge-update"

interface Props extends BatteryParams {
  size: number
}

export function BatteryGauge(props: Props) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const gauge = useRef<Battery>(null)

  // Init gauge
  useEffect(() => {
    if (canvas.current) {
      gauge.current = new Battery(canvas.current, {
        size: props.size,
      })
    }
  }, [])

  // Update gauge
  useSetGaugeProp(gauge, "setValue", props.value)

  return <canvas ref={canvas}></canvas>
}

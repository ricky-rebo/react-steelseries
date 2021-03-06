import React, { useEffect, useRef } from "react"
import { ClockParams, Clock } from "steelseries"
import { useDidUpdate } from "../hooks/common"
import { useUpdateGaugeProp } from "../hooks/gauge-update"

type ExcludeParams = "hour" | "minute" | "second" | "secondMovesContinuous"
interface Props extends Partial<Omit<ClockParams, ExcludeParams>> {
  size: number
  value: Date

  secondPointerTick?: boolean
}

export function ClockGauge(props: Props) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const gauge = useRef<Clock>(null)

  // Init gauge
  useEffect(() => {
    if (canvas.current) {
      gauge.current = new Clock(canvas.current, {
        frameDesign: props.frameDesign,
        frameVisible: props.frameVisible,
        backgroundColor: props.backgroundColor,
        backgroundVisible: props.backgroundVisible,
        foregroundType: props.foregroundType,
        foregroundVisible: props.foregroundVisible,
        pointerType: props.pointerType,
        pointerColor: props.pointerColor,
        size: props.size,

        hour: props.value.getHours(),
        minute: props.value.getMinutes(),
        second: props.value.getSeconds(),

        /* Should be opional, but they're not... */
        // BUG fix in @types/steelseries
        timeZoneOffsetHour: props.timeZoneOffsetHour ?? 0,
        timeZoneOffsetMinute: props.timeZoneOffsetMinute ?? 0,
        isAutomatic: props.isAutomatic ?? true,

        secondMovesContinuous: !props.secondPointerTick ?? true,
        secondPointerVisible: props.secondPointerVisible ?? true,

        customLayer: props.customLayer,
      })
    }

    // Cleanup
    return function () {
      gauge.current && gauge.current.setAutomatic(false)
    }
  }, [])

  // Gauge update
  useUpdateGaugeProp(gauge, "setFrameDesign", props.frameDesign)
  useUpdateGaugeProp(gauge, "setBackgroundColor", props.backgroundColor)
  useUpdateGaugeProp(gauge, "setForegroundType", props.foregroundType)

  useUpdateGaugeProp(gauge, "setPointerType", props.pointerType)
  useUpdateGaugeProp(gauge, "setPointerColor", props.pointerColor)

  useUpdateGaugeProp(gauge, "setAutomatic", props.isAutomatic)
  useUpdateGaugeProp(gauge, "setTimeZoneOffsetHour", props.timeZoneOffsetHour)
  useUpdateGaugeProp(gauge, "setTimeZoneOffsetMinute", props.timeZoneOffsetMinute)

  useUpdateGaugeProp(gauge, "setSecondPointerVisible", props.secondPointerVisible)
  useDidUpdate(() => {
    if (gauge.current) {
      if (props.isAutomatic) gauge.current.setAutomatic(false)
      gauge.current.setSecondMovesContinuous(!props.secondPointerTick)
      if (props.isAutomatic) gauge.current.setAutomatic(true)
    }
  }, [props.secondPointerTick])

  useDidUpdate(() => {
    if (gauge.current) {
      gauge.current
        .setHour(props.value.getHours())
        .setMinute(props.value.getMinutes())
        .setSecond(props.value.getSeconds())
    }
  }, [props.value])

  return <canvas ref={canvas}></canvas>
}

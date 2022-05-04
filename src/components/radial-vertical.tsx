import React, { useEffect, useRef } from "react"
import { RadialVerticalParams, RadialVertical, Section } from "steelseries"
import { useDidUpdate } from "../hooks/common"
import { useSetGaugeProp, useSetGaugeValue, useUpdateGaugeProp } from "../hooks/gauge-update"

type ExcludedParams =
  | "area"
  | "section"
  | "minMeasuredValueVisible"
  | "maxMeasuredValueVisible"
  | "thresholdVisible"
  | "ledVisible"
interface Props extends Omit<RadialVerticalParams, ExcludedParams> {
  size: number

  sections?: Section[]
  sectors?: Section[]

  showThreshold?: boolean
  showLed?: boolean

  showMinMeasuredValue?: boolean
  showMaxMeasuredValue?: boolean

  value?: number
  minMeasuredValue?: number
  maxMeasuredValue?: number

  animate?: boolean
  animationCallback?: () => void

  resetValueOnBoundsChange?: boolean
}

export function RadialVerticalGauge(props: Props) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const gauge = useRef<RadialVertical>(null)

  // Init gauge
  useEffect(() => {
    if (canvas.current) {
      gauge.current = new RadialVertical(canvas.current, {
        size: props.size,
        orientation: props.orientation,

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

        minValue: props.minValue,
        maxValue: props.maxValue,
        minMeasuredValueVisible: props.showMinMeasuredValue,
        maxMeasuredValueVisible: props.showMaxMeasuredValue,
        niceScale: props.niceScale,
        labelNumberFormat: props.labelNumberFormat,
        threshold: props.threshold,
        thresholdRising: props.thresholdRising,
        thresholdVisible: props.showThreshold === undefined ? false : props.showThreshold,
        fullScaleDeflectionTime: props.fullScaleDeflectionTime,
        playAlarm: props.playAlarm,
        alarmSound: props.alarmSound,

        titleString: props.titleString,
        unitString: props.unitString,

        ledColor: props.ledColor,
        ledVisible: props.showLed === undefined ? false : props.showLed,

        section: props.sections,
        area: props.sectors,
      })
    }
  }, [])

  // Update gauge
  useUpdateGaugeProp(gauge, "setFrameDesign", props.frameDesign)
  useUpdateGaugeProp(gauge, "setBackgroundColor", props.backgroundColor)
  useUpdateGaugeProp(gauge, "setForegroundType", props.foregroundType)

  useUpdateGaugeProp(gauge, "setPointerColor", props.pointerColor)
  useUpdateGaugeProp(gauge, "setPointerType", props.pointerType)

  useUpdateGaugeProp(gauge, "setLedColor", props.ledColor)
  useUpdateGaugeProp(gauge, "setLedVisible", props.showLed)

  useUpdateGaugeProp(gauge, "setThresholdRising", props.thresholdRising)
  // BUG in 'steelseries' library - setThresholdVisible not working
  useUpdateGaugeProp(gauge, "setThresholdVisible", props.showThreshold)

  useUpdateGaugeProp(gauge, "setMinMeasuredValueVisible", props.showMinMeasuredValue)
  useUpdateGaugeProp(gauge, "setMaxMeasuredValueVisible", props.showMaxMeasuredValue)
  useSetGaugeProp(gauge, "setMinMeasuredValue", props.minMeasuredValue)
  useSetGaugeProp(gauge, "setMaxMeasuredValue", props.maxMeasuredValue)

  // Min Value
  useDidUpdate(() => {
    if (gauge.current) {
      gauge.current.setMinValue(props.minValue)

      if (props.resetValueOnBoundsChange && props.animate) {
        gauge.current.setValue(gauge.current.getMinValue())
      }
    }
  }, [props.minValue])
  // Max Value
  useDidUpdate(() => {
    if (gauge.current) {
      gauge.current.setMaxValue(props.maxValue)

      if (props.resetValueOnBoundsChange && props.animate) {
        gauge.current.setValue(gauge.current.getMinValue())
      }
    }
  }, [props.maxValue])

  useSetGaugeValue(gauge, props.value, props.animate, props.animationCallback, [props.minValue, props.maxValue])

  return <canvas ref={canvas}></canvas>
}

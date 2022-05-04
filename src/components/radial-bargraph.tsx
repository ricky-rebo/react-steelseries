import React, { useEffect, useRef } from "react"
import { Section, gradientWrapper, TrendState, RadialBargraphParams, RadialBargraph } from "steelseries"
import { useDidUpdate } from "../hooks/common"
import { useSetGaugeProp, useSetGaugeValue, useUpdateGaugeProp } from "../hooks/gauge-update"

type ExcludedParams = "section" | "valueGradient" | "userLedVisible" | "userLedState" | "ledVisible" | "trendVisible"
interface Props extends Omit<RadialBargraphParams, ExcludedParams> {
  size: number

  showLed?: boolean
  showUserLed?: boolean
  userLedOn?: boolean
  userLedBlink?: boolean

  showTrend?: boolean

  valueSections?: Section[]
  valueGradient?: gradientWrapper

  value?: number
  trend?: TrendState

  animate?: boolean
  animationCallback?: () => void

  resetValueOnBoundsChange?: boolean
}

export function RadialBargraphGauge(props: Props) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const gauge = useRef<RadialBargraph>(null)

  // Init gauge
  useEffect(() => {
    if (canvas.current) {
      gauge.current = new RadialBargraph(canvas.current, {
        size: props.size,
        gaugeType: props.gaugeType,

        frameDesign: props.frameDesign,
        frameVisible: props.frameVisible,
        backgroundColor: props.backgroundColor,
        backgroundVisible: props.backgroundVisible,
        foregroundType: props.foregroundType,
        foregroundVisible: props.foregroundVisible,

        lcdColor: props.lcdColor,
        digitalFont: props.digitalFont,
        lcdDecimals: props.lcdDecimals,
        lcdVisible: props.lcdVisible,

        minValue: props.minValue,
        maxValue: props.maxValue,
        niceScale: props.niceScale,
        labelNumberFormat: props.labelNumberFormat,
        threshold: props.threshold,
        thresholdRising: props.thresholdRising,
        fullScaleDeflectionTime: props.fullScaleDeflectionTime,
        playAlarm: props.playAlarm,
        alarmSound: props.alarmSound,

        titleString: props.titleString,
        unitString: props.unitString,

        ledColor: props.ledColor,
        ledVisible: props.showLed === undefined ? false : props.showLed,

        fractionalScaleDecimals: props.fractionalScaleDecimals,
        tickLabelOrientation: props.tickLabelOrientation,
        trendVisible: props.showTrend,
        trendColors: props.trendColors,
        userLedColor: props.userLedColor,
        userLedVisible: props.showUserLed,
        valueColor: props.valueColor,
        section: props.valueSections,
        useSectionColors: props.valueSections !== undefined,
        valueGradient: props.valueGradient,
        useValueGradient: props.valueGradient !== undefined,

        customLayer: props.customLayer,
      })
    }

    return function () {
      if (gauge.current) {
        gauge.current.setThresholdRising(true).setThreshold(gauge.current.getMaxValue())
      }
    }
  }, [])

  // Update gauge
  useUpdateGaugeProp(gauge, "setFrameDesign", props.frameDesign)
  useUpdateGaugeProp(gauge, "setBackgroundColor", props.backgroundColor)
  useUpdateGaugeProp(gauge, "setForegroundType", props.foregroundType)

  useUpdateGaugeProp(gauge, "setLcdColor", props.lcdColor)
  useUpdateGaugeProp(gauge, "setLcdDecimals", props.lcdDecimals)

  useUpdateGaugeProp(gauge, "setLedColor", props.ledColor)
  useUpdateGaugeProp(gauge, "setLedVisible", props.showLed)

  useUpdateGaugeProp(gauge, "setLabelNumberFormat", props.labelNumberFormat)
  useUpdateGaugeProp(gauge, "setFractionalScaleDecimals", props.fractionalScaleDecimals)

  useUpdateGaugeProp(gauge, "setThreshold", props.threshold)
  useUpdateGaugeProp(gauge, "setThresholdRising", props.thresholdRising)

  useSetGaugeProp(gauge, "setUserLedOnOff", props.userLedOn)
  useSetGaugeProp(gauge, "blinkUserLed", props.userLedBlink)
  useUpdateGaugeProp(gauge, "setUserLedVisible", props.showUserLed)
  useUpdateGaugeProp(gauge, "setUserLedColor", props.userLedColor)

  useUpdateGaugeProp(gauge, "setValueColor", props.valueColor)
  useUpdateGaugeProp(gauge, "setSection", props.valueSections)
  useUpdateGaugeProp(gauge, "setGradient", props.valueGradient)

  useUpdateGaugeProp(gauge, "setTitleString", props.titleString)
  useUpdateGaugeProp(gauge, "setUnitString", props.unitString)

  useUpdateGaugeProp(gauge, "setTrendVisible", props.showTrend)
  useSetGaugeProp(gauge, "setTrend", props.trend)

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

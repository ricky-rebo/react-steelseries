import React, { useEffect, useRef } from "react"
import {
  WindDirectionParams,
  WindDirection,
  ColorDef,
  PointerType,
  Section,
} from "steelseries"
import { useUpdateGaugeProp } from "../hooks/gauge-update"

type ExcludedParams =
  | "area"
  | "section"
  | "pointerTypeLatest"
  | "pointerTypeAverage"
  | "pointerColor"
  | "pointerColorAverage"
  | "roseVisible"
interface Props extends Omit<WindDirectionParams, ExcludedParams> {
  size: number

  sections?: Section[]
  sectors?: Section[]

  lstPointerType?: PointerType
  avgPointerType?: PointerType
  lstPointerColor?: ColorDef
  avgPointerColor?: ColorDef

  showRose?: boolean

  valueLatest?: number
  valueAverage?: number

  animate?: boolean
  lstAnimationCallback?: () => void
  avgAnimationCallback?: () => void
}

export function WindDirectionGauge(props: Props) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const gauge = useRef<WindDirection>(null)

  // Init gauge
  useEffect(() => {
    if (canvas.current) {
      gauge.current = new WindDirection(canvas.current, {
        size: props.size,

        frameDesign: props.frameDesign,
        frameVisible: props.frameVisible,
        backgroundColor: props.backgroundColor,
        backgroundVisible: props.backgroundVisible,
        foregroundType: props.foregroundType,
        foregroundVisible: props.foregroundVisible,

        knobType: props.knobType,
        knobStyle: props.knobStyle,

        pointerTypeLatest: props.lstPointerType,
        pointerTypeAverage: props.avgPointerType,
        pointerColor: props.lstPointerColor,
        pointerColorAverage: props.avgPointerColor,

        lcdColor: props.lcdColor,
        digitalFont: props.digitalFont,
        lcdVisible: props.lcdVisible,

        section: props.sections,
        area: props.sectors,
        fullScaleDeflectionTime: props.fullScaleDeflectionTime,
        pointSymbols: props.pointSymbols,
        pointSymbolsVisible: props.pointSymbolsVisible,
        degreeScale: props.degreeScale,
        degreeScaleHalf: props.degreeScaleHalf,
        roseVisible: props.showRose,
        lcdTitleStrings: props.lcdTitleStrings,
        titleString: props.titleString,
        useColorLabels: props.useColorLabels,

        customLayer: props.customLayer,
      })
    }
  }, [])

  // Update gauge
  useUpdateGaugeProp(gauge, "setFrameDesign", props.frameDesign)
  useUpdateGaugeProp(gauge, "setBackgroundColor", props.backgroundColor)
  useUpdateGaugeProp(gauge, "setForegroundType", props.foregroundType)

  useUpdateGaugeProp(gauge, "setPointerType", props.lstPointerType)
  useUpdateGaugeProp(gauge, "setPointerColor", props.lstPointerColor)
  useUpdateGaugeProp(gauge, "setPointerTypeAverage", props.avgPointerType)
  useUpdateGaugeProp(gauge, "setPointerColorAverage", props.avgPointerColor)

  useUpdateGaugeProp(gauge, "setLcdColor", props.lcdColor)

  useUpdateGaugeProp(gauge, "setSection", props.sections)
  useUpdateGaugeProp(gauge, "setArea", props.sectors)

  useUpdateGaugeProp(gauge, "setPointSymbols", props.pointSymbols)
  useUpdateGaugeProp(gauge, "setLcdTitleStrings", props.lcdTitleStrings)

  useEffect(() => {
    if (gauge.current) {
      if (props.animate) {
        gauge.current.setValueAnimatedLatest(
          props.valueLatest,
          props.lstAnimationCallback
        )
      } else {
        gauge.current.setValueLatest(props.valueLatest)
      }
    }
  }, [props.valueLatest])
  useEffect(() => {
    if (gauge.current) {
      if (props.animate) {
        gauge.current.setValueAnimatedAverage(
          props.valueAverage,
          props.avgAnimationCallback
        )
      } else {
        gauge.current.setValueAverage(props.valueAverage)
      }
    }
  }, [props.valueAverage])

  return <canvas ref={canvas}></canvas>
}

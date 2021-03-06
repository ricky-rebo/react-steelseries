import React, { useEffect, useRef } from "react"
import { DisplaySingleParams, DisplaySingle } from "steelseries"
import { useUpdateGaugeProp } from "../hooks/gauge-update"

type ExcludedParams = "headerStringVisible" | "unitStringVisible" | "alwaysScroll"
interface Props extends Omit<DisplaySingleParams, ExcludedParams> {
  width: number
  height: number

  showHeaderString?: boolean
  showUnitString?: boolean

  infiniteScroll?: boolean
}

export function DisplaySingleGauge(props: Props) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const gauge = useRef<DisplaySingle>(null)

  // Init gauge
  useEffect(() => {
    if (canvas.current) {
      gauge.current = new DisplaySingle(canvas.current, {
        width: props.width,
        height: props.height,
        section: props.section,
        headerString: props.headerString,
        headerStringVisible: props.showHeaderString,
        unitString: props.unitString,
        unitStringVisible: props.showUnitString,
        valuesNumeric: props.valuesNumeric,
        value: props.value,
        alwaysScroll: props.infiniteScroll,
        autoScroll: props.autoScroll,

        lcdColor: props.lcdColor,
        digitalFont: props.digitalFont,
        lcdDecimals: props.lcdDecimals,
      })
    }

    return function () {
      gauge.current && gauge.current.setScrolling(false)
    }
  }, [])

  // Update gauge
  useUpdateGaugeProp(gauge, "setLcdColor", props.lcdColor)
  useUpdateGaugeProp(gauge, "setSection", props.section)
  useUpdateGaugeProp(gauge, "setScrolling", props.infiniteScroll)

  useUpdateGaugeProp(gauge, "setValue", props.value)

  return <canvas ref={canvas}></canvas>
}

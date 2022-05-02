import React, { useEffect, useRef } from "react"
// @ts-ignore
import { TrafficlightParams, TrafficLight } from "steelseries"
import { useSetGaugeProp } from "../hooks/gauge-update"

interface Props extends TrafficlightParams {
	width: number
	height: number

	redOn?: boolean
	yellowOn?: boolean
	greenOn?: boolean
}

export function TrafficLightGauge (props: Props) {
	const canvas = useRef<HTMLCanvasElement>(null)
	const gauge = useRef<TrafficLight>(null)

	// Init gauge
	useEffect(() => {
		if (canvas.current) {
			gauge.current = new TrafficLight(canvas.current, {
				width: props.width,
				height: props.height
			})
		}
	}, [])

	// Update gauge
	useSetGaugeProp(gauge, "setRedOn", props.redOn)
	useSetGaugeProp(gauge, "setYellowOn", props.yellowOn)
	useSetGaugeProp(gauge, "setGreenOn", props.greenOn)

	return <canvas ref={canvas}></canvas>
}

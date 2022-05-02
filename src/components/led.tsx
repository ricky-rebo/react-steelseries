import React, { useEffect, useRef } from "react";
import { LedParams, Led } from "steelseries";
import { useSetGaugeProp, useUpdateGaugeProp } from "../hooks/gauge-update";

interface Props extends LedParams {
	size: number;
	on?: boolean;
	blink?: boolean;
}

export function LedGauge (props: Props) {
	const canvas = useRef<HTMLCanvasElement>(null)
	const gauge = useRef<Led>(null)

	// Init gauge
	useEffect(() => {
		if (canvas.current) {
			gauge.current = new Led(canvas.current, {
				size: props.size,
				ledColor: props.ledColor
			})
		}

		return function () {gauge.current && gauge.current.blink(false)}
	}, [])

	// Update gauge
	useUpdateGaugeProp(gauge, "setLedColor", props.ledColor)

	useSetGaugeProp(gauge, "setLedOnOff", props.on)
	useEffect(() => {
		if (gauge.current) {
			gauge.current.blink(props.blink)

			// when disabling blinking, bring back led to previous state
			if (!props.blink) gauge.current.setLedOnOff(props.on)
		}
	}, [props.blink])

	return <canvas ref={canvas}></canvas>
}

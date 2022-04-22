import React, { useEffect, useRef } from "react";
import { LedParams, Led as LedGauge } from "steelseries";
import { useInitUpdateGaugeProp } from "../hooks/useInitUpdateGaugeProp";
import { useUpdateGaugeProp } from "../hooks/useUpdateGaugeProp";

interface Props extends LedParams {
	size: number;
	on?: boolean;
	blink?: boolean;
}

export function Led (props: Props) {
	const canvas = useRef<HTMLCanvasElement>()
	const gauge = useRef<LedGauge>()

	// Init gauge
	useEffect(() => {
		if (canvas.current) {
			gauge.current = new LedGauge(canvas.current, {
				size: props.size,
				ledColor: props.ledColor
			})
		}

		return function () {gauge.current && gauge.current.blink(false)}
	}, [])

	// Update gauge
	useUpdateGaugeProp(gauge, "setLedColor", props.ledColor)

	useInitUpdateGaugeProp(gauge, "setLedOnOff", props.on)
	useEffect(() => {
		if (gauge.current) {
			gauge.current.blink(props.blink)

			// when disabling blinking, bring back led to previous state
			if (!props.blink) gauge.current.setLedOnOff(props.on)
		}
	}, [props.blink])

	return <canvas ref={canvas}></canvas>
}

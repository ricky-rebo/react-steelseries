import React, { useEffect, useRef } from "react";
import { OdometerParams, Odometer } from "steelseries";
import { useSetGaugeValue } from "../hooks/gauge-update";

interface Props extends Omit<OdometerParams, "_context"> {
	height: number;

	animate?: boolean;
	animationCallback?: () => {};
}

export function OdometerGauge (props: Props) {
	const canvas = useRef<HTMLCanvasElement>()
	const gauge = useRef<Odometer>()

	// Init gauge
	useEffect(() => {
		if (canvas.current) {
			gauge.current = new Odometer(canvas.current, {
				height: props.height,
				digits: props.digits,
				decimals: props.decimals,
				decimalBackColor: props.decimalBackColor,
				decimalForeColor: props.decimalForeColor,
				font: props.font,
				// value: props.animate ? 0 : props.value,
				valueBackColor: props.valueBackColor,
				valueForeColor: props.valueForeColor,
				wobbleFactor: props.wobbleFactor
			})
		}
	}, [])

	// Update gauge
	useSetGaugeValue(gauge, props.value, props.animate, props.animationCallback)

	return <canvas ref={canvas}></canvas>
}

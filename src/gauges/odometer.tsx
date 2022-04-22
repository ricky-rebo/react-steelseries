import React, { useEffect, useRef } from "react";
import { OdometerParams, Odometer } from "steelseries";

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
	useEffect(() => {
		if (gauge.current) {
			if (props.animate)
				gauge.current.setValueAnimated(props.value, props.animationCallback)
			else
				gauge.current.setValue(props.value)
		}
	}, [props.value])

	return <canvas ref={canvas}></canvas>
}

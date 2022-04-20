import React, { useEffect, useRef } from "react";
import { BatteryParams, Battery as BatteryGauge } from "steelseries";

interface Props extends BatteryParams {
	size: number;
}

export function Battery (props: Props) {
	const canvas = useRef<HTMLCanvasElement>()
	const gauge = useRef<BatteryGauge>()

	// Init gauge
	useEffect(() => {
		if (canvas.current) {
			gauge.current = new BatteryGauge(canvas.current, {
				size: props.size
			})
		}
	}, [])

	// Update gauge
	useEffect(() => {gauge.current && gauge.current.setValue(props.value)}, [props.value])

	return <canvas ref={canvas}></canvas>
}

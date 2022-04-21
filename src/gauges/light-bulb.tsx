import React, { useEffect, useRef } from "react";
// @ts-ignore
import { LightbulbParams, LightBulb as LightBulbGauge } from "steelseries";
import { useDidUpdate } from "../hooks/useDidUpdate";

interface Props extends Partial<LightbulbParams> {
	width: number;
	height: number;
	on?: boolean;
	alpha?: number;
}

export function LightBulb (props: Props) {
	const canvas = useRef<HTMLCanvasElement>()
	const gauge = useRef<LightBulbGauge>()

	const ID = `lightbulb-${uid()}`

	// Init gauge
	useEffect(() => {
		if (canvas.current) {
			gauge.current = new LightBulbGauge(ID, {
				width: props.width,
				height: props.height,

				// Should be optional, but it's not...
				// Default value taken from 'steelseries' original library source
				// BUG fix in @types/steelseries
				glowColor: props.glowColor === undefined ? "#ffff00" : props.glowColor
			})
		}
	}, [])

	// Gauge update
	useDidUpdate(() => {gauge.current && gauge.current.setGlowColor(props.glowColor)}, [props.glowColor])

	useEffect(() => {gauge.current && gauge.current.setOn(props.on)}, [props.on])
	useEffect(() => {gauge.current && gauge.current.setAlpha(props.alpha)}, [props.alpha])

	return <canvas ref={canvas} id={ID}></canvas>
}

function uid() {
  return (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,"");
}

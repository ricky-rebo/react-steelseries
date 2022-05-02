import React, { useEffect, useRef } from "react";
// @ts-ignore
import { LightbulbParams, LightBulb } from "steelseries";
import { useSetGaugeProp, useUpdateGaugeProp } from "../hooks/gauge-update";

interface Props extends Partial<LightbulbParams> {
	width: number;
	height: number;
	on?: boolean;
	alpha?: number;
}

export function LightBulbGauge (props: Props) {
	const canvas = useRef<HTMLCanvasElement>(null)
	const gauge = useRef<LightBulb>(null)

	const ID = `lightbulb-${uid()}`

	// Init gauge
	useEffect(() => {
		if (canvas.current) {
			gauge.current = new LightBulb(ID, {
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
	useUpdateGaugeProp(gauge, "setGlowColor", props.glowColor)

	useSetGaugeProp(gauge, "setOn", props.on)
	useSetGaugeProp(gauge, "setAlpha", props.alpha)

	return <canvas ref={canvas} id={ID}></canvas>
}

function uid() {
  return (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,"");
}

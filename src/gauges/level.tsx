import React, { useEffect, useRef } from "react";
import { LevelParams, Level as LevelGauge } from "steelseries";
import { useUpdateGaugeProp } from "../hooks/gauge-update";

interface Props extends LevelParams {
	size: number;
	value?: number;

	animate?: boolean;
	animationCallback?: ()=> void;
}

export function Level (props: Props) {
	const canvas = useRef<HTMLCanvasElement>()
	const gauge = useRef<LevelGauge>()

	// Init gauge
	useEffect(() => {
		if (canvas.current) {
			gauge.current = new LevelGauge(canvas.current, {
				size: props.size,
				frameDesign: props.frameDesign,
				frameVisible: props.frameVisible,
				backgroundColor: props.backgroundColor,
				backgroundVisible: props.backgroundVisible,
				foregroundType: props.foregroundType,
				foregroundVisible: props.foregroundVisible,
				pointerColor: props.pointerColor,
				decimalsVisible: props.decimalsVisible,
				textOrientationFixed: props.textOrientationFixed,
				rotateFace: props.rotateFace,
			})
		}
	}, [])

	// Update gauge
	useUpdateGaugeProp(gauge, "setFrameDesign", props.frameDesign)
	useUpdateGaugeProp(gauge, "setBackgroundColor", props.backgroundColor)
	useUpdateGaugeProp(gauge, "setForegroundType", props.foregroundType)

	useUpdateGaugeProp(gauge, "setPointerColor", props.pointerColor)

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

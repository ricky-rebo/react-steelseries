import React, { useEffect, useRef } from "react";
import { CompassParams, Compass as CompassGauge } from "steelseries";
import { useUpdateGaugeProp } from "../hooks/gauge-update";

interface Props extends CompassParams {
	size: number;
	value?: number;
	animate?: boolean;
	animationCallback?: ()=> void;
}

export function Compass (props: Props) {
	const canvas = useRef<HTMLCanvasElement>()
	const gauge = useRef<CompassGauge>()

	// Init gauge
	useEffect(() => {
		if (canvas.current) {
			gauge.current = new CompassGauge(canvas.current, {
				frameDesign: props.frameDesign,
				frameVisible: props.frameVisible,
				backgroundColor: props.backgroundColor,
				backgroundVisible: props.backgroundVisible,
				foregroundType: props.foregroundType,
				foregroundVisible: props.foregroundVisible,
				knobType: props.knobType,
				knobStyle: props.knobStyle,
				pointerType: props.pointerType,
				pointerColor: props.pointerColor,
				size: props.size,
				pointSymbols: props.pointSymbols,
				pointSymbolsVisible: props.pointSymbolsVisible,
				degreeScale: props.degreeScale,
				roseVisible: props.roseVisible,
				rotateFace: props.rotateFace,
				customLayer: props.customLayer
			})
		}
	}, [])

	// Update gauge
	useUpdateGaugeProp(gauge, "setFrameDesign", props.frameDesign)
	useUpdateGaugeProp(gauge, "setBackgroundColor", props.backgroundColor)
	useUpdateGaugeProp(gauge, "setForegroundType", props.foregroundType)

	useUpdateGaugeProp(gauge, "setPointerType", props.pointerType)
	useUpdateGaugeProp(gauge, "setPointerColor", props.pointerColor)

	useUpdateGaugeProp(gauge, "setPointSymbols", props.pointSymbols)
	useEffect(() => {
		if (gauge.current) {
			props.animate
				? gauge.current.setValueAnimated(props.value, props.animationCallback)
				: gauge.current.setValue(props.value)
		}
	}, [props.value])

	return <canvas ref={canvas}></canvas>
}

import React, { useEffect, useRef } from "react";
import { CompassParams, Compass as CompassGauge } from "steelseries";
import { useDidUpdate } from "../hooks/useDidUpdate";

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
	useDidUpdate(() => {gauge.current && gauge.current.setFrameDesign(props.frameDesign)}, [props.frameDesign])
	useDidUpdate(() => {gauge.current && gauge.current.setBackgroundColor(props.backgroundColor)}, [props.backgroundColor])
	useDidUpdate(() => {gauge.current && gauge.current.setForegroundType(props.foregroundType)}, [props.foregroundType])

	useDidUpdate(() => {gauge.current && gauge.current.setPointerType(props.pointerType)}, [props.pointerType])
	useDidUpdate(() => {gauge.current && gauge.current.setPointerColor(props.pointerColor)}, [props.pointerColor])

	useDidUpdate(() => {gauge.current && gauge.current.setPointSymbols(props.pointSymbols)}, [props.pointSymbols])
	useEffect(() => {
		if (gauge.current) {
			props.animate
				? gauge.current.setValueAnimated(props.value, props.animationCallback)
				: gauge.current.setValue(props.value)
		}
	}, [props.value])

	return <canvas ref={canvas}></canvas>
}

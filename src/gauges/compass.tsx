import React, { useEffect, useRef } from "react";
import { CompassParams, Compass as CompassGauge } from "steelseries";

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
	useEffect(() => {gauge.current && gauge.current.setFrameDesign(props.frameDesign)}, [props.frameDesign])
	useEffect(() => {gauge.current && gauge.current.setBackgroundColor(props.backgroundColor)}, [props.backgroundColor])
	useEffect(() => {gauge.current && gauge.current.setForegroundType(props.foregroundType)}, [props.foregroundType])

	useEffect(() => {gauge.current && gauge.current.setPointerType(props.pointerType)}, [props.pointerType])
	useEffect(() => {gauge.current && gauge.current.setPointerColor(props.pointerColor)}, [props.pointerColor])

	useEffect(() => {gauge.current && props.pointSymbols && gauge.current.setPointSymbols(props.pointSymbols)}, [props.pointSymbols])
	useEffect(() => {
		if (gauge.current) {
			props.animate
				? gauge.current.setValueAnimated(props.value, props.animationCallback)
				: gauge.current.setValue(props.value)
		}
	}, [props.value])

	return <canvas ref={canvas}></canvas>
}

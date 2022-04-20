import React, { useRef, useEffect } from "react";
import { AltimeterParams, Altimeter as AltimeterGauge } from "steelseries";
import { useDidUpdate } from "../hooks/useDidUpdate";

interface Props extends AltimeterParams {
	size: number;

	value?: number;
	animate?: boolean;
	animationCallback?: ()=> void;

	// Missing in AltimeterParams!
	// BUG fix in @types/steelseries
	titleString?: string;
	unitString?: string;

	resetValueOnUnitChange?: boolean;
}

export function Altimeter (props: Props) {
	const canvas = useRef<HTMLCanvasElement>()
	const gauge = useRef<AltimeterGauge>()

	// Gauge init
	useEffect(() => {
		gauge.current = new AltimeterGauge(canvas.current, {
			frameDesign: props.frameDesign,
			frameVisible: props.frameVisible,
			backgroundColor: props.backgroundColor,
			backgroundVisible: props.backgroundVisible,
			foregroundType: props.foregroundType,
			foregroundVisible: props.foregroundVisible,
			knobType: props.knobType,
			knobStyle: props.knobStyle,
			lcdColor: props.lcdColor,
			digitalFont: props.digitalFont,
			lcdVisible: props.lcdVisible,
			size: props.size,
			unitAltPos: props.unitAltPos,
			customLayer: props.customLayer
		})
	}, [])

	// Gauge update
	useDidUpdate(() => {gauge.current && gauge.current.setFrameDesign(props.frameDesign)}, [props.frameDesign])
	useDidUpdate(() => {gauge.current && gauge.current.setBackgroundColor(props.backgroundColor)}, [props.backgroundColor])
	useDidUpdate(() => {gauge.current && gauge.current.setForegroundType(props.foregroundType)}, [props.foregroundType])

	useDidUpdate(() => {gauge.current && gauge.current.setLcdColor(props.lcdColor)}, [props.lcdColor])

	useEffect(() => {gauge.current && gauge.current.setTitleString(props.titleString)}, [props.titleString])
	useEffect(() => {
		if (gauge.current) {
			if (props.resetValueOnUnitChange) gauge.current.setValue(0)
			gauge.current.setUnitString(props.unitString)
		}
	}, [props.unitString])

	useEffect(() => {
		if (gauge.current) {
			props.animate
				? gauge.current.setValueAnimated(props.value, props.animationCallback)
				: gauge.current.setValue(props.value)
		}
	}, [props.value])

	return <canvas ref={canvas}></canvas>
}

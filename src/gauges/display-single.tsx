import React, { useEffect, useRef } from "react";
import { DisplaySingleParams, DisplaySingle as DisplaySingleGauge } from "steelseries";
import { useDidUpdate } from "../hooks/useDidUpdate";

type ExcludedParams = "headerStringVisible" | "unitStringVisible" | "alwaysScroll";
interface Props extends Omit<DisplaySingleParams, ExcludedParams> {
	width: number;
	height: number;

	showHeaderString?: boolean;
	showUnitString?: boolean;

	infiniteScroll?: boolean;
}

export function DisplaySingle (props: Props) {
	const canvas = useRef<HTMLCanvasElement>()
	const gauge = useRef<DisplaySingleGauge>()

	// Init gauge
	useEffect(() => {
		if (canvas.current) {
			gauge.current = new DisplaySingleGauge(canvas.current, {
				width: props.width,
				height: props.height,
				section: props.section,
				headerString: props.headerString,
				headerStringVisible: props.showHeaderString,
				unitString: props.unitString,
				unitStringVisible: props.showUnitString,
				valuesNumeric: props.valuesNumeric,
				value: props.value,
				alwaysScroll: props.infiniteScroll,
				autoScroll: props.autoScroll,

				lcdColor: props.lcdColor,
				digitalFont: props.digitalFont,
				lcdDecimals: props.lcdDecimals
			})
		}

		return function () {gauge.current && gauge.current.setScrolling(false)}
	}, [])

	// Update gauge
	useDidUpdate(() => {gauge.current && gauge.current.setLcdColor(props.lcdColor)}, [props.lcdColor])
	useDidUpdate(() => {gauge.current && gauge.current.setSection(props.section)}, [props.section])
	useDidUpdate(() => {gauge.current && gauge.current.setScrolling(props.infiniteScroll)}, [props.infiniteScroll])

	useDidUpdate(() => {gauge.current && gauge.current.setValue(props.value)}, [props.value])

	return <canvas ref={canvas}></canvas>
}

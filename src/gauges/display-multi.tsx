import React, { useEffect, useRef } from "react";
import { DisplayMultiParams, DisplayMulti as DisplayMultiGauge } from "steelseries";
import { useDidUpdate } from "../hooks/useDidUpdate";

type ExcludedParams = "headerStringVisible" | "detailStringVisible" | "unitStringVisible";
interface Props extends Omit<DisplayMultiParams, ExcludedParams> {
	width: number;
	height: number;

	showHeaderString?: boolean;
	showDetailString?: boolean;
	showUnitString?: boolean;
}

export function DisplayMulti (props: Props) {
	const canvas = useRef<HTMLCanvasElement>()
	const gauge = useRef<DisplayMultiGauge>()

	// Init gauge
	useEffect(() => {
		if (canvas.current) {
			gauge.current = new DisplayMultiGauge(canvas.current, {
				width: props.width,
				height: props.height,
				headerString: props.headerString,
				headerStringVisible: props.showHeaderString,
				detailString: props.detailString,
				detailStringVisible: props.showDetailString,
				unitString: props.unitString,
				unitStringVisible: props.showUnitString,
				linkAltValue: (props.linkAltValue === undefined) ? false : props.linkAltValue,
				valuesNumeric: props.valuesNumeric,
				value: props.value,
				altValue: props.altValue,

				lcdColor: props.lcdColor,
				digitalFont: props.digitalFont,
				lcdDecimals: props.lcdDecimals
			})
		}
	}, [])

	// Update gauge
	useDidUpdate(() => {gauge.current && gauge.current.setLcdColor(props.lcdColor)}, [props.lcdColor])

	useDidUpdate(() => {gauge.current && gauge.current.setValue(props.value)}, [props.value])
	useDidUpdate(() => {gauge.current && gauge.current.setAltValue(props.altValue)}, [props.altValue])

	return <canvas ref={canvas}></canvas>
}

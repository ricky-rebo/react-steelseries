import React, { useEffect, useRef } from "react";
import { DisplayMultiParams, DisplayMulti as DisplayMultiGauge } from "steelseries";
import { useUpdateGaugeProp } from "../hooks/gauge-update";

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
	useUpdateGaugeProp(gauge, "setLcdColor", props.lcdColor)

	useUpdateGaugeProp(gauge, "setValue", props.value)
	useUpdateGaugeProp(gauge, "setAltValue", props.altValue)

	return <canvas ref={canvas}></canvas>
}

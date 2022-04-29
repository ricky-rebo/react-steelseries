import React, { useEffect, useRef } from "react";
import { OdometerParams, RadialParams, Radial, Section, TrendState } from "steelseries";

// BUG @types/steelseries
// Define a subset of params for Radial Odometer
type RadialOdometerParams = Omit<OdometerParams, "_context" | "height" | "value" | "wobbleFactor">;

type ExcludedParams = "odometerUseValue"
	| "area"
	| "section"
	| "userLedVisible"
	| "minMeasuredValueVisible"
	| "maxMeasuredValueVisible"
	| "odometerParams"
	| "userLedState"
	| "thresholdVisible"
	| "ledVisible"
	| "trendVisible";
interface Props extends Omit<RadialParams, ExcludedParams> {
	size: number;

	sections?: Section[];
	sectors?: Section[];

	showThreshold?: boolean;

	showLed?: boolean;
	showUserLed?: boolean;
	userLedOn?: boolean;
	userLedBlink?: boolean;

	showTrend?: boolean;
	showMinMeasuredValue?: boolean;
	showMaxMeasuredValue?: boolean;

	value?: number;
	trend?: TrendState;
	minMeasuredValue?: number;
	maxMeasuredValue?: number;
	odometerValue?: number;
	syncOdometerValue?: boolean;
	odometerParams?: RadialOdometerParams;

	animate?: boolean;
	animationCallback?: () => void;

	resetValueOnBoundsChange?: boolean;
}

export function RadialGauge (props: Props) {
	const canvas = useRef<HTMLCanvasElement>()
	const gauge = useRef<Radial>()

	// Init gauge
	useEffect(() => {
		if (canvas.current) {
			gauge.current = new Radial(canvas.current, {
				size: props.size,
				gaugeType: props.gaugeType,

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

				lcdColor: props.lcdColor,
				digitalFont: props.digitalFont,
				lcdDecimals: props.lcdDecimals,
				lcdVisible: props.lcdVisible,

				minValue: props.minValue,
				maxValue: props.maxValue,
				minMeasuredValueVisible: props.showMinMeasuredValue,
				maxMeasuredValueVisible: props.showMaxMeasuredValue,
				niceScale: props.niceScale,
				labelNumberFormat: props.labelNumberFormat,
				threshold: props.threshold,
				thresholdRising: props.thresholdRising,
				thresholdVisible: (props.showThreshold === undefined) ? false : props.showThreshold,
				fullScaleDeflectionTime: props.fullScaleDeflectionTime,
				playAlarm: props.playAlarm,
				alarmSound: props.alarmSound,

				titleString: props.titleString,
				unitString: props.unitString,

				ledColor: props.ledColor,
				ledVisible: (props.showLed === undefined) ? false : props.showLed,

				fractionalScaleDecimals: props.fractionalScaleDecimals,
				tickLabelOrientation: props.tickLabelOrientation,
				trendVisible: props.showTrend,
				trendColors: props.trendColors,
				userLedColor: props.userLedColor,
				userLedVisible: props.showUserLed,
				section: props.sections,
				area: props.sectors,
				useOdometer: props.useOdometer,
				odometerParams: props.odometerParams,
				odometerUseValue: props.syncOdometerValue,

				customLayer: props.customLayer,
			})
		}
	}, [])

	// Update gauge
	

	return <canvas ref={canvas}></canvas>
}

import React, { useEffect, useRef } from "react";
import { OdometerParams, RadialParams, Radial, Section, TrendState } from "steelseries";
import { useDidUpdate } from "../hooks/common";
import { useSetGaugeProp, useSetGaugeValue, useUpdateGaugeProp } from "../hooks/gauge-update";

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
	const canvas = useRef<HTMLCanvasElement>(null)
	const gauge = useRef<Radial>(null)

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
	useUpdateGaugeProp(gauge, "setFrameDesign", props.frameDesign)
	useUpdateGaugeProp(gauge, "setBackgroundColor", props.backgroundColor)
	useUpdateGaugeProp(gauge, "setForegroundType", props.foregroundType)

	useUpdateGaugeProp(gauge, "setPointerColor", props.pointerColor)
	useUpdateGaugeProp(gauge, "setPointerType", props.pointerType)

	useUpdateGaugeProp(gauge, "setLcdColor", props.lcdColor)
	useUpdateGaugeProp(gauge, "setLcdDecimals", props.lcdDecimals)

	useUpdateGaugeProp(gauge, "setLedColor", props.ledColor)
	useUpdateGaugeProp(gauge, "setLedVisible", props.showLed)

	useUpdateGaugeProp(gauge, "setLabelNumberFormat", props.labelNumberFormat)
	useUpdateGaugeProp(gauge, "setFractionalScaleDecimals", props.fractionalScaleDecimals)

	useUpdateGaugeProp(gauge, "setThreshold", props.threshold)
	useUpdateGaugeProp(gauge, "setThresholdRising", props.thresholdRising)
	// BUG in 'steelseries' library - setThresholdVisible not working
	useUpdateGaugeProp(gauge, "setThresholdVisible", props.showThreshold)

	useSetGaugeProp(gauge, "setUserLedOnOff", props.userLedOn)
	useSetGaugeProp(gauge, "blinkUserLed", props.userLedBlink)
	useUpdateGaugeProp(gauge, "setUserLedVisible", props.showUserLed)
	useUpdateGaugeProp(gauge, "setUserLedColor", props.userLedColor)

	useUpdateGaugeProp(gauge, "setSection", props.sections)
	useUpdateGaugeProp(gauge, "setArea", props.sectors)

	useSetGaugeProp(gauge, "setUserLedOnOff", props.userLedOn)
	useSetGaugeProp(gauge, "blinkUserLed", props.userLedBlink)

	useUpdateGaugeProp(gauge, "setTitleString", props.titleString)
	useUpdateGaugeProp(gauge, "setUnitString", props.unitString)

	useUpdateGaugeProp(gauge, "setTrendVisible", props.showTrend)
	useSetGaugeProp(gauge, "setTrend", props.trend)

	useUpdateGaugeProp(gauge, "setMinMeasuredValueVisible", props.showMinMeasuredValue)
	useUpdateGaugeProp(gauge, "setMaxMeasuredValueVisible", props.showMaxMeasuredValue)
	useSetGaugeProp(gauge, "setMinMeasuredValue", props.minMeasuredValue)
	useSetGaugeProp(gauge, "setMaxMeasuredValue", props.maxMeasuredValue)

	// Min Value
	useDidUpdate(() => {
		if (gauge.current) {
			gauge.current.setMinValue(props.minValue)

			if (props.resetValueOnBoundsChange && props.animate) {
				gauge.current.setValue(gauge.current.getMinValue())
			}
		}
	}, [props.minValue])
	// Max Value
	useDidUpdate(() => {
		if (gauge.current) {
			gauge.current.setMaxValue(props.maxValue)

			if (props.resetValueOnBoundsChange && props.animate) {
				gauge.current.setValue(gauge.current.getMinValue())
			}
		}
	}, [props.maxValue])

	useSetGaugeProp(gauge, "setOdoValue", props.odometerValue)
	useSetGaugeValue(gauge, props.value, props.animate, props.animationCallback, [props.minValue, props.maxValue])

	return <canvas ref={canvas}></canvas>
}

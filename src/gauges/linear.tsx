import React, { useEffect, useRef } from "react";
import { LinearParams, Linear as LinearGauge } from "steelseries";
import { useDidUpdate } from "../hooks/common";
import { useInitUpdateGaugeProp, useUpdateGaugeProp } from "../hooks/gauge-update";

type ExcludedParams = "ledVisible"
	|"minMeasuredValueVisible"
	|"maxMeasuredValueVisible"
	|"thresholdVisible";
interface Props extends Omit<LinearParams, ExcludedParams> {
	width: number;
	height: number;

	showLed?: boolean;
	showThreshold?: boolean;
	showMinMeasuredValue?: boolean;
	showMaxMeasuredValue?: boolean;

	value?: number;
	minMeasuredValue?: number;
	maxMeasuredValue?: number;

	animate?: boolean;
	animationCallback?: () => void;

	resetValueOnBoundsChange?: boolean;
}

export function Linear (props: Props) {
	const canvas = useRef<HTMLCanvasElement>()
	const gauge = useRef<LinearGauge>()

	// Init gauge
	useEffect(() => {
		if (canvas.current) {
			gauge.current = new LinearGauge(canvas.current, {
				width: props.width,
				height: props.height,

				gaugeType: props.gaugeType,
				frameDesign: props.frameDesign,
				frameVisible: props.frameVisible,
				backgroundColor: props.backgroundColor,
				backgroundVisible: props.backgroundVisible,
				foregroundVisible: props.foregroundVisible,

				lcdColor: props.lcdColor,
				digitalFont: props.digitalFont,
				lcdDecimals: props.lcdDecimals,
				lcdVisible: props.lcdVisible,

				ledColor: props.ledColor,
				ledVisible: (props.showLed === undefined) ? false : props.showLed,

				valueColor: props.valueColor,
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
			})
		}
	}, [])

	// Update gauge
	useUpdateGaugeProp(gauge, "setFrameDesign", props.frameDesign)
	useUpdateGaugeProp(gauge, "setBackgroundColor", props.backgroundColor)

	useUpdateGaugeProp(gauge, "setLcdColor", props.lcdColor)
	useUpdateGaugeProp(gauge, "setLcdDecimals", props.lcdDecimals)

	useUpdateGaugeProp(gauge, "setLedColor", props.ledColor)
	useUpdateGaugeProp(gauge, "setLedVisible", props.showLed)

	useUpdateGaugeProp(gauge, "setValueColor", props.valueColor)

	useUpdateGaugeProp(gauge, "setThreshold", props.threshold)
	useUpdateGaugeProp(gauge, "setThresholdRising", props.thresholdRising)
	// BUG in 'steelseries' library -> Linear.setThresholdVisible might not work properly
	useUpdateGaugeProp(gauge, "setThresholdVisible", props.showThreshold)

	useUpdateGaugeProp(gauge, "setTitleString", props.titleString)
	useUpdateGaugeProp(gauge, "setUnitString", props.unitString)

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

	useUpdateGaugeProp(gauge, "setMinMeasuredValueVisible", props.showMinMeasuredValue)
	useUpdateGaugeProp(gauge, "setMaxMeasuredValueVisible", props.showMaxMeasuredValue)

	useInitUpdateGaugeProp(gauge, "setMinMeasuredValue", props.minMeasuredValue)
	useInitUpdateGaugeProp(gauge, "setMaxMeasuredValue", props.maxMeasuredValue)
	useEffect(() => {
		if (gauge.current) {
			props.animate
				? gauge.current.setValueAnimated(props.value, props.animationCallback)
				: gauge.current.setValue(props.value)
		}
	}, [props.value, props.minValue, props.maxValue])

	return <canvas ref={canvas}></canvas>
}

import React, { useEffect, useRef } from "react";
import { ClockParams, Clock as ClockGauge } from "steelseries";
import { useDidUpdate } from "../hooks/common";
import { useUpdateGaugeProp } from "../hooks/gauge-update";

interface Props extends Partial<Omit<ClockParams, "hour"|"minute"|"second"|"secondMovesContinuous">> {
	size: number;
	value: Date;

	secondPointerTick?: boolean;
}

export function Clock (props: Props) {
	const canvas = useRef<HTMLCanvasElement>()
	const gauge = useRef<ClockGauge>()

	// Init gauge
	useEffect(() => {
		if (canvas.current) {
			gauge.current = new ClockGauge(canvas.current, {
				frameDesign: props.frameDesign,
				frameVisible: props.frameVisible,
				backgroundColor: props.backgroundColor,
				backgroundVisible: props.backgroundVisible,
				foregroundType: props.foregroundType,
				foregroundVisible: props.foregroundVisible,
				pointerType: props.pointerType,
				pointerColor: props.pointerColor,
				size: props.size,

				hour: props.value.getHours(),
				minute: props.value.getMinutes(),
				second: props.value.getSeconds(),

				/* Should be opional, but they're not... */
				// BUG fix in @types/steelseries
				timeZoneOffsetHour: props.timeZoneOffsetHour === undefined ? 0 : props.timeZoneOffsetHour,
				timeZoneOffsetMinute: props.timeZoneOffsetMinute === undefined ? 0 : props.timeZoneOffsetMinute,
				isAutomatic: props.isAutomatic === undefined ? true : props.isAutomatic,

				secondMovesContinuous: props.secondPointerTick === undefined ? true : !props.secondPointerTick,
				secondPointerVisible: props.secondPointerVisible === undefined ? true : props.secondPointerVisible,

				customLayer: props.customLayer
			})
		}

		// Cleanup
		return function () {
			gauge.current && gauge.current.setAutomatic(false)
		}
	}, [])

	// Gauge update
	useUpdateGaugeProp(gauge, "setFrameDesign", props.frameDesign)
	useUpdateGaugeProp(gauge, "setBackgroundColor", props.backgroundColor)
	useUpdateGaugeProp(gauge, "setForegroundType", props.foregroundType)

	useUpdateGaugeProp(gauge, "setPointerType", props.pointerType)
	useUpdateGaugeProp(gauge, "setPointerColor", props.pointerColor)

	useUpdateGaugeProp(gauge, "setAutomatic", props.isAutomatic)
	useUpdateGaugeProp(gauge, "setTimeZoneOffsetHour", props.timeZoneOffsetHour)
	useUpdateGaugeProp(gauge, "setTimeZoneOffsetMinute", props.timeZoneOffsetMinute)

	useUpdateGaugeProp(gauge, "setSecondPointerVisible", props.secondPointerVisible)
	useDidUpdate(() => {
		if (gauge.current) {
			if (props.isAutomatic) gauge.current.setAutomatic(false)
			gauge.current.setSecondMovesContinuous(!props.secondPointerTick)
			if (props.isAutomatic) gauge.current.setAutomatic(true)
		}
	}, [props.secondPointerTick])

	useDidUpdate(() => {
		if (gauge.current) {
			gauge.current.setHour(props.value.getHours())
				.setMinute(props.value.getMinutes())
				.setSecond(props.value.getSeconds())
		}
	}, [props.value])

	return <canvas ref={canvas}></canvas>
}

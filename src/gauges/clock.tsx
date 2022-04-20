import React, { useEffect, useRef } from "react";
import { ClockParams, Clock as ClockGauge } from "steelseries";

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
	useEffect(() => {gauge.current && gauge.current.setFrameDesign(props.frameDesign)}, [props.frameDesign])
	useEffect(() => {gauge.current && gauge.current.setBackgroundColor(props.backgroundColor)}, [props.backgroundColor])
	useEffect(() => {gauge.current && gauge.current.setForegroundType(props.foregroundType)}, [props.foregroundType])

	useEffect(() => {gauge.current && gauge.current.setPointerType(props.pointerType)}, [props.pointerType])
	useEffect(() => {gauge.current && gauge.current.setPointerColor(props.pointerColor)}, [props.pointerColor])

	useEffect(() => {gauge.current && gauge.current.setAutomatic(props.isAutomatic)}, [props.isAutomatic])
	useEffect(() => {gauge.current && gauge.current.setTimeZoneOffsetHour(props.timeZoneOffsetHour)}, [props.timeZoneOffsetHour])
	useEffect(() => {gauge.current && gauge.current.setTimeZoneOffsetMinute(props.timeZoneOffsetHour)}, [props.timeZoneOffsetMinute])

	useEffect(() => {gauge.current && gauge.current.setSecondPointerVisible(props.secondPointerVisible)}, [props.secondPointerVisible])
	useEffect(() => {
		if (gauge.current) {
			if (props.isAutomatic) gauge.current.setAutomatic(false)
			gauge.current.setSecondMovesContinuous(!props.secondPointerTick)
			if (props.isAutomatic) gauge.current.setAutomatic(true)
		}
	}, [props.secondPointerTick])

	useEffect(() => {
		if (gauge.current) {
			gauge.current.setHour(props.value.getHours())
				.setMinute(props.value.getMinutes())
				.setSecond(props.value.getSeconds())
		}
	}, [props.value])

	return <canvas ref={canvas}></canvas>
}

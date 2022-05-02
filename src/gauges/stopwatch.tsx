import React, { useEffect, useRef } from "react"
import { StopwatchParams, Stopwatch } from "steelseries"
import { useUpdateGaugeProp } from "../hooks/gauge-update"

interface Props extends StopwatchParams {
	size: number

	startBtn?: string
	lapBtn?: string
	stopBtn?: string
	resetBtn?: string

	onLap?: (value: string) => void
	onStop?: (value: string) => void
}

export function StopwatchGauge (props: Props) {
	const canvas = useRef<HTMLCanvasElement>(null)
	const gauge = useRef<Stopwatch>(null)

	const startBtnRef = useRef<HTMLElement>(null)
	const lapBtnRef = useRef<HTMLElement>(null)
	const stopBtnRef = useRef<HTMLElement>(null)
	const resetBtnRef = useRef<HTMLElement>(null)

	const lap = useRef(false)

	// Init gauge
	useEffect(() => {
		if (canvas.current) {
			gauge.current = new Stopwatch(canvas.current, {
				size: props.size,

				frameDesign: props.frameDesign,
				frameVisible: props.frameVisible,
				backgroundColor: props.backgroundColor,
				backgroundVisible: props.backgroundVisible,
				foregroundType: props.foregroundType,
				foregroundVisible: props.foregroundVisible,

				pointerColor: props.pointerColor,
    		customLayer: props.customLayer
			})
		}
	}, [])

	useEffect(() => {
		if (gauge.current) {
			startBtnRef.current = document.getElementById(props.startBtn || "")
			lapBtnRef.current = document.getElementById(props.lapBtn || "")
			stopBtnRef.current = document.getElementById(props.stopBtn || "")
			resetBtnRef.current = document.getElementById(props.resetBtn || "")

			startBtnRef.current.addEventListener("click", () => gauge.current.start())

			lapBtnRef.current.addEventListener("click", () => {
				gauge.current.lap()
				if (gauge.current.isRunning() && !lap.current) {
					lap.current = true
					props.onLap && props.onLap(gauge.current.getMeasuredTime())
				} else if (lap.current) {
					lap.current = false
				}
			})

			stopBtnRef.current.addEventListener("click", () => {
				if (gauge.current.isRunning()) {
					gauge.current.stop()
					props.onStop && props.onStop(gauge.current.getMeasuredTime())
				}
			})

			resetBtnRef.current.addEventListener("click", () => gauge.current.reset())
		}
	}, [])

	// Update gauge
	useUpdateGaugeProp(gauge, "setFrameDesign", props.frameDesign)
	useUpdateGaugeProp(gauge, "setBackgroundColor", props.backgroundColor)
	useUpdateGaugeProp(gauge, "setForegroundType", props.foregroundType)

	useUpdateGaugeProp(gauge, "setPointerColor", props.pointerColor)

	return <canvas ref={canvas}></canvas>
}

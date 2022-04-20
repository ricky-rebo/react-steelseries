import React from "react";
import { Stopwatch as ssStopwatch, StopwatchParams } from "steelseries";


interface Props extends StopwatchParams {
	size: number;

	run?: boolean;
	onStop?: (value: number) => void;

	lap?: boolean;
	onLap?: (value: number) => void;

	reset?: boolean;
}

// When i'll undestand how wrap it up in React, i'll finish it :)
export class Stopwatch extends React.Component<Props> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssStopwatch;

	constructor(props: Props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	render() {
		return null;
	}
} 
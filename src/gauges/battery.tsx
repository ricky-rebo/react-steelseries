import React from "react";
import { Battery as ssBattery, BatteryParams } from "steelseries";


interface Props extends BatteryParams {
	size: number;
	value?: number;
}


export class Battery extends React.Component<Props, {}> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssBattery;

	constructor(props: Props) {
		super(props);

		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		if(this.canvasRef.current) {
			this.gauge = init_gauge(this.canvasRef.current, this.props);
		}
	}

	componentDidUpdate(prev: Props) {
		if(this.canvasRef.current) {
			if(this.props.size !== prev.size) {
				this.gauge = init_gauge(this.canvasRef.current, this.props);
			}
			else if(this.props.value && this.props.value !== prev.value) {
				this.gauge.setValue(this.props.value);
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef} width={this.props.size} height={this.props.size}></canvas>
	}
}


function init_gauge(canvas: HTMLCanvasElement, params: Props) {
	const gauge = new ssBattery(canvas, { size: params.size });
	
	if(params.value)
		gauge.setValue(params.value)
	
	return gauge;
}

import React from "react";
import { Battery as ssBattery, BatteryParams } from "steelseries";
import { updateIfChanged } from "../tools";


interface Props extends BatteryParams {
	size: number;
}


export class Battery extends React.Component<Props> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssBattery;

	constructor(props: Props) {
		super(props);

		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		if(this.canvasRef.current) {
			this.gauge = new ssBattery(this.canvasRef.current, { size: this.props.size });
	
			if(this.props.value) { this.gauge.setValue(this.props.value); }
		}
	}

	componentDidUpdate(prev: Props) {
		if(this.canvasRef.current) {
			if(this.props.size !== prev.size) {
				this.componentDidMount();
				return
			}
			
			updateIfChanged(this.props.value, prev.value, this.gauge.setValue.bind(this.gauge));
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}

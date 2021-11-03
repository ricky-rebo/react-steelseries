import React from "react";
import { Trafficlight as ssTrafficLight, TrafficlightParams } from "steelseries";
import { updateIfChanged } from "../tools";


interface Props extends TrafficlightParams {
	width: number;
	height: number;

	red?: boolean;
	yellow?: boolean;
	green?: boolean;
}

// When i'll undestand how it's works, i'll finish the gauge :)
export class Trafficlight extends React.Component<Props> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssTrafficLight;

	constructor(props: Props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		if(this.canvasRef.current) {
			this.gauge = new ssTrafficLight(this.canvasRef.current, {
				width: this.props.width,
				height: this.props.height
			});

			if(this.props.red) {
				this.gauge.setRedOn(this.props.red);
			}

			if(this.props.yellow) {
				this.gauge.setYellowOn(this.props.yellow);
			}

			if(this.props.green) {
				this.gauge.setGreenOn(this.props.green);
			}
		}
	}

	gaugeShouldRepaint(prev: Props) {
		return (this.props.width !== prev.width) || (this.props.height !== prev.height);
	}

	componentDidUpdate(prev: Props) {
		if(this.gaugeShouldRepaint(prev)) {
			this.componentDidMount();
		}
		else {
			const { props, gauge } = this;

			updateIfChanged(props.red, prev.red, gauge.setRedOn.bind(gauge));
			updateIfChanged(props.yellow, prev.yellow, gauge.setYellowOn.bind(gauge));
			updateIfChanged(props.green, prev.green, gauge.setGreenOn.bind(gauge));
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>;
	}
}

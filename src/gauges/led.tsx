import React from "react";
import { Led as ssLed, LedParams } from "steelseries";


interface Props extends LedParams {
	size: number;
	on?: boolean;
	blink?: boolean;
}


export class Led extends React.Component<Props, {}> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssLed;

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
			const { props } = this;

			if(props.size !== prev.size) {
				this.gauge = init_gauge(this.canvasRef.current, this.props);
			}
			else {
				if(props.ledColor && props.ledColor !== prev.ledColor) {
					this.gauge.setLedColor(props.ledColor);
				}

				if(props.on !== undefined && props.on !== prev.on) {
					this.gauge.setLedOnOff(props.on);
				}

				if(props.blink !== undefined && props.blink !== prev.blink) {
					this.gauge.blink(props.blink);
				}
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef} width={this.props.size} height={this.props.size}></canvas>
	}
}


function init_gauge(canvas: HTMLCanvasElement, params: Props) {
	const gauge = new ssLed(canvas, {
		size: params.size,
		ledColor: params.ledColor
	});

	if(params.on)
		gauge.setLedOnOff(params.on);

	if(params.blink)
		gauge.blink(params.blink ? params.blink : false);

	return gauge;
}
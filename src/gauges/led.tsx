import React from "react";
import { Led as ssLed, LedParams } from "steelseries";
import { updateIfChanged } from "../tools";


interface Props extends LedParams {
	size: number;
	on?: boolean;
	blink?: boolean;
}


export class Led extends React.Component<Props> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssLed;

	constructor(props: Props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		if(this.canvasRef.current) {
			this.gauge = new ssLed(this.canvasRef.current, {
				size: this.props.size,
				ledColor: this.props.ledColor
			});
		
			if(this.props.on !== undefined) {
				this.gauge.setLedOnOff(this.props.on);
			}
		
			if(this.props.blink !== undefined) {
				this.gauge.blink(this.props.blink);
			}
		}
	}

	componentDidUpdate(prev: Props) {
		if(this.canvasRef.current) {
			const { props } = this;

			if(props.size !== prev.size) {
				this.componentDidMount();
				return;
			}

			// if(definedAndChanged(props.ledColor, prev.ledColor)) {
			// 	this.gauge.setLedColor(props.ledColor);
			// }
			updateIfChanged(props.ledColor, prev.ledColor, this.gauge.setLedColor.bind(this.gauge));

			// if(definedAndChanged(props.on, prev.on)) {
			// 	this.gauge.setLedOnOff(props.on);
			// }
			updateIfChanged(props.on, prev.on, this.gauge.setLedOnOff.bind(this.gauge));

			// if(definedAndChanged(props.blink, prev.blink)) {
			// 	this.gauge.blink(props.blink);
			// }
			updateIfChanged(props.blink, prev.blink, this.gauge.blink.bind(this.gauge));
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}

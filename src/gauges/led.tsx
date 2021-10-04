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

	gaugeShouldRepaint(prev: Props) {
		return (this.props.size !== prev.size);
	}

	componentDidUpdate(prev: Props) {
		if(this.canvasRef.current) {
			if(this.gaugeShouldRepaint(prev)) {
				this.componentDidMount();
			}
			else {
				const { props, gauge } = this;

				updateIfChanged(props.ledColor, prev.ledColor, gauge.setLedColor.bind(gauge));

				updateIfChanged(props.on, prev.on, gauge.setLedOnOff.bind(gauge));
				updateIfChanged(props.blink, prev.blink, gauge.blink.bind(gauge));
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}

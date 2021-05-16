import React from "react";
import { Lightbulb as ssLightbulb, LightbulbParams } from "steelseries";


interface Props extends Partial<LightbulbParams> {
	width: number;
	height: number;
	on?: boolean;
	alpha?: number;
}


export class Lightbulb extends React.Component<Props, {}> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssLightbulb;

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

			if(props.width !== prev.width || props.height !== prev.height) {
				this.gauge = init_gauge(this.canvasRef.current, props);
			}
			else {
				if(props.on !== undefined && props.on !== prev.on)
					this.gauge.setOn(props.on);

				if(props.alpha && props.alpha !== prev.alpha)
					this.gauge.setAlpha(props.alpha);

				if(props.glowColor && props.glowColor !== prev.glowColor)
					this.gauge.setGlowColor(props.glowColor);
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef} width={this.props.width} height={this.props.height}></canvas>
	}
}


function init_gauge(canvas: HTMLCanvasElement, params: Props) {
	const gauge = new ssLightbulb(canvas, {
		width: params.width,
		height: params.height,

		// Should be optional, but it's not...
		// Default value taken from 'steelseries' original library source
		glowColor: params.glowColor === undefined ? '#ffff00' : params.glowColor
	});
	
	if(params.on)
		gauge.setOn(params.on);

	if(params.alpha)
		gauge.setAlpha(params.alpha);

	return gauge;
}
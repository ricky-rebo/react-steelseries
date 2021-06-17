import React from "react";
import { Lightbulb as ssLightbulb, LightbulbParams } from "steelseries";
import { definedAndChanged } from "../tools";


interface Props extends Partial<LightbulbParams> {
	width: number;
	height: number;
	on?: boolean;
	alpha?: number;
}


export class Lightbulb extends React.Component<Props> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssLightbulb;

	constructor(props: Props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		if(this.canvasRef.current) {
			this.gauge = new ssLightbulb(this.canvasRef.current, {
				width: this.props.width,
				height: this.props.height,
		
				// Should be optional, but it's not...
				// Default value taken from 'steelseries' original library source
				glowColor: this.props.glowColor === undefined ? '#ffff00' : this.props.glowColor
			});
			
			if(this.props.on !== undefined) {
				this.gauge.setOn(this.props.on);
			}
		
			if(this.props.alpha !== undefined) {
				this.gauge.setAlpha(this.props.alpha);
			}
		}
	}

	componentDidUpdate(prev: Props) {
		if(this.canvasRef.current) {
			const { props } = this;

			if(props.width !== prev.width || props.height !== prev.height) {
				this.componentDidMount();
				return;
			}

			if(definedAndChanged(props.on, prev.on)) {
				this.gauge.setOn(props.on);
			}

			if(definedAndChanged(props.alpha, prev.alpha)) {
				this.gauge.setAlpha(props.alpha);
			}

			if(definedAndChanged(props.glowColor, prev.glowColor)) {
				this.gauge.setGlowColor(props.glowColor);
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}

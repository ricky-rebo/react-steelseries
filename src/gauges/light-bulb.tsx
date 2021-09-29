import React from "react";
import { Lightbulb as ssLightbulb, LightbulbParams } from "steelseries";
import { updateIfChanged } from "../tools";


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
				// BUG fix in @types/steelseries
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

			// if(definedAndChanged(props.on, prev.on)) {
			// 	this.gauge.setOn(props.on);
			// }
			updateIfChanged(props.on, prev.on, this.gauge.setOn.bind(this.gauge));

			// if(definedAndChanged(props.alpha, prev.alpha)) {
			// 	this.gauge.setAlpha(props.alpha);
			// }
			updateIfChanged(props.alpha, prev.alpha, this.gauge.setAlpha.bind(this.gauge));

			// if(definedAndChanged(props.glowColor, prev.glowColor)) {
			// 	this.gauge.setGlowColor(props.glowColor);
			// }
			updateIfChanged(props.glowColor, prev.glowColor, this.gauge.setGlowColor.bind(this.gauge));
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}

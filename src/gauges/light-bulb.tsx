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
			
			if(this.props.on !== undefined) { this.gauge.setOn(this.props.on); }
		
			if(this.props.alpha !== undefined) { this.gauge.setAlpha(this.props.alpha); }
		}
	}

	gaugeShouldRepaint(prev: Props) {
		return (this.props.width !== prev.width) 
			|| (this.props.height !== prev.height);
	}

	componentDidUpdate(prev: Props) {
		if(this.canvasRef.current) {
			if(this.gaugeShouldRepaint(prev)) {
				this.componentDidMount();
			}
			else {
				const { props } = this;

				updateIfChanged(props.glowColor, prev.glowColor, this.gauge.setGlowColor.bind(this.gauge));

				updateIfChanged(props.on, prev.on, this.gauge.setOn.bind(this.gauge));
				updateIfChanged(props.alpha, prev.alpha, this.gauge.setAlpha.bind(this.gauge));
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}

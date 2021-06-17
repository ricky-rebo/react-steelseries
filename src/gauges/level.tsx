import React from "react";
import { Level as ssLevel, LevelParams } from "steelseries";
import { definedAndChanged } from "../tools";


interface Props extends LevelParams {
	size: number;
	value?: number;
	animate?: boolean;
	animationCallback?: ()=> void;
}


export class Level extends React.Component<Props> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssLevel;

	constructor(props: Props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		if(this.canvasRef.current) {
			this.gauge = new ssLevel(this.canvasRef.current, {
				size: this.props.size,
				decimalsVisible: this.props.decimalsVisible,
				textOrientationFixed: this.props.textOrientationFixed,
				pointerColor: this.props.pointerColor,
				rotateFace: this.props.rotateFace
			});
		
			if(this.props.value !== undefined) {
				this.props.animate
				? this.gauge.setValueAnimated(this.props.value, this.props.animationCallback)
				: this.gauge.setValue(this.props.value);
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

			if(definedAndChanged(props.frameDesign, prev.frameDesign)) {
				this.gauge.setFrameDesign(props.frameDesign);
			}

			if(definedAndChanged(props.backgroundColor, prev.backgroundColor)) {
				this.gauge.setBackgroundColor(props.backgroundColor);
			}

			if(definedAndChanged(props.foregroundType, prev.foregroundType)) {
				this.gauge.setForegroundType(props.foregroundType);
			}

			if(definedAndChanged(props.pointerColor, prev.pointerColor)) {
				this.gauge.setPointerColor(props.pointerColor);
			}

			if(definedAndChanged(props.value, prev.value)) {
				props.animate
					? this.gauge.setValueAnimated(props.value, props.animationCallback)
					: this.gauge.setValue(props.value);
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}

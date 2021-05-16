import React from "react";
import { Level as ssLevel, LevelParams } from "steelseries";


interface Props extends LevelParams {
	size: number;
	value?: number;
	animate?: boolean;
}


export class Level extends React.Component<Props, {}> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssLevel;

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
				this.gauge = init_gauge(this.canvasRef.current, props);
			}
			else {
				if(props.frameDesign && props.frameDesign !== prev.frameDesign) {
					this.gauge.setFrameDesign(props.frameDesign);
				}

				if(props.backgroundColor && props.backgroundColor !== prev.backgroundColor) {
					this.gauge.setBackgroundColor(props.backgroundColor);
				}

				if(props.foregroundType && props.foregroundType !== prev.foregroundType) {
					this.gauge.setForegroundType(props.foregroundType);
				}

				if(props.pointerColor && props.pointerColor !== prev.pointerColor) {
					this.gauge.setPointerColor(props.pointerColor);
				}

				if(props.value !== undefined && props.value !== prev.value) {
					props.animate
						? this.gauge.setValueAnimated(props.value)
						: this.gauge.setValue(props.value);
				}
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef} width={this.props.size} height={this.props.size} />
	}
}


function init_gauge(canvas: HTMLCanvasElement, params: Props) {
	const gauge = new ssLevel(canvas, {
		size: params.size,
		decimalsVisible: params.decimalsVisible,
		textOrientationFixed: params.textOrientationFixed,
		pointerColor: params.pointerColor,
		rotateFace: params.rotateFace
	});

	if(params.value !== undefined) {
		params.animate
			? gauge.setValueAnimated(params.value)
			: gauge.setValue(params.value);
	}

	return gauge;
}

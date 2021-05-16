import React from "react";
import { Horizon as ssHorizon, HorizonParams } from "steelseries";

interface Props extends HorizonParams {
	size: number;
	roll?: number;
	pitch?: number;
	pitchOffset?: number;
	animate?: boolean;
	rollAnimationCallback?: () => void;
	pitchAnimationCallback?: () => void;
}

export class Horizon extends React.Component<Props, {}> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssHorizon;

	constructor(props: Props) {
		super(props);

		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		if(this.canvasRef.current) {
			this.gauge = init_gauge(this.canvasRef.current, this.props);
		}
	}

	componentDidUpdate (prev: Props) {
		if(this.canvasRef.current) {
			const { props } = this;

			if(props.size !== prev.size)
				this.gauge = init_gauge(this.canvasRef.current, this.props);
			else {
				if(props.frameDesign && props.frameDesign !== prev.frameDesign)
					this.gauge.setFrameDesign(props.frameDesign);

				if(props.foregroundType && props.foregroundType !== prev.foregroundType)
					this.gauge.setForegroundType(props.foregroundType);

				if(props.pitchOffset !== undefined && props.pitchOffset !== prev.pitchOffset)
					this.gauge.setPitchOffset(props.pitchOffset);

				if(props.pitch !== undefined && props.pitch !== prev.pitch) {
					if(props.animate)
						this.gauge.setPitchAnimated(props.pitch, props.pitchAnimationCallback);
					else
						this.gauge.setPitch(props.pitch);
				}

				if(props.roll !== undefined && props.roll !== prev.roll) {
					if(props.animate)
						this.gauge.setRollAnimated(props.roll, props.rollAnimationCallback);
					else
						this.gauge.setRoll(props.roll);
				}
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef} width={this.props.size} height={this.props.size}></canvas>
	}
}

function init_gauge(canvas: HTMLCanvasElement, params: Props) {
	const gauge = new ssHorizon(canvas, {
		size: params.size,
		pointerColor: params.pointerColor,
		frameDesign: params.frameDesign,
		frameVisible: params.frameVisible,
		foregroundType: params.foregroundType,
		foregroundVisible: params.foregroundVisible
	});

	if(params.pitchOffset !== undefined)
		gauge.setPitchOffset(params.pitchOffset);

	if(params.roll !== undefined) {
		if(params.animate)
			gauge.setRollAnimated(params.roll, params.rollAnimationCallback);
		else
			gauge.setRoll(params.roll);
	}

	if(params.pitch !== undefined) {
		if(params.animate)
			gauge.setPitchAnimated(params.pitch, params.pitchAnimationCallback);
		else
			gauge.setPitch(params.pitch);
	}

	return gauge;
}
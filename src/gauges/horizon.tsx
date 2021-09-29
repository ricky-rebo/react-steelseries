import React from "react";
import { Horizon as ssHorizon, HorizonParams } from "steelseries";
import { updateIfChanged } from "../tools";

interface Props extends HorizonParams {
	size: number;
	roll?: number;
	pitch?: number;
	pitchOffset?: number;
	animate?: boolean;
	rollAnimationCallback?: () => void;
	pitchAnimationCallback?: () => void;
}

export class Horizon extends React.Component<Props> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssHorizon;

	constructor(props: Props) {
		super(props);

		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		if(this.canvasRef.current) {
			this.gauge = new ssHorizon(this.canvasRef.current, {
				size: this.props.size,
				pointerColor: this.props.pointerColor,
				frameDesign: this.props.frameDesign,
				frameVisible: this.props.frameVisible,
				foregroundType: this.props.foregroundType,
				foregroundVisible: this.props.foregroundVisible
			});
		
			if(this.props.pitchOffset !== undefined) {
				this.gauge.setPitchOffset(this.props.pitchOffset);
			}
		
			if(this.props.roll !== undefined) {
				this.props.animate
					? this.gauge.setRollAnimated(this.props.roll, this.props.rollAnimationCallback)
					: this.gauge.setRoll(this.props.roll);
			}
		
			if(this.props.pitch !== undefined) {
				this.props.animate
					? this.gauge.setPitchAnimated(this.props.pitch, this.props.pitchAnimationCallback)
					: this.gauge.setPitch(this.props.pitch);
			}
		}
	}

	componentDidUpdate (prev: Props) {
		if(this.canvasRef.current) {
			const { props } = this;

			if(props.size !== prev.size) {
				this.componentDidMount();
				return;
			}

			updateIfChanged(props.frameDesign, prev.frameDesign, this.gauge.setFrameDesign.bind(this.gauge));
			updateIfChanged(props.foregroundType, prev.foregroundType, this.gauge.setForegroundType.bind(this.gauge));

			updateIfChanged(props.pitchOffset, prev.pitchOffset, this.gauge.setPitchOffset.bind(this.gauge));
			updateIfChanged(props.pitch, prev.pitch, () => {
				props.animate
					? this.gauge.setPitchAnimated(props.pitch, props.pitchAnimationCallback)
					: this.gauge.setPitch(props.pitch);
			});
			updateIfChanged(props.roll, prev.roll, () => {
				props.animate
					? this.gauge.setRollAnimated(props.roll, props.rollAnimationCallback)
					: this.gauge.setRoll(props.roll);
			});
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}

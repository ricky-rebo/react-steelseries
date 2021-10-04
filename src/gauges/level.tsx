import React from "react";
import { Level as ssLevel, LevelParams } from "steelseries";
import { definedAndChanged, updateIfChanged } from "../tools";


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
				frameDesign: this.props.frameDesign,
				frameVisible: this.props.frameVisible,
				backgroundColor: this.props.backgroundColor,
				backgroundVisible: this.props.backgroundVisible,
				foregroundType: this.props.foregroundType,
				foregroundVisible: this.props.foregroundVisible,
				pointerColor: this.props.pointerColor,
				decimalsVisible: this.props.decimalsVisible,
				textOrientationFixed: this.props.textOrientationFixed,
				rotateFace: this.props.rotateFace,
			});
		
			if(this.props.value !== undefined) {
				this.props.animate
				? this.gauge.setValueAnimated(this.props.value, this.props.animationCallback)
				: this.gauge.setValue(this.props.value);
			}
		}
	}

	gaugeShouldRepaint(prev: Props) {
		return (this.props.size !== prev.size)
			|| definedAndChanged(this.props.frameVisible, prev.frameVisible)
			|| definedAndChanged(this.props.backgroundVisible, prev.backgroundVisible)
			|| definedAndChanged(this.props.foregroundVisible, prev.foregroundVisible)
			|| definedAndChanged(this.props.decimalsVisible, prev.decimalsVisible)
			|| definedAndChanged(this.props.textOrientationFixed, prev.textOrientationFixed)
			|| definedAndChanged(this.props.rotateFace, prev.rotateFace);
	}

	componentDidUpdate(prev: Props) {
		if(this.canvasRef.current) {
			if(this.gaugeShouldRepaint(prev)) {
				this.componentDidMount();
			}
			else {
				const { props } = this;

				updateIfChanged(props.frameDesign, prev.frameDesign, this.gauge.setFrameDesign.bind(this.gauge));
				updateIfChanged(props.backgroundColor, prev.backgroundColor, this.gauge.setBackgroundColor.bind(this.gauge));
				updateIfChanged(props.foregroundType, prev.foregroundType, this.gauge.setForegroundType.bind(this.gauge));
				updateIfChanged(props.pointerColor, prev.pointerColor, this.gauge.setPointerColor.bind(this.gauge));

				updateIfChanged(props.value, prev.value, () => {
					props.animate
						? this.gauge.setValueAnimated(props.value, props.animationCallback)
						: this.gauge.setValue(props.value);
				});
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}

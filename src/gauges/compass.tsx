import React from "react";
import { Compass as ssCompass, CompassParams } from "steelseries";
import { definedAndChanged } from "../tools";


interface Props extends CompassParams {
	size: number;
	value?: number;
	animate?: boolean;
	animationCallback?: ()=> void;
}


export class Compass extends React.Component<Props> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssCompass;

	constructor(props: Props) {
		super(props);

		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		if(this.canvasRef.current) {
			this.gauge = new ssCompass(this.canvasRef.current, {
				frameDesign: this.props.frameDesign,
				frameVisible: this.props.frameVisible,
				backgroundColor: this.props.backgroundColor,
				backgroundVisible: this.props.backgroundVisible,
				foregroundType: this.props.foregroundType,
				foregroundVisible: this.props.foregroundVisible,
				knobType: this.props.knobType,
				knobStyle: this.props.knobStyle,
				pointerType: this.props.pointerType,
				pointerColor: this.props.pointerColor,
				size: this.props.size,
				pointSymbols: this.props.pointSymbols,
				pointSymbolsVisible: this.props.pointSymbolsVisible,
				degreeScale: this.props.degreeScale,
				roseVisible: this.props.roseVisible,
				rotateFace: this.props.rotateFace,
				customLayer: this.props.customLayer
			});
		
			if(this.props.value) {
				this.props.animate
					? this.gauge.setValueAnimated(this.props.value, this.props.animationCallback)
					: this.gauge.setValue(this.props.value);
			}
		}
	}

	componentDidUpdate(prev: Props) {
		if(this.canvasRef.current) {
			if(this.props.size !== prev.size) {
				this.componentDidMount();
				return;
			}
			
			const { props } = this;
			
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

			if(definedAndChanged(props.pointerType, prev.pointerType)) {
				this.gauge.setPointerType(props.pointerType);
			}

			if(definedAndChanged(props.pointSymbols, prev.pointSymbols)) {
				this.gauge.setPointSymbols(props.pointSymbols);
			}
			
			if(definedAndChanged(props.value, prev.value)) {
				this.props.animate
					? this.gauge.setValueAnimated(this.props.value, this.props.animationCallback)
					: this.gauge.setValue(this.props.value);
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}

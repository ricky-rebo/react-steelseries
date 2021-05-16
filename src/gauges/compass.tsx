import React from "react";
import { Compass as ssCompass, CompassParams } from "steelseries";


interface Props extends CompassParams {
	size: number;
	value?: number;
	animate?: boolean;
	animationCallback?: ()=> void;
}


export class Compass extends React.Component<Props, {}> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssCompass;

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
			const {props} = this;
			if(props.size !== prev.size)
				this.gauge = init_gauge(this.canvasRef.current, props);
			else {
				if(props.frameDesign && props.frameDesign !== prev.frameDesign)
					this.gauge.setFrameDesign(props.frameDesign);

				if(props.backgroundColor && props.backgroundColor !== prev.backgroundColor)
					this.gauge.setBackgroundColor(props.backgroundColor);

				if(props.foregroundType && props.foregroundType !== prev.foregroundType)
					this.gauge.setForegroundType(props.foregroundType);

				if(props.pointerColor && props.pointerColor !== prev.pointerColor)
					this.gauge.setPointerColor(props.pointerColor);

				if(props.pointerType && props.pointerType !== prev.pointerType)
					this.gauge.setPointerType(props.pointerType);

				if(props.pointSymbols !== undefined && props.pointSymbols !== prev.pointSymbols)
					this.gauge.setPointSymbols(props.pointSymbols);
				
				if(props.value && props.value !== prev.value) {
					if(props.animate)
						this.gauge.setValueAnimated(props.value, props.animationCallback);
					else
						this.gauge.setValue(props.value);
				}
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef} width={this.props.size} height={this.props.size}></canvas>
	}
}


function init_gauge(canvas: HTMLCanvasElement, params: Props) {
	const gauge = new ssCompass(canvas, {
		frameDesign: params.frameDesign,
		frameVisible: params.frameVisible,
		backgroundColor: params.backgroundColor,
		backgroundVisible: params.backgroundVisible,
		foregroundType: params.foregroundType,
		foregroundVisible: params.foregroundVisible,
		knobType: params.knobType,
		knobStyle: params.knobStyle,
		pointerType: params.pointerType,
		pointerColor: params.pointerColor,
		size: params.size,
		pointSymbols: params.pointSymbols,
		pointSymbolsVisible: params.pointSymbolsVisible,
		degreeScale: params.degreeScale,
		roseVisible: params.roseVisible,
		rotateFace: params.rotateFace,
		customLayer: params.customLayer
	});

	if(params.value) {
		if(params.animate)
			gauge.setValueAnimated(params.value, params.animationCallback);
		else
			gauge.setValue(params.value);
	}

	return gauge;
}
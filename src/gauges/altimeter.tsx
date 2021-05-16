import React, { Component } from "react";
import { Altimeter as ssAltimeter, AltimeterParams } from "steelseries";


interface Props extends AltimeterParams {
	size: number;

	value?: number;
	animate?: boolean;
	animationCallback?: ()=> void;

	// Missing in AltimeterParams!
	titleString?: string;
	unitString?: string;
	resetValueOnUnitChange?: boolean;
}


export class Altimeter extends Component<Props, {}> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssAltimeter;

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
			if(this.props.size !== prev.size) {
				this.gauge = init_gauge(this.canvasRef.current, this.props);
			}
			else {
				if(this.props.frameDesign && this.props.frameDesign !== prev.frameDesign)
					this.gauge.setFrameDesign(this.props.frameDesign);
				
				if(this.props.backgroundColor && this.props.backgroundColor !== prev.backgroundColor)
					this.gauge.setBackgroundColor(this.props.backgroundColor);
				
				if(this.props.foregroundType && this.props.foregroundType !== prev.foregroundType)
					this.gauge.setForegroundType(this.props.foregroundType);
				
				if(this.props.lcdColor && this.props.lcdColor !== prev.lcdColor)
					this.gauge.setLcdColor(this.props.lcdColor);
				
				if(this.props.titleString !== undefined && this.props.titleString !== prev.titleString)
					this.gauge.setTitleString(this.props.titleString);
				
				if(this.props.unitString !== undefined && this.props.unitString !== prev.unitString) {
					this.gauge.setUnitString(this.props.unitString);

					if(this.props.resetValueOnUnitChange)
						this.gauge.setValue(0);
				}

				if(this.props.value !== undefined && this.props.value !== prev.value) {
					if(this.props.animate)
						this.gauge.setValueAnimated(this.props.value, this.props.animationCallback);
					else
						this.gauge.setValue(this.props.value);
				}
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef} width={this.props.size} height={this.props.size}></canvas>
	}
}

function init_gauge(canvas: HTMLCanvasElement, params: Props): ssAltimeter {
	const gauge = new ssAltimeter(canvas, {
		frameDesign: params.frameDesign,
		frameVisible: params.frameVisible,
		backgroundColor: params.backgroundColor,
		backgroundVisible: params.backgroundVisible,
		foregroundType: params.foregroundType,
		foregroundVisible: params.foregroundVisible,
		knobType: params.knobType,
		knobStyle: params.knobStyle,
		lcdColor: params.lcdColor,
		digitalFont: params.digitalFont,
		lcdVisible: params.lcdVisible,
		size: params.size,
		unitAltPos: params.unitAltPos,
		customLayer: params.customLayer
	});

	if(params.titleString)
		gauge.setTitleString(params.titleString);

	if(params.unitString)
		gauge.setUnitString(params.unitString);

	gauge.setValue(0);

	if(params.value) {
		if(params.animate) 
			gauge.setValueAnimated(params.value, params.animationCallback);
		else
			gauge.setValue(params.value);
	}

	return gauge;
}
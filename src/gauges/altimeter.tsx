import React from "react";
import { Altimeter as ssAltimeter, AltimeterParams } from "steelseries";
import { definedAndChanged } from "../tools";


interface Props extends AltimeterParams {
	size: number;

	value?: number;
	animate?: boolean;
	animationCallback?: ()=> void;

	// Missing in AltimeterParams!
	// BUG fix in @types/steelseries
	titleString?: string;
	unitString?: string;

	resetValueOnUnitChange?: boolean;
}


export class Altimeter extends React.Component<Props> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssAltimeter;

	constructor(props: Props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		if(this.canvasRef.current) {
			this.gauge = new ssAltimeter(this.canvasRef.current, {
				frameDesign: this.props.frameDesign,
				frameVisible: this.props.frameVisible,
				backgroundColor: this.props.backgroundColor,
				backgroundVisible: this.props.backgroundVisible,
				foregroundType: this.props.foregroundType,
				foregroundVisible: this.props.foregroundVisible,
				knobType: this.props.knobType,
				knobStyle: this.props.knobStyle,
				lcdColor: this.props.lcdColor,
				digitalFont: this.props.digitalFont,
				lcdVisible: this.props.lcdVisible,
				size: this.props.size,
				unitAltPos: this.props.unitAltPos,
				customLayer: this.props.customLayer
			});

			if(this.props.titleString) {
				this.gauge.setTitleString(this.props.titleString);
			}

			if(this.props.unitString) {
				this.gauge.setUnitString(this.props.unitString);
			}

			if(this.props.value) {
				this.props.animate
					? this.gauge.setValueAnimated(this.props.value, this.props.animationCallback)
					: this.gauge.setValue(this.props.value);
			}
		}
	}

	componentDidUpdate(prev: Props) {
		if(this.props.size !== prev.size) {
			this.componentDidMount();
			return;
		}

		const { props } = this;

		if(definedAndChanged(props.frameDesign, prev.frameDesign)) {
			this.gauge.setFrameDesign(this.props.frameDesign);
		}
		// updateIfChanged(props.frameDesign, prev.frameDesign, this.gauge.setFrameDesign)

		if(definedAndChanged(props.backgroundColor, prev.backgroundColor)) {
			this.gauge.setBackgroundColor(this.props.backgroundColor);
		}

		if(definedAndChanged(props.foregroundType, prev.foregroundType)) {
			this.gauge.setForegroundType(this.props.foregroundType);
		}

		if(definedAndChanged(props.lcdColor, prev.lcdColor)) {
			this.gauge.setLcdColor(this.props.lcdColor);
		}

		if(definedAndChanged(props.titleString, prev.titleString)) {
			this.gauge.setTitleString(this.props.titleString);
		}

		if(definedAndChanged(props.unitString, prev.unitString)) {
			this.gauge.setUnitString(this.props.unitString);

			if(props.resetValueOnUnitChange) {
				this.gauge.setValue(0);
			}
		}

		if(definedAndChanged(props.value, prev.value)) {
			props.animate
				? this.gauge.setValueAnimated(this.props.value, this.props.animationCallback)
				: this.gauge.setValue(this.props.value);
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}

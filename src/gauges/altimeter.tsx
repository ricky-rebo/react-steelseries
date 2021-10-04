import React from "react";
import { Altimeter as ssAltimeter, AltimeterParams } from "steelseries";
import { definedAndChanged, updateIfChanged } from "../tools";


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

			if(this.props.titleString) { this.gauge.setTitleString(this.props.titleString); }

			if(this.props.unitString) { this.gauge.setUnitString(this.props.unitString); }

			if(this.props.value) {
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
			|| definedAndChanged(this.props.knobType, prev.knobType)
			|| definedAndChanged(this.props.knobStyle, prev.knobStyle)
			|| definedAndChanged(this.props.digitalFont, prev.digitalFont)
			|| definedAndChanged(this.props.lcdVisible, prev.lcdVisible)
			|| definedAndChanged(this.props.unitAltPos, prev.unitAltPos)
			|| definedAndChanged(this.props.customLayer, prev.customLayer);
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
				updateIfChanged(props.lcdColor, prev.lcdColor, this.gauge.setLcdColor.bind(this.gauge));
				
				updateIfChanged(props.titleString, prev.titleString, this.gauge.setTitleString.bind(this.gauge));
				if(updateIfChanged(props.unitString, prev.unitString, this.gauge.setUnitString.bind(this.gauge)) && props.resetValueOnUnitChange) {
					this.gauge.setValue(0);
				}

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

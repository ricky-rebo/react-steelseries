import React from "react";
import { Compass as ssCompass, CompassParams } from "steelseries";
import { definedAndChanged, updateIfChanged } from "../tools";


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

	gaugeShouldRepaint(prev: Props) {
		return (this.props.size !== prev.size)
			|| definedAndChanged(this.props.frameVisible, prev.frameVisible)
			|| definedAndChanged(this.props.backgroundVisible, prev.backgroundVisible)
			|| definedAndChanged(this.props.foregroundVisible, prev.foregroundVisible)
			|| definedAndChanged(this.props.knobType, prev.knobType)
			|| definedAndChanged(this.props.knobStyle, prev.knobStyle)
			|| definedAndChanged(this.props.pointSymbolsVisible, prev.pointSymbolsVisible)
			|| definedAndChanged(this.props.degreeScale, prev.degreeScale)
			|| definedAndChanged(this.props.roseVisible, prev.roseVisible)
			|| definedAndChanged(this.props.rotateFace, prev.rotateFace)
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
				updateIfChanged(props.pointerColor, prev.pointerColor, this.gauge.setPointerColor.bind(this.gauge));
				updateIfChanged(props.pointerType, prev.pointerType, this.gauge.setPointerType.bind(this.gauge));
				updateIfChanged(props.pointSymbols, prev.pointSymbols, this.gauge.setPointSymbols.bind(this.gauge));
				
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

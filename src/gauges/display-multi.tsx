import React from "react";
import { DisplayMulti as ssDisplayMulti, DisplayMultiParams } from "steelseries";
import { updateIfChanged } from "../tools";


interface Props extends Omit<DisplayMultiParams, "headerStringVisible"|"detailStringVisible"|"unitStringVisible"> {
	width: number;
	height: number;
}


export class DisplayMulti extends React.Component<Props> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssDisplayMulti;

	constructor(props: Props) {
		super(props);

		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		if(this.canvasRef.current) {
			this.gauge = new ssDisplayMulti(this.canvasRef.current, {
				...this.props,
				headerStringVisible: (this.props.headerString !== undefined),
				detailStringVisible: (this.props.detailString !== undefined),
				unitStringVisible: (this.props.unitString !== undefined),
				linkAltValue: (this.props.linkAltValue === undefined) ? false : this.props.linkAltValue
			});
			
			if(this.props.value)
				this.gauge.setValue(this.props.value)
		}
	}

	componentDidUpdate(prev: Props) {
		if(this.canvasRef.current) {
			if(this.props.width !== prev.width || this.props.height !== prev.height) {
				this.componentDidMount();
				return;
			}

			const { props } = this;

			// if(definedAndChanged(props.lcdColor, prev.lcdColor))
			// 	this.gauge.setLcdColor(props.lcdColor);
			updateIfChanged(props.lcdColor, prev.lcdColor, this.gauge.setLcdColor.bind(this.gauge));

			// if(definedAndChanged(props.value, prev.value))
			// 	this.gauge.setValue(props.value);
			updateIfChanged(props.value, prev.value, this.gauge.setValue.bind(this.gauge));

			// if(definedAndChanged(props.altValue, prev.altValue))
			// 	this.gauge.setAltValue(props.altValue);
			updateIfChanged(props.altValue, prev.altValue, this.gauge.setAltValue.bind(this.gauge));
		}

	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}

import React from "react";
import { DisplayMulti as ssDisplayMulti, DisplayMultiParams } from "steelseries";
import { definedAndChanged, updateIfChanged } from "../tools";


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
			
			if(this.props.value) { this.gauge.setValue(this.props.value); }
		}
	}

	gaugeShouldRepaint(prev: Props) {
		return (this.props.width !== prev.width) 
			|| (this.props.height !== prev.height)
			|| definedAndChanged(this.props.digitalFont, prev.digitalFont)
			|| definedAndChanged(this.props.lcdDecimals, prev.lcdDecimals)
			|| definedAndChanged(this.props.linkAltValue, prev.linkAltValue)
			|| definedAndChanged(this.props.valuesNumeric, prev.valuesNumeric);
	}

	componentDidUpdate(prev: Props) {
		if(this.canvasRef.current) {
			if(this.gaugeShouldRepaint(prev)) {
				this.componentDidMount();
			}
			else {
				const { props } = this;

				updateIfChanged(props.lcdColor, prev.lcdColor, this.gauge.setLcdColor.bind(this.gauge));

				updateIfChanged(props.value, prev.value, this.gauge.setValue.bind(this.gauge));
				updateIfChanged(props.altValue, prev.altValue, this.gauge.setAltValue.bind(this.gauge));
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}

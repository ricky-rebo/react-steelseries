import React from "react";
import { DisplaySingle as ssDisplaySingle, DisplaySingleParams } from "steelseries";
import { updateIfChanged } from "../tools";


interface Props extends Omit<DisplaySingleParams, "headerStringVisible"|"unitStringVisible"> {
	width: number;
	height: number;
}


export class DisplaySingle extends React.Component<Props> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssDisplaySingle;

	constructor(props: Props) {
		super(props);

		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		if(this.canvasRef.current) {
			this.gauge = new ssDisplaySingle(this.canvasRef.current, {
				...this.props,
				headerStringVisible: (this.props.headerString !== undefined),
				unitStringVisible: (this.props.unitString !== undefined),
				valuesNumeric: (this.props.valuesNumeric !== undefined) ? this.props.valuesNumeric : (typeof this.props.value === "number")
			});
			
			if(this.props.value) { this.gauge.setValue(this.props.value); }
		}
	}

	componentDidUpdate(prev: Props) {
		if(this.canvasRef.current) {
			const { props } = this;
			
			if(props.width !== prev.width || props.height !== prev.height || typeof props.value !== typeof prev.value) {
				this.componentDidMount();
				return;
			}

			updateIfChanged(props.lcdColor, prev.lcdColor, this.gauge.setLcdColor.bind(this.gauge));
			updateIfChanged(props.section, prev.section, this.gauge.setSection.bind(this.gauge));

			updateIfChanged(props.autoScroll, prev.autoScroll, this.gauge.setScrolling.bind(this.gauge));

			updateIfChanged(props.value, prev.value, this.gauge.setValue.bind(this.gauge));
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}

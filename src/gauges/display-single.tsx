import React from "react";
import { DisplaySingle as ssDisplaySingle, DisplaySingleParams } from "steelseries";


interface Props extends Omit<DisplaySingleParams, "headerStringVisible"|"unitStringVisible"> {
	width: number;
	height: number;
}


export class DisplaySingle extends React.Component<Props, {}> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssDisplaySingle;

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
			const { props } = this;
			if(props.width !== prev.width || props.height !== prev.height || typeof props.value !== typeof prev.value) {
				this.gauge = init_gauge(this.canvasRef.current, this.props);
			}
			else {
				if(props.lcdColor && props.lcdColor !== prev.lcdColor)
					this.gauge.setLcdColor(props.lcdColor);

				if(props.section !== undefined && props.section !== prev.section)
					this.gauge.setSection(props.section);
				
				if(props.autoScroll !== undefined && props.autoScroll !== prev.autoScroll)
					this.gauge.setScrolling(props.autoScroll);

				if(props.value !== undefined && props.value !== prev.value)
					this.gauge.setValue(props.value);

			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef} width={this.props.width} height={this.props.height}></canvas>
	}
}


function init_gauge(canvas: HTMLCanvasElement, params: Props) {
	const gauge = new ssDisplaySingle(canvas, {
		...params,
		headerStringVisible: (params.headerString !== undefined),
		unitStringVisible: (params.unitString !== undefined),
		valuesNumeric: (params.valuesNumeric !== undefined) ? params.valuesNumeric : (typeof params.value === "number")
	});

	console.log(params.headerString !== undefined);
	
	if(params.value)
		gauge.setValue(params.value)
	
	return gauge;
}
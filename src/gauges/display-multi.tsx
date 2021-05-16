import React from "react";
import { DisplayMulti as ssDisplayMulti, DisplayMultiParams } from "steelseries";


interface Props extends Omit<DisplayMultiParams, "headerStringVisible"|"detailStringVisible"|"unitStringVisible"> {
	width: number;
	height: number;
}


export class DisplayMulti extends React.Component<Props, {}> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssDisplayMulti;

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
			if(props.width !== prev.width || props.height !== prev.height) {
				this.gauge = init_gauge(this.canvasRef.current, this.props);
			}
			else {
				if(props.lcdColor && props.lcdColor !== prev.lcdColor)
					this.gauge.setLcdColor(props.lcdColor);

				if(props.value !== undefined && props.value !== prev.value)
					this.gauge.setValue(props.value);

				if(props.altValue !== undefined && props.altValue !== prev.altValue)
					this.gauge.setAltValue(props.altValue);
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef} width={this.props.width} height={this.props.height}></canvas>
	}
}


function init_gauge(canvas: HTMLCanvasElement, params: Props) {
	const gauge = new ssDisplayMulti(canvas, {
		...params,
		headerStringVisible: (params.headerString !== undefined),
		detailStringVisible: (params.detailString !== undefined),
		unitStringVisible: (params.unitString !== undefined),
		linkAltValue: (params.linkAltValue === undefined) ? false : params.linkAltValue
	});
	
	if(params.value)
		gauge.setValue(params.value)
	
	return gauge;
}

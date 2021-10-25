import React from "react";
import { Odometer as ssOdometer, OdometerParams } from "steelseries";
import { updateIfChanged } from "../tools";


interface Props extends Omit<OdometerParams, "_context"> {
	height: number;

	animate?: boolean;
	animationCallback?: () => {};
}

export class Odometer extends React.Component<Props> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssOdometer;

	constructor(props: Props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		if(this.canvasRef.current) {
			this.gauge = new ssOdometer(this.canvasRef.current, {
				height: this.props.height,
				digits: this.props.digits,
				decimals: this.props.decimals,
				decimalBackColor: this.props.decimalBackColor,
				decimalForeColor: this.props.decimalForeColor,
				font: this.props.font,
				value: this.props.animate ? 0 : this.props.value,
				valueBackColor: this.props.valueBackColor,
				valueForeColor: this.props.valueForeColor,
				wobbleFactor: this.props.wobbleFactor
			});

			if(this.props.animate && this.props.value) {
				this.gauge.setValueAnimated(this.props.value, this.props.animationCallback);
			}
		}
	}

	gaugeShouldRepaint(prev: Props) {
		return (this.props.height !== prev.height)
			|| (this.props.digits !== prev.digits)
			|| (this.props.decimals !== prev.decimals)
			|| (this.props.decimalBackColor !== prev.decimalBackColor)
			|| (this.props.decimalForeColor !== prev.decimalForeColor)
			|| (this.props.font !== prev.font)
			|| (this.props.valueBackColor !== prev.valueBackColor)
			|| (this.props.valueForeColor !== prev.valueForeColor)
			|| (this.props.wobbleFactor !== prev.wobbleFactor);
	}

	componentDidUpdate(prev: Props) {
		if(this.canvasRef.current) {
			if(this.gaugeShouldRepaint(prev)) {
				this.componentDidMount();
			}
			else {
				updateIfChanged(this.props.value, prev.value, () => {
					this.props.animate
						? this.gauge.setValueAnimated(this.props.value, this.props.animationCallback)
						: this.gauge.setValue(this.props.value);
				});
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}
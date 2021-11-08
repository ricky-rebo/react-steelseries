import React from "react";
import { getSetterName } from "../tools";

const DEBUG = true;


interface IConstructor<T> {
	new (canvas: HTMLCanvasElement | string, parameters?: any): T;
}

function activator<T>(type: IConstructor<T>, canvas: HTMLCanvasElement | string, parameters?: any): T {
	return new type(canvas, parameters);
}


export default abstract class GaugeComponent<P, G, GP> extends React.Component<P> {
	GaugeClass: IConstructor<G>;
	ignoredProps: string[] = [];

	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: G;

	constructor(props: P) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount(animate: boolean = true) {
		if(this.canvasRef.current && this.GaugeClass) {
			// DEBUG
			if(DEBUG) console.log("rose init")
			this.gauge = activator(this.GaugeClass, this.canvasRef.current, this.getGaugeParams());

			this.gaugePostInit(animate);
		}
	}

	abstract getGaugeParams(): GP;

	abstract gaugePostInit(animate: boolean): void;

	componentDidUpdate(prev: P) {
		if(this.gauge) {
			let setter: string;
			for(let prop in this.props) {
				if(this.props[prop] !== prev[prop] && !this.ignoredProps.includes(prop)) {
					setter = getSetterName(prop)
					console.log(`${prop} => ${setter}`);
					if(setter in this) {
						this[setter]();
					}
					else {
						this.componentDidMount(false);
						return;
					}
				}
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}
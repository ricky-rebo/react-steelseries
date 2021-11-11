import React from "react";
import { getSetterName } from "../tools";

// DEBUG
const DEBUG = true;


interface IConstructor<T> {
	new (canvas: HTMLCanvasElement | string, parameters?: any): T;
}

export default interface GaugeComponent<P, G, GP> {

	/**
	 * Additional code right after gauge initialization
	 * 
	 * @param animate enable animation, if gauge supports it 
	 */
	gaugePostInit?(animate: boolean): void;
}
export default abstract class GaugeComponent<P, G, GP> extends React.Component<P> {
	/**
	 * Steelseries Gauge Class
	 */
	abstract GaugeClass: IConstructor<G>;

	/**
	 * Props ignored in update watch
	 */
	ignoredProps: string[] = [];

	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: G;

	constructor(props: P) {
		super(props);
		this.canvasRef = React.createRef();
	}

	log(msg: string) {
		if(DEBUG) console.log(`[${this.constructor.name}] ${msg}`)
	}

	componentDidMount(animate: boolean = true) {
		if(this.canvasRef.current && this.GaugeClass) {
			// DEBUG
			this.log("init");
			
			this.gauge = new this.GaugeClass(this.canvasRef.current, this.getGaugeParams());

			this.gaugePostInit(animate);
		}
	}

	/**
	 * Return Steelseries gauge params, based on this.props
	 */
	abstract getGaugeParams(): GP;

	componentDidUpdate(prev: P) {
		if(this.gauge) {
			let setter: string;
			for(let prop in this.props) {
				if(this.props[prop] !== prev[prop] && !this.ignoredProps.includes(prop)) {
					setter = getSetterName(prop)
					// DEBUG
					// console.log(`${prop} => ${setter}`);
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
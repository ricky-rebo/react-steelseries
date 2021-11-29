import React from "react";
import { getSetterName } from "../tools";

// DEBUG
const DEBUG = true;


interface IConstructor<T> {
	new (canvas: HTMLCanvasElement | string, parameters?: any): T;
}

export default interface GaugeComponent<P, G, GP> {

	/**
	 * Additional code to be executed right before gauge init
	 */
	gaugePreInit?(): void;

	/**
	 * Additional code to be execudet right after gauge init
	 * 
	 * @param animate enable animation, if gauge supports it 
	 */
	gaugePostInit?(animate: boolean): void;

	/**
	 * Execudet right before gauge update
	 */
	gaugePreUpdate?(): void;

	/**
	 * Executed right after gauge update
	 */
	gaugePostUpdate?(): void;
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

	log(_msg?: string) {
		if(DEBUG) console.log(`[${this.constructor.name}] ${_msg || ""}`)
	}

	/**
	 * Return Steelseries gauge params, based on this.props
	 */
	abstract getGaugeParams(): GP;

	componentDidMount(animate: boolean = true) {
		if(this.canvasRef.current && this.GaugeClass) {
			// DEBUG
			this.log("init");

			if(this.gaugePreInit) {
				this.gaugePreInit();
			}
			
			this.gauge = new this.GaugeClass(this.canvasRef.current, this.getGaugeParams());

			if(this.gaugePostInit) {
				this.gaugePostInit(animate);
			}
		}
	}

	componentDidUpdate(prev: P) {
		if(this.gauge) {
			if(this.gaugePreUpdate) {
				this.gaugePreUpdate();
			}

			let setter: string;
			let setters: { () : void }[] = [];
			for(let prop in this.props) {
				if(this.props[prop] !== prev[prop] && !this.ignoredProps.includes(prop)) {
					setter = getSetterName(prop)
					if(setter in this && typeof this[setter] === 'function') {
						//this[setter]();
						setters.push(this[setter].bind(this));
					}
					else {
						//DEBUG
						this.log("gauge re-init...")
						this.componentDidMount(false);
						return;
					}
				}
			}

			//DEBUG
			this.log("calling setters...")
			setters.forEach((fun) => fun());

			if(this.gaugePostUpdate) {
				this.gaugePostUpdate();
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}
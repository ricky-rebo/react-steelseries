import React from "react";

// DEBUG
const DEBUG = true;


export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getSetterName(prop: string) {
	return `set${capitalize(prop)}`;
}


interface IGaugeConstructor<GC, GP> {
	new (canvas: HTMLCanvasElement | string, parameters?: GP): GC;
}

export default interface GaugeComponent<P, GC, GP> {

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
export default abstract class GaugeComponent<P, GC, GP> extends React.Component<P> {
	/**
	 * Steelseries Gauge Class
	 */
	abstract GaugeClass: IGaugeConstructor<GC, GP>;

	/**
	 * Props ignored in update watch
	 */
	IgnoredProps: string[] = [];

	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: GC;

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
				if(this.props[prop] !== prev[prop] && !this.IgnoredProps.includes(prop)) {
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
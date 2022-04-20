import { Lightbulb as ssLightbulb, LightbulbParams } from "steelseries";

import GaugeComponent from "./gauge-component";


interface Props extends Partial<LightbulbParams> {
	width: number;
	height: number;
	on?: boolean;
	alpha?: number;
}


export class Lightbulb extends GaugeComponent<Props, ssLightbulb, LightbulbParams> {
	GaugeClass = ssLightbulb;

	getGaugeParams = () => ({
		width: this.props.width,
		height: this.props.height,

		// Should be optional, but it's not...
		// Default value taken from 'steelseries' original library source
		// BUG fix in @types/steelseries
		glowColor: this.props.glowColor === undefined ? '#ffff00' : this.props.glowColor
	});

	gaugePostInit() {
		if(this.props.on !== undefined) {
			this.gauge.setOn(this.props.on);
		}
		
		if(this.props.alpha !== undefined) {
			this.gauge.setAlpha(this.props.alpha);
		}
	}

	setGlowColor() {
		this.gauge.setGlowColor(this.props.glowColor);
	}

	setOn() {
		this.gauge.setOn(this.props.on);
	}

	setAlpha() {
		this.gauge.setAlpha(this.props.alpha);
	}
}

import GaugeComponent from "./gauge-component";
import { Altimeter as ssAltimeter, AltimeterParams } from "steelseries";

const DEBUG = true;


interface Props extends AltimeterParams {
	size: number;

	value?: number;
	animate?: boolean;
	animationCallback?: ()=> void;

	// Missing in AltimeterParams!
	// BUG fix in @types/steelseries
	titleString?: string;
	unitString?: string;

	resetValueOnUnitChange?: boolean;
}


export class Altimeter extends GaugeComponent<Props, ssAltimeter, AltimeterParams> {
	GaugeClass = ssAltimeter;
	ignoredProps = ['animate', 'animationCallback', 'resetValueOnUnitChange']

	getGaugeParams() {
		return {
			frameDesign: this.props.frameDesign,
			frameVisible: this.props.frameVisible,
			backgroundColor: this.props.backgroundColor,
			backgroundVisible: this.props.backgroundVisible,
			foregroundType: this.props.foregroundType,
			foregroundVisible: this.props.foregroundVisible,
			knobType: this.props.knobType,
			knobStyle: this.props.knobStyle,
			lcdColor: this.props.lcdColor,
			digitalFont: this.props.digitalFont,
			lcdVisible: this.props.lcdVisible,
			size: this.props.size,
			unitAltPos: this.props.unitAltPos,
			customLayer: this.props.customLayer
		}
	}

	gaugePostInit(animate = false) {
		if(this.props.titleString) {
			this.gauge.setTitleString(this.props.titleString);
		}

		if(this.props.unitString) {
			this.gauge.setUnitString(this.props.unitString); 
		}

		if(this.props.value) {
			this.props.animate && animate
				? this.gauge.setValueAnimated(this.props.value, this.props.animationCallback)
				: this.gauge.setValue(this.props.value);
		}
	}

	setFrameDesign() {
		this.log(`set frameDesign`);
		this.gauge.setFrameDesign(this.props.frameDesign);
	}

	setBackgroundColor() {
		this.log(`set backgroundColor`)
		this.gauge.setBackgroundColor(this.props.backgroundColor);
	}

	setForegroundType() {
		this.log(`set foregrundType`);
		this.gauge.setForegroundType(this.props.foregroundType);
	}

	setLcdColor() {
		this.log(`set lcdColor`);
		this.gauge.setLcdColor(this.props.lcdColor);
	}

	setTitleString() {
		this.log(`set titleString`);
		this.gauge.setTitleString(this.props.titleString);
	}

	setUnitString() {
		this.log(`set unitString`);
		this.gauge.setUnitString(this.props.unitString);

		if(this.props.resetValueOnUnitChange && this.props.animate) {
			this.gauge.setValue(0);
		}
	}

	setValue() {
		this.log(`set value`);
		if(this.props.animate) {
			this.gauge.setValueAnimated(this.props.value, this.props.animationCallback);
		}
		else {
			this.gauge.setValue(this.props.value);
		}
	}
}

import GaugeComponent from "./gauge-component";
import { Altimeter as ssAltimeter, AltimeterParams } from "steelseries";


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
	IgnoredProps = ['animate', 'animationCallback', 'resetValueOnUnitChange']

	valueReset = false;
	prevValue = 0;

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
		this.gauge.setFrameDesign(this.props.frameDesign);
	}

	setBackgroundColor() {
		this.gauge.setBackgroundColor(this.props.backgroundColor);
	}

	setForegroundType() {
		this.gauge.setForegroundType(this.props.foregroundType);
	}

	setLcdColor() {
		this.gauge.setLcdColor(this.props.lcdColor);
	}

	setTitleString() {
		this.gauge.setTitleString(this.props.titleString);
	}

	setUnitString() {
		this.gauge.setUnitString(this.props.unitString);

		if(this.props.resetValueOnUnitChange && this.props.animate) {
			this.valueReset = true;
			this.prevValue = this.gauge.getValue()
			this.gauge.setValue(0);
		}
	}

	setValue() {
		if(this.props.animate) {
			this.gauge.setValueAnimated(this.props.value, this.props.animationCallback);

			if(this.valueReset) {
				this.valueReset = false;
			}
		}
		else {
			this.gauge.setValue(this.props.value);
		}
	}

	gaugePostUpdate() {
		if(this.valueReset) {
			this.gauge.setValueAnimated(this.prevValue, this.props.animationCallback);
			this.valueReset = false;
		}
	}
}

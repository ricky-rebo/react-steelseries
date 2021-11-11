import GaugeComponent from "./gauge-component";
import { OdometerParams } from "steelseries";
import { Rose as ssRose, RoseParams } from "steelseries-rose-gauge";

const DEBUG = true;


// BUG @types/steelseries
// Define a subset of params for Radial/Rose Odometer
type RoseOdometerParams = Omit<OdometerParams, "_context" | "height" | "value" | "wobbleFactor">;

interface Props extends RoseParams {
	size: number;

	value?: number[];
	odometerValue?: number;
	odometerParams?: RoseOdometerParams;

	animate?: boolean;
	animationCallback?: () => {};
}


export class Rose extends GaugeComponent<Props, ssRose, RoseParams> {
	GaugeClass = ssRose;

	ignoredProps = ['animate', 'animationCallback'];

	getGaugeParams() {
		return {
			size: this.props.size,

			frameDesign: this.props.frameDesign,
			frameVisible: this.props.frameVisible,
			backgroundColor: this.props.backgroundColor,
			backgroundVisible: this.props.backgroundVisible,
			foregroundType: this.props.foregroundType,
			foregroundVisible: this.props.foregroundVisible,

			pointSymbols: this.props.pointSymbols,
			titleString: this.props.titleString,
			unitString: this.props.unitString,
			useOdometer: this.props.useOdometer,
			odometerParams: this.props.odometerParams,
		};
	}

	gaugePostInit(animate: boolean = true) {
		if(this.props.value) {
			this.gauge.setValue(this.props.value);
		}

		if(this.props.odometerValue && this.props.useOdometer) {
			this.props.animate && animate
				? this.gauge.setOdoValueAnimated(this.props.odometerValue, this.props.animationCallback)
				: this.gauge.setOdoValue(this.props.odometerValue);
		}
	}

	setValue() {
		// DEBUG
		if(DEBUG) this.log(`set value`);
		this.gauge.setValue(this.props.value);
	}

	setFrameDesign() {
		//DEBUG
		if(DEBUG) this.log(`set frameDesign`);
		this.gauge.setFrameDesign(this.props.frameDesign);
	}

	setBackgroundColor() {
		// DEBUG
		if(DEBUG) this.log(`set backgroundColor`)
		this.gauge.setBackgroundColor(this.props.backgroundColor);
	}

	setForegroundType() {
		// DEBUG
		if(DEBUG) this.log(`set foregrundType`);
		this.gauge.setForegroundType(this.props.foregroundType);
	}

	setOdometerValue() {
		// DEBUG
		if(DEBUG) this.log(`set odometerValue`);
		this.props.animate
			? this.gauge.setOdoValueAnimated(this.props.odometerValue, this.props.animationCallback)
			: this.gauge.setOdoValue(this.props.odometerValue);
	}

	setTitleString() {
		// DEBUG
		if(DEBUG) this.log(`set titleString`);
		this.gauge.setTitleString(this.props.titleString);
	}

	setUnitString() {
		// DEBUG
		if(DEBUG) this.log(`set unitString`);
		this.gauge.setUnitString(this.props.unitString);
	}

	setPointSymbols() {
		// DEBUG
		if(DEBUG) this.log(`set pointSymbols`);
		this.gauge.setPointSymbols(this.props.pointSymbols);
	}
}

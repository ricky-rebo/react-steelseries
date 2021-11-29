import { Rose as ssRose, RoseParams } from "steelseries-rose-gauge";
import { OdometerParams } from "steelseries";

import GaugeComponent from "./gauge-component";


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
		this.log();
		this.gauge.setValue(this.props.value);
	}

	setFrameDesign() {
		 this.log();
		this.gauge.setFrameDesign(this.props.frameDesign);
	}

	setBackgroundColor() {
		this.log()
		this.gauge.setBackgroundColor(this.props.backgroundColor);
	}

	setForegroundType() {
		this.log();
		this.gauge.setForegroundType(this.props.foregroundType);
	}

	setOdometerValue() {
		this.log();
		this.props.animate
			? this.gauge.setOdoValueAnimated(this.props.odometerValue, this.props.animationCallback)
			: this.gauge.setOdoValue(this.props.odometerValue);
	}

	setTitleString() {
		this.log();
		this.gauge.setTitleString(this.props.titleString);
	}

	setUnitString() {
		this.log();
		this.gauge.setUnitString(this.props.unitString);
	}

	setPointSymbols() {
		this.log();
		this.gauge.setPointSymbols(this.props.pointSymbols);
	}
}

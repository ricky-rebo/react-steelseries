import { RadialVertical as ssRadialVertical, RadialVerticalParams, Section } from "steelseries";

import GaugeComponent from "./gauge-component";

type ExcludedParams = "area" 
	| "section" 
	| "minMeasuredValueVisible" 
	| "maxMeasuredValueVisible" 
	| "thresholdVisible"
	| "ledVisible";
interface Props extends Omit<RadialVerticalParams, ExcludedParams> {
	size: number;

	sections?: Section[];
	sectors?: Section[];

	showThreshold?: boolean;
	showLed?: boolean;

	showMinMeasuredValue?: boolean;
	showMaxMeasuredValue?: boolean;

	value?: number;
	minMeasuredValue?: number;
	maxMeasuredValue?: number;

	animate?: boolean;
	animationCallback?: () => void;

	resetValueOnBoundsChange?: boolean;
}

export class RadialVertical extends GaugeComponent<Props, ssRadialVertical, RadialVerticalParams> {
	GaugeClass = ssRadialVertical;
	ignoredProps = ["animate", "animationCallback", "resetValueOnBoundsChange"];

	valueReset = false;
	prevValue = 0;

	getGaugeParams = () => ({
		size: this.props.size,
		orientation: this.props.orientation,

		frameDesign: this.props.frameDesign,
		frameVisible: this.props.frameVisible,
		backgroundColor: this.props.backgroundColor,
		backgroundVisible: this.props.backgroundVisible,
		foregroundType: this.props.foregroundType,
		foregroundVisible: this.props.foregroundVisible,

		knobType: this.props.knobType,
		knobStyle: this.props.knobStyle,
		pointerType: this.props.pointerType,
		pointerColor: this.props.pointerColor,

		minValue: this.props.minValue,
		maxValue: this.props.maxValue,
		minMeasuredValueVisible: this.props.showMinMeasuredValue,
		maxMeasuredValueVisible: this.props.showMaxMeasuredValue,
		niceScale: this.props.niceScale,
		labelNumberFormat: this.props.labelNumberFormat,
		threshold: this.props.threshold,
		thresholdRising: this.props.thresholdRising,
		thresholdVisible: (this.props.showThreshold === undefined) ? false : this.props.showThreshold,
		fullScaleDeflectionTime: this.props.fullScaleDeflectionTime,
		playAlarm: this.props.playAlarm,
		alarmSound: this.props.alarmSound,

		titleString: this.props.titleString,
		unitString: this.props.unitString,

		ledColor: this.props.ledColor,
		ledVisible: (this.props.showLed === undefined) ? false : this.props.showLed,

		section: this.props.sections,
		area: this.props.sectors
	});

	gaugePostInit(animate: boolean) {
		if(this.props.minMeasuredValue) {
			this.gauge.setMinMeasuredValue(this.props.minMeasuredValue);
		}

		if(this.props.showMaxMeasuredValue) {
			this.gauge.setMaxMeasuredValue(this.props.maxMeasuredValue);
		}

		if(this.props.value) {
			(this.props.animate && animate)
				? this.gauge.setValueAnimated(this.props.value, this.props.animationCallback)
				: this.gauge.setValue(this.props.value);
		}
	}

	gaugePreUpdate() {
		if(this.valueReset)
			this.valueReset = false;
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

	setPointerColor() {
		this.log();
		this.gauge.setPointerColor(this.props.pointerColor);
	}

	setPointerType() {
		this.log();
		this.gauge.setPointerType(this.props.pointerType);
	}

	setMinValue() {
		this.log();
		this.gauge.setMinValue(this.props.minValue);

		if(this.props.resetValueOnBoundsChange && !this.valueReset && this.props.animate) {
			this.prevValue = this.gauge.getValue();
			this.valueReset = true;
			this.gauge.setValue(this.gauge.getMinValue());
		}
	}

	setMaxValue() {
		this.log();
		this.gauge.setMaxValue(this.props.maxValue);

		if(this.props.resetValueOnBoundsChange && !this.valueReset && this.props.animate) {
			this.prevValue = this.gauge.getValue();
			this.valueReset = true;
			this.gauge.setValue(this.gauge.getMinValue());
		}
	}

	setShowMinMeasuredValue() {
		this.log();
		this.gauge.setMinMeasuredValueVisible(this.props.showMinMeasuredValue);
	}

	setShowMaxMeasuredValue() {
		this.log();
		this.gauge.setMaxMeasuredValueVisible(this.props.showMaxMeasuredValue);
	}

	setThresholdRising() {
		this.log();
		this.gauge.setThresholdRising(this.props.thresholdRising);
	}

	// BUG in 'steelseries' library
	// setThresholdVisible() might not work properly
	// missimg buffer resets and re-init?
	//
	// setShowThreshold() {
	// 	this.log();
	// 	this.gauge.setThresholdVisible(this.props.showThreshold);
	// }

	setShowLed() {
		this.log();
		this.gauge.setLedVisible(this.props.showLed);
	}

	setLedColor() {
		this.log();
		this.gauge.setLedColor(this.props.ledColor);
	}

	setMinMeasuredValue() {
		this.log();
		this.gauge.setMinMeasuredValue(this.props.minMeasuredValue);
	}

	setMaxMeasuredValue() {
		this.log();
		this.gauge.setMaxMeasuredValue(this.props.maxMeasuredValue);
	}

	setValue() {
		if(this.props.animate) {
			this.gauge.setValueAnimated(this.props.value, this.props.animationCallback);
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
import { Linear as ssLinear, LinearParams } from "steelseries";

import GaugeComponent from "./gauge-component";


type ExcludedParams = "ledVisible"
	|"minMeasuredValueVisible"
	|"maxMeasuredValueVisible"
	|"thresholdVisible";
interface Props extends Omit<LinearParams, ExcludedParams> {
	width: number;
	height: number;

	showLed?: boolean;
	showThreshold?: boolean;
	showMinMeasuredValue?: boolean;
	showMaxMeasuredValue?: boolean;

	value?: number;
	minMeasuredValue?: number;
	maxMeasuredValue?: number;

	animate?: boolean;
	animationCallback?: () => void;

	resetValueOnBoundsChange?: boolean;
}


export class Linear extends GaugeComponent<Props, ssLinear, LinearParams> {
	GaugeClass = ssLinear;
	ignoredProps = ["animate", "animationCallback", "resetValueOnBoundsChange"]

	valueReset = false;
	prevValue = 0;

	getGaugeParams = () => ({
		width: this.props.width,
		height: this.props.height,

		gaugeType: this.props.gaugeType,
		frameDesign: this.props.frameDesign,
		frameVisible: this.props.frameVisible,
		backgroundColor: this.props.backgroundColor,
		backgroundVisible: this.props.backgroundVisible,
		foregroundVisible: this.props.foregroundVisible,

		lcdColor: this.props.lcdColor,
		digitalFont: this.props.digitalFont,
		lcdDecimals: this.props.lcdDecimals,
		lcdVisible: this.props.lcdVisible,

		ledColor: this.props.ledColor,
		ledVisible: (this.props.showLed === undefined) ? false : this.props.showLed,

		valueColor: this.props.valueColor,
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
	});

	gaugePostInit(animate: boolean) {
		if(this.props.value) {
			this.props.animate && animate
				? this.gauge.setValueAnimated(this.props.value, this.props.animationCallback)
				: this.gauge.setValue(this.props.value);
		}

		if(this.props.minMeasuredValue) {
			this.gauge.setMinMeasuredValue(this.props.minMeasuredValue);
		}

		if(this.props.maxMeasuredValue) {
			this.gauge.setMaxMeasuredValue(this.props.maxMeasuredValue);
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

	setLcdColor() {
		this.log();
		this.gauge.setLcdColor(this.props.lcdColor);
	}

	setLcdDecimals() {
		this.log();
		this.gauge.setLcdDecimals(this.props.lcdDecimals);
	}

	setLedColor() {
		this.log();
		this.gauge.setLedColor(this.props.ledColor);
	}

	setShowLed() {
		this.log();
		this.gauge.setLedVisible(this.props.showLed);
	}

	setValueColor() {
		this.log();
		this.gauge.setValueColor(this.props.valueColor);
	}

	setThreshold() {
		this.log();
		this.gauge.setThreshold(this.props.threshold);
	}

	setThresholdRising() {
		this.log();
		this.gauge.setThresholdRising(this.props.thresholdRising);
	}

	// BUG in 'steelseries' library
	// Linear.setThresholdVisible might not work properly
	// missimg buffer resets and re-init?
	// setShowThreshold() {
	// 	this.log();
	// 	this.gauge.setThresholdVisible(this.props.showThreshold);
	// }

	setTitleString() {
		this.log();
		this.gauge.setTitleString(this.props.titleString);
	}

	setUnitString() {
		this.log();
		this.gauge.setUnitString(this.props.unitString);
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

	setMinMeasuredValue() {
		this.log();
		this.gauge.setMinMeasuredValue(this.props.minMeasuredValue);
	}

	setShowMaxMeasuredValue() {
		this.log();
		this.gauge.setMaxMeasuredValueVisible(this.props.showMaxMeasuredValue);
	}

	setMaxMeasuredValue() {
		this.log();
		this.gauge.setMaxMeasuredValue(this.props.maxMeasuredValue);
	}

	setValue() {
		this.log();
		if(this.props.animate) {
			this.gauge.setValueAnimated(this.props.value, this.props.animationCallback);

			if(this.valueReset) this.valueReset = false;
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

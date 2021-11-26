import { OdometerParams, Radial as ssRadial, RadialParams, Section, TrendState } from "steelseries";

import GaugeComponent from "./gauge-component";

// BUG @types/steelseries
// Define a subset of params for Radial Odometer
type RadialOdometerParams = Omit<OdometerParams, "_context" | "height" | "value" | "wobbleFactor">;

type ExcludedParams = "odometerUseValue" 
	| "area" 
	| "section" 
	| "userLedVisible" 
	| "minMeasuredValueVisible" 
	| "maxMeasuredValueVisible" 
	| "odometerParams" 
	| "userLedState"
	| "thresholdVisible"
	| "ledVisible"
	| "trendVisible";
interface Props extends Omit<RadialParams, ExcludedParams> {
	size: number;

	sections?: Section[];
	sectors?: Section[];

	showThreshold?: boolean;

	showLed?: boolean;
	showUserLed?: boolean;
	userLedOn?: boolean;
	userLedBlink?: boolean;

	showTrend?: boolean;
	showMinMeasuredValue?: boolean;
	showMaxMeasuredValue?: boolean;

	value?: number;
	trend?: TrendState;
	minMeasuredValue?: number;
	maxMeasuredValue?: number;
	odometerValue?: number;
	syncOdometerValue?: boolean;
	odometerParams?: RadialOdometerParams;

	animate?: boolean;
	animationCallback?: () => void;

	resetValueOnBoundsChange?: boolean;
}


export class Radial extends GaugeComponent<Props, ssRadial, RadialParams> {
	GaugeClass = ssRadial;
	ignoredProps = ["animate", "animationCallback", "resetValueOnBoundsChange"];

	valueReset = false;
	prevValue = 0;

	getGaugeParams = () => ({
		size: this.props.size,
		gaugeType: this.props.gaugeType,

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

		lcdColor: this.props.lcdColor,
		digitalFont: this.props.digitalFont,
		lcdDecimals: this.props.lcdDecimals,
		lcdVisible: this.props.lcdVisible,

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

		fractionalScaleDecimals: this.props.fractionalScaleDecimals,
		tickLabelOrientation: this.props.tickLabelOrientation,
		trendVisible: this.props.showTrend,
		trendColors: this.props.trendColors,
		userLedColor: this.props.userLedColor,
		userLedVisible: this.props.showUserLed,
		section: this.props.sections,
		area: this.props.sectors,
		useOdometer: this.props.useOdometer,
		odometerParams: this.props.odometerParams,
		odometerUseValue: this.props.syncOdometerValue,

		customLayer: this.props.customLayer,
	});

	gaugePostInit(animate: boolean) {
		if(this.props.showMinMeasuredValue) {
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

		if(this.props.trend) {
			this.gauge.setTrend(this.props.trend);
		}

		if(this.props.odometerValue && !this.props.syncOdometerValue) {
			this.gauge.setOdoValue(this.props.odometerValue);
		}

		if(this.props.userLedOn !== undefined) {
			this.gauge.setUserLedOnOff(this.props.userLedOn);
		}
		
		if(this.props.userLedBlink !== undefined) {
			this.gauge.blinkUserLed(this.props.userLedBlink);
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

	setLcdColor() {
		this.log();
		this.gauge.setLcdColor(this.props.lcdColor);
	}

	setLcdDecimals() {
		this.log();
		this.gauge.setLcdDecimals(this.props.lcdDecimals);
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

	setLabelNumberFormat() {
		this.log();
		this.gauge.setLabelNumberFormat(this.props.labelNumberFormat);
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
	// setThresholdVisible() might not work properly
	// missimg buffer resets and re-init?
	//
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

	setShowLed() {
		this.log();
		this.gauge.setLedVisible(this.props.showLed);
	}

	setLedColor() {
		this.log();
		this.gauge.setLedColor(this.props.ledColor);
	}

	setFractionalScaleDecimals() {
		this.log();
		this.gauge.setFractionalScaleDecimals(this.props.fractionalScaleDecimals);
	}

	setShowTrend() {
		this.log();
		this.gauge.setTrendVisible(this.props.showTrend);
	}

	setShowUserLed() {
		this.log();
		this.gauge.setUserLedVisible(this.props.showUserLed);
	}

	setUserLedColor() {
		this.log();
		this.gauge.setUserLedColor(this.props.userLedColor);
	}

	setSections() {
		this.log();
		this.gauge.setSection(this.props.sections);
	}

	setSectors() {
		this.log();
		this.gauge.setArea(this.props.sectors);
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

	setTrend() {
		this.log();
		this.gauge.setTrend(this.props.trend);
	}

	setOdometerValue() {
		this.log();
		if(!this.props.syncOdometerValue) {
			this.gauge.setOdoValue(this.props.odometerValue);
		}
	}

	setUserLedOn() {
		this.log();
		this.gauge.setUserLedOnOff(this.props.userLedOn);
	}

	setUserLedBlink() {
		this.log();
		this.gauge.blinkUserLed(this.props.userLedBlink);
	}

	gaugePostUpdate() {
		if(this.valueReset) {
			this.gauge.setValueAnimated(this.prevValue, this.props.animationCallback);
			this.valueReset = false;
		}
	}
}
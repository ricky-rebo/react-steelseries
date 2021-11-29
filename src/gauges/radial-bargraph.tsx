import { RadialBargraph as ssRadialBargraph, RadialBargraphParams, Section, gradientWrapper, TrendState } from "steelseries";

import GaugeComponent from "./gauge-component";

type ExcludedParams = "section"
	| "valueGradient"
	| "userLedVisible" 
	| "userLedState"
	| "ledVisible"
	| "trendVisible";
interface Props extends Omit<RadialBargraphParams, ExcludedParams> {
	size: number;

	showLed?: boolean;
	showUserLed?: boolean;
	userLedOn?: boolean;
	userLedBlink?: boolean;

	showTrend?: boolean;

	valueColorSections?: Section[];
	valueColorGradient?: gradientWrapper;

	value?: number;
	trend?: TrendState;

	animate?: boolean;
	animationCallback?: () => void;

	resetValueOnBoundsChange?: boolean;
}

export class RadialBargraph extends GaugeComponent<Props, ssRadialBargraph, RadialBargraphParams> {
	GaugeClass = ssRadialBargraph;
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

		lcdColor: this.props.lcdColor,
		digitalFont: this.props.digitalFont,
		lcdDecimals: this.props.lcdDecimals,
		lcdVisible: this.props.lcdVisible,

		minValue: this.props.minValue,
		maxValue: this.props.maxValue,
		niceScale: this.props.niceScale,
		labelNumberFormat: this.props.labelNumberFormat,
		threshold: this.props.threshold,
		thresholdRising: this.props.thresholdRising,
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
		valueColor: this.props.valueColor,
		section: this.props.valueColorSections,
		useSectionColors: (this.props.valueColorSections !== undefined),
		valueGradient: this.props.valueColorGradient,
		useValueGradient: (this.props.valueColorGradient !== undefined),

		customLayer: this.props.customLayer,
	});

	gaugePostInit(animate: boolean) {
		if(this.props.value) {
			(this.props.animate && animate)
				? this.gauge.setValueAnimated(this.props.value, this.props.animationCallback)
				: this.gauge.setValue(this.props.value);
		}

		if(this.props.trend) {
			this.gauge.setTrend(this.props.trend);
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

	setLcdDecimals() {
		this.gauge.setLcdDecimals(this.props.lcdDecimals);
	}

	setMinValue() {
		this.gauge.setMinValue(this.props.minValue);

		if(this.props.resetValueOnBoundsChange && !this.valueReset && this.props.animate) {
			this.prevValue = this.gauge.getValue();
			this.valueReset = true;
			this.gauge.setValue(this.gauge.getMinValue());
		}
	}

	setMaxValue() {
		this.gauge.setMaxValue(this.props.maxValue);

		if(this.props.resetValueOnBoundsChange && !this.valueReset && this.props.animate) {
			this.prevValue = this.gauge.getValue();
			this.valueReset = true;
			this.gauge.setValue(this.gauge.getMinValue());
		}
	}

	setLabelNumberFormat() {
		this.gauge.setLabelNumberFormat(this.props.labelNumberFormat);
	}

	setThreshold() {
		this.gauge.setThreshold(this.props.threshold);
	}

	setThresholdRising() {
		this.gauge.setThresholdRising(this.props.thresholdRising);
	}

	setTitleString() {
		this.gauge.setTitleString(this.props.titleString);
	}

	setUnitString() {
		this.gauge.setUnitString(this.props.unitString);
	}

	setShowLed() {
		this.gauge.setLedVisible(this.props.showLed);
	}

	setLedColor() {
		this.gauge.setLedColor(this.props.ledColor);
	}

	setFractionalScaleDecimals() {
		this.gauge.setFractionalScaleDecimals(this.props.fractionalScaleDecimals);
	}

	setShowTrend() {
		this.gauge.setTrendVisible(this.props.showTrend);
	}

	setShowUserLed() {
		this.gauge.setUserLedVisible(this.props.showUserLed);
	}

	setUserLedColor() {
		this.gauge.setUserLedColor(this.props.userLedColor);
	}

	setValueColor() {
		this.gauge.setValueColor(this.props.valueColor);
	}

	setValueColorSections() {
		this.gauge.setSectionActive(this.props.valueColorSections !== undefined)
			.setSection(this.props.valueColorSections);
	}

	setValueColorGradient() {
		this.gauge.setGradientActive(this.props.valueColorGradient !== undefined)
			.setGradient(this.props.valueColorGradient);
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
		this.gauge.setTrend(this.props.trend);
	}

	setUserLedOn() {
		this.gauge.setUserLedOnOff(this.props.userLedOn);
	}

	setUserLedBlink() {
		this.gauge.blinkUserLed(this.props.userLedBlink);
	}

	gaugePostUpdate() {
		if(this.valueReset) {
			this.gauge.setValueAnimated(this.prevValue, this.props.animationCallback);
			this.valueReset = false;
		}
	}
}
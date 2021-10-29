import React from "react";
import { OdometerParams, Radial as ssRadial, RadialParams, Section, TrendState } from "steelseries";
import { updateIfChanged } from "../tools";

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

	resetValueOnUnitChange?: boolean;
	resetValueOnBoundsChange?: boolean;
}


export class Radial extends React.Component<Props> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssRadial;

	constructor(props: Props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount(animate: boolean = true) {
		if(this.canvasRef.current) {
			this.gauge = new ssRadial(this.canvasRef.current, {
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
	}

	gaugeShouldRepaint(prev: Props) {
		return (this.props.size !== prev.size)
			|| (this.props.gaugeType !== prev.gaugeType)
			|| (this.props.frameVisible !== prev.frameVisible)
			|| (this.props.backgroundVisible !== prev.backgroundVisible)
			|| (this.props.foregroundVisible !== prev.foregroundVisible)
			|| (this.props.knobType !== prev.knobType)
			|| (this.props.knobStyle !== prev.knobStyle)
			|| (this.props.digitalFont !== prev.digitalFont)
			|| (this.props.lcdVisible !== prev.lcdVisible)
			|| (this.props.niceScale !== prev.niceScale)
			|| (this.props.fullScaleDeflectionTime !== prev.fullScaleDeflectionTime)
			|| (this.props.playAlarm !== prev.playAlarm)
			|| (this.props.alarmSound !== prev.alarmSound)
			|| (this.props.fullScaleDeflectionTime !== prev.fullScaleDeflectionTime)
			|| (this.props.tickLabelOrientation !== prev.tickLabelOrientation)
			|| (this.props.trendColors !== prev.trendColors)
			|| (this.props.useOdometer !== prev.useOdometer)
			|| (this.props.odometerParams !== prev.odometerParams)
			|| (this.props.syncOdometerValue !== prev.syncOdometerValue)
			|| (this.props.customLayer !== prev.customLayer)
			|| (this.props.showThreshold !== prev.showThreshold);
	}

	componentDidUpdate(prev: Props) {
		if(this.gauge) {
			if(this.gaugeShouldRepaint(prev)) {
				this.componentDidMount(false);
			}
			else {
				const { props, gauge } = this;

				updateIfChanged(props.frameDesign, prev.frameDesign, gauge.setFrameDesign.bind(gauge));
				updateIfChanged(props.backgroundColor, prev.backgroundColor, gauge.setBackgroundColor.bind(gauge));
				updateIfChanged(props.foregroundType, prev.foregroundType, gauge.setForegroundType.bind(gauge));

				updateIfChanged(props.pointerType, prev.pointerType, gauge.setPointerType.bind(gauge));
				updateIfChanged(props.pointerColor, prev.pointerColor, gauge.setPointerColor.bind(gauge));

				updateIfChanged(props.lcdColor, prev.lcdColor, gauge.setLcdColor.bind(gauge));
				updateIfChanged(props.lcdDecimals, prev.lcdDecimals, gauge.setLcdDecimals.bind(this));

				updateIfChanged(props.showMinMeasuredValue, prev.showMinMeasuredValue, gauge.setMinMeasuredValueVisible.bind(gauge));
				updateIfChanged(props.showMaxMeasuredValue, prev.showMaxMeasuredValue, gauge.setMaxMeasuredValueVisible.bind(gauge));
				updateIfChanged(props.labelNumberFormat, prev.labelNumberFormat, gauge.setLabelNumberFormat.bind(gauge));
				updateIfChanged(props.threshold, prev.threshold, gauge.setThreshold.bind(gauge));
				updateIfChanged(props.thresholdRising, prev.thresholdRising, gauge.setThresholdRising.bind(gauge));
				
				// BUG in 'steelseries' library
				// Radial.setThresholdVisible might not work properly
				// thresholdVisible update detection moved in gaugeShouldRepaint()
				// updateIfChanged(props.thresholdVisible, prev.thresholdVisible, gauge.setThresholdVisible.bind(gauge));

				updateIfChanged(props.titleString, prev.titleString, gauge.setTitleString.bind(gauge));
				
				const minUpd = updateIfChanged(props.minValue, prev.minValue, gauge.setMinValue.bind(gauge));
				const maxUpd = updateIfChanged(props.maxValue, prev.maxValue, gauge.setMaxValue.bind(gauge));
				const untUpd = updateIfChanged(props.unitString, prev.unitString, gauge.setUnitString.bind(gauge));

				if((minUpd || maxUpd || untUpd) && (props.resetValueOnBoundsChange || props.resetValueOnUnitChange) && props.animate) {
					gauge.setValue(gauge.getMinValue());
				}

				updateIfChanged(props.ledColor, prev.ledColor, gauge.setLedColor.bind(gauge));
				updateIfChanged(props.showLed, prev.showLed, gauge.setLedVisible.bind(gauge));

				updateIfChanged(props.fractionalScaleDecimals, prev.fractionalScaleDecimals, gauge.setFractionalScaleDecimals.bind(gauge));
				updateIfChanged(props.showTrend, prev.showTrend, gauge.setTrendVisible.bind(gauge));
				updateIfChanged(props.userLedColor, prev.userLedColor, gauge.setUserLedColor.bind(gauge));
				updateIfChanged(props.showUserLed, prev.showUserLed, gauge.setUserLedVisible.bind(gauge));
				updateIfChanged(props.sections, prev.sections, gauge.setSection.bind(gauge));
				updateIfChanged(props.sectors, prev.sectors, gauge.setArea.bind(gauge));

				updateIfChanged(props.minMeasuredValue, prev.minMeasuredValue, gauge.setMinMeasuredValue.bind(gauge));
				updateIfChanged(props.maxMeasuredValue, prev.maxMeasuredValue, gauge.setMaxMeasuredValue.bind(gauge));
				updateIfChanged(this.props.value, prev.value, () => {
					this.props.animate
						? this.gauge.setValueAnimated(this.props.value, this.props.animationCallback)
						: this.gauge.setValue(this.props.value);
				});
				updateIfChanged(props.trend, prev.trend, gauge.setTrend.bind(gauge));
				if(!props.syncOdometerValue) {
					updateIfChanged(props.odometerValue, prev.odometerValue, gauge.setOdoValue.bind(gauge));
				}
				updateIfChanged(props.userLedOn, prev.userLedOn, gauge.setUserLedOnOff.bind(gauge));
				updateIfChanged(props.userLedBlink, prev.userLedBlink, gauge.blinkUserLed.bind(gauge));
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}
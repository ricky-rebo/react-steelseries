import React from "react";
import { gradientWrapper, RadialBargraph as ssRadialBargraph, RadialBargraphParams, Section, TrendState } from "steelseries";
import { updateIfChanged } from "../tools";

type ExcludedParams = "section" 
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

export class RadialBargraph extends React.Component<Props> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssRadialBargraph;

	constructor(props: Props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount(animate: boolean = true) {
		if(this.canvasRef.current) {
			this.gauge = new ssRadialBargraph(this.canvasRef.current, {
				size: this.props.size,
				gaugeType: this.props.gaugeType,

				frameDesign: this.props.frameDesign,//
				frameVisible: this.props.frameVisible,
				backgroundColor: this.props.backgroundColor,//
				backgroundVisible: this.props.backgroundVisible,
				foregroundType: this.props.foregroundType,//
				foregroundVisible: this.props.foregroundVisible,

				lcdColor: this.props.lcdColor,//
				digitalFont: this.props.digitalFont,
				lcdDecimals: this.props.lcdDecimals,//
				lcdVisible: this.props.lcdVisible,

				minValue: this.props.minValue,//
				maxValue: this.props.maxValue,//
				niceScale: this.props.niceScale,
				labelNumberFormat: this.props.labelNumberFormat,//
				threshold: this.props.threshold,//
				thresholdRising: this.props.thresholdRising,//
				fullScaleDeflectionTime: this.props.fullScaleDeflectionTime,
				playAlarm: this.props.playAlarm,
				alarmSound: this.props.alarmSound,

				titleString: this.props.titleString,//
				unitString: this.props.unitString,//

				ledColor: this.props.ledColor,//
				ledVisible: (this.props.showLed === undefined) ? false : this.props.showLed,//

				fractionalScaleDecimals: this.props.fractionalScaleDecimals,//
				tickLabelOrientation: this.props.tickLabelOrientation,
				trendVisible: this.props.showTrend,//
				trendColors: this.props.trendColors,
				userLedColor: this.props.userLedColor,//
				userLedVisible: this.props.showUserLed,//
				valueColor: this.props.valueColor,//
				section: this.props.valueColorSections,//
				useSectionColors: (this.props.valueColorSections !== undefined),//
				valueGradient: this.props.valueColorGradient,//
				useValueGradient: (this.props.valueColorGradient !== undefined),//

				customLayer: this.props.customLayer,
			});

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
	}

	gaugeShouldRepaint(prev: Props) {
		return (this.props.size !== prev.size)
			|| (this.props.gaugeType !== prev.gaugeType)
			|| (this.props.frameVisible !== prev.frameVisible)
			|| (this.props.backgroundVisible !== prev.backgroundVisible)
			|| (this.props.foregroundVisible !== prev.foregroundVisible)
			|| (this.props.lcdVisible !== prev.lcdVisible)
			|| (this.props.niceScale !== prev.niceScale)
			|| (this.props.fullScaleDeflectionTime !== prev.fullScaleDeflectionTime)
			|| (this.props.playAlarm !== prev.playAlarm)
			|| (this.props.alarmSound !== prev.alarmSound)
			|| (this.props.tickLabelOrientation !== prev.tickLabelOrientation)
			|| (this.props.trendColors !== prev.trendColors)
			|| (this.props.customLayer !== prev.customLayer);
	}

	componentDidUpdate(prev: Props) {
		if(this.gauge) {
			if(this.gaugeShouldRepaint(prev)) {
				this.componentDidMount(false)
			}
			else {
				const { props, gauge } = this;
				
				updateIfChanged(props.frameDesign, prev.frameDesign, gauge.setFrameDesign.bind(gauge));
				updateIfChanged(props.backgroundColor, prev.backgroundColor, gauge.setBackgroundColor.bind(gauge));
				updateIfChanged(props.foregroundType, prev.foregroundType, gauge.setForegroundType.bind(gauge));

				updateIfChanged(props.lcdColor, prev.lcdColor, gauge.setLcdColor.bind(gauge));
				updateIfChanged(props.lcdDecimals, prev.lcdDecimals, gauge.setLcdDecimals.bind(this));

				const minUpd = updateIfChanged(props.minValue, prev.minValue, gauge.setMinValue.bind(gauge));
				const maxUpd = updateIfChanged(props.maxValue, prev.maxValue, gauge.setMaxValue.bind(gauge));
				if((minUpd || maxUpd) && props.resetValueOnBoundsChange && props.animate) {
					gauge.setValue(gauge.getMinValue());
				}

				updateIfChanged(props.labelNumberFormat, prev.labelNumberFormat, gauge.setLabelNumberFormat.bind(gauge));
				updateIfChanged(props.threshold, prev.threshold, gauge.setThreshold.bind(gauge));
				updateIfChanged(props.thresholdRising, prev.thresholdRising, gauge.setThresholdRising.bind(gauge));

				updateIfChanged(props.titleString, prev.titleString, gauge.setTitleString.bind(gauge));
				updateIfChanged(props.unitString, prev.unitString, gauge.setUnitString.bind(gauge));

				updateIfChanged(props.ledColor, prev.ledColor, gauge.setLedColor.bind(gauge));
				updateIfChanged(props.showLed, prev.showLed, gauge.setLedVisible.bind(gauge));

				updateIfChanged(props.fractionalScaleDecimals, prev.fractionalScaleDecimals, gauge.setFractionalScaleDecimals.bind(gauge));
				updateIfChanged(props.showTrend, prev.showTrend, gauge.setTrendVisible.bind(gauge));
				updateIfChanged(props.userLedColor, prev.userLedColor, gauge.setUserLedColor.bind(gauge));
				updateIfChanged(props.showUserLed, prev.showUserLed, gauge.setUserLedVisible.bind(gauge));
				updateIfChanged(props.valueColor, prev.valueColor, gauge.setValueColor.bind(gauge));
				updateIfChanged(props.valueColorSections, prev.valueColorSections, (val?: Section[]) => {
					gauge.setSectionActive(val !== undefined).setSection(val);
				});
				updateIfChanged(props.valueColorGradient, prev.valueColorGradient, (val?: gradientWrapper) => {
					gauge.setGradientActive(val !== undefined).setGradient(val);
				});

				updateIfChanged(this.props.value, prev.value, () => {
					this.props.animate
						? this.gauge.setValueAnimated(this.props.value, this.props.animationCallback)
						: this.gauge.setValue(this.props.value);
				});
				updateIfChanged(props.trend, prev.trend, gauge.setTrend.bind(gauge));
				updateIfChanged(props.userLedOn, prev.userLedOn, gauge.setUserLedOnOff.bind(gauge));
				updateIfChanged(props.userLedBlink, prev.userLedBlink, gauge.blinkUserLed.bind(gauge));
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}
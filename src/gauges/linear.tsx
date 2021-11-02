import React from "react";
import { Linear as ssLinear, LinearParams } from "steelseries";
import { definedAndChanged, updateIfChanged } from "../tools";


interface Props extends LinearParams {
	width: number;
	height: number;

	value?: number;
	minMeasuredValue?: number;
	maxMeasuredValue?: number;

	animate?: boolean;
	animationCallback?: () => void;

	resetValueOnBoundsChange?: boolean;
}


export class Linear extends React.Component<Props> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssLinear;

	constructor(props: Props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		if(this.canvasRef.current) {
			this.gauge = new ssLinear(this.canvasRef.current, {
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
				ledVisible: this.props.ledVisible,

				valueColor: this.props.valueColor,
				minValue: this.props.minValue,
				maxValue: this.props.maxValue,
				minMeasuredValueVisible: this.props.minMeasuredValueVisible,
				maxMeasuredValueVisible: this.props.maxMeasuredValueVisible,
				niceScale: this.props.niceScale,
				labelNumberFormat: this.props.labelNumberFormat,
				threshold: this.props.threshold,
				thresholdRising: this.props.thresholdRising,
				thresholdVisible: this.props.thresholdVisible,
				fullScaleDeflectionTime: this.props.fullScaleDeflectionTime,
				playAlarm: this.props.playAlarm,
				alarmSound: this.props.alarmSound,

				titleString: this.props.titleString,
				unitString: this.props.unitString,
			});

			if(this.props.value) {
				this.props.animate
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
	}

	gaugeShouldRepaint(prev: Props) {
		return (this.props.width !== prev.width)
			|| (this.props.height !== prev.height)
			|| definedAndChanged(this.props.gaugeType, prev.gaugeType)
			|| definedAndChanged(this.props.frameVisible, prev.frameVisible)
			|| definedAndChanged(this.props.backgroundVisible, prev.backgroundVisible)
			|| definedAndChanged(this.props.foregroundVisible, prev.foregroundVisible)
			|| definedAndChanged(this.props.digitalFont, prev.digitalFont)
			|| definedAndChanged(this.props.lcdVisible, prev.lcdVisible)
			|| definedAndChanged(this.props.niceScale, prev.niceScale)
			|| definedAndChanged(this.props.labelNumberFormat, prev.labelNumberFormat)
			|| definedAndChanged(this.props.playAlarm, prev.playAlarm)
			|| definedAndChanged(this.props.alarmSound, prev.alarmSound)
			|| definedAndChanged(this.props.fullScaleDeflectionTime, prev.fullScaleDeflectionTime);
	}

	componentDidUpdate(prev: Props) {
		if(this.gauge) {
			if(this.gaugeShouldRepaint(prev)) {
				this.componentDidMount();
			}
			else {
				const { props, gauge } = this;

				updateIfChanged(props.frameDesign, prev.frameDesign, gauge.setFrameDesign.bind(gauge));
				updateIfChanged(props.backgroundColor, prev.backgroundColor, gauge.setBackgroundColor.bind(gauge));
				
				updateIfChanged(props.lcdColor, prev.lcdColor, gauge.setLcdColor.bind(gauge));
				updateIfChanged(props.lcdDecimals, prev.lcdDecimals, gauge.setLcdDecimals.bind(this));
				updateIfChanged(props.ledColor, prev.ledColor, gauge.setLedColor.bind(gauge));
				updateIfChanged(props.ledVisible, prev.ledVisible, gauge.setLedVisible.bind(gauge));
				updateIfChanged(props.valueColor, prev.valueColor, gauge.setValueColor.bind(gauge));
				
				updateIfChanged(props.threshold, prev.threshold, gauge.setThreshold.bind(gauge));
				updateIfChanged(props.thresholdRising, prev.thresholdRising, gauge.setThresholdRising.bind(gauge));
				updateIfChanged(props.thresholdVisible, prev.thresholdVisible, gauge.setThresholdVisible.bind(gauge));

				updateIfChanged(props.titleString, prev.titleString, gauge.setTitleString.bind(gauge));
				updateIfChanged(props.unitString, prev.unitString, gauge.setUnitString.bind(gauge));

				let minUpd = updateIfChanged(props.minValue, prev.minValue, gauge.setMinValue.bind(gauge));
				let maxUpd = updateIfChanged(props.maxValue, prev.maxValue, gauge.setMaxValue.bind(gauge));

				if((minUpd || maxUpd) && props.resetValueOnBoundsChange && props.animate) {
					gauge.setValue(gauge.getMinValue());
				}

				updateIfChanged(props.minMeasuredValue, prev.minMeasuredValue, gauge.setMinMeasuredValue.bind(gauge));
				updateIfChanged(props.minMeasuredValueVisible, prev.minMeasuredValueVisible, gauge.setMinMeasuredValueVisible.bind(gauge));
				updateIfChanged(props.maxMeasuredValue, props.maxMeasuredValue, gauge.setMaxMeasuredValue.bind(gauge));
				updateIfChanged(props.maxMeasuredValueVisible, prev.maxMeasuredValueVisible, gauge.setMaxMeasuredValueVisible.bind(gauge));

				updateIfChanged(props.value, prev.value, () => {
					props.animate
						? gauge.setValueAnimated(props.value, props.animationCallback)
						: gauge.setValue(props.value);
				});
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}

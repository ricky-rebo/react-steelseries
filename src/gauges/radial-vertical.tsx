import React from "react";
import { RadialVertical as ssRadialVertical, RadialVerticalParams, Section } from "steelseries";
import { updateIfChanged } from "../tools";

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

export class RadialVertical extends React.Component<Props> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssRadialVertical;

	constructor(props: Props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount(animate: boolean = true) {
		if(this.canvasRef.current) {
			this.gauge = new ssRadialVertical(this.canvasRef.current, {
				size: this.props.size,
				orientation: this.props.orientation,

				frameDesign: this.props.frameDesign,//
				frameVisible: this.props.frameVisible,
				backgroundColor: this.props.backgroundColor,//
				backgroundVisible: this.props.backgroundVisible,
				foregroundType: this.props.foregroundType,//
				foregroundVisible: this.props.foregroundVisible,

				knobType: this.props.knobType,
				knobStyle: this.props.knobStyle,
				pointerType: this.props.pointerType,//
				pointerColor: this.props.pointerColor,//

				minValue: this.props.minValue,//
				maxValue: this.props.maxValue,//
				minMeasuredValueVisible: this.props.showMinMeasuredValue,//
				maxMeasuredValueVisible: this.props.showMaxMeasuredValue,//
				niceScale: this.props.niceScale,
				labelNumberFormat: this.props.labelNumberFormat,
				threshold: this.props.threshold,
				thresholdRising: this.props.thresholdRising,//
				thresholdVisible: (this.props.showThreshold === undefined) ? false : this.props.showThreshold,//
				fullScaleDeflectionTime: this.props.fullScaleDeflectionTime,
				playAlarm: this.props.playAlarm,
				alarmSound: this.props.alarmSound,

				titleString: this.props.titleString,
				unitString: this.props.unitString,

				ledColor: this.props.ledColor,//
				ledVisible: (this.props.showLed === undefined) ? false : this.props.showLed,//

				section: this.props.sections,
				area: this.props.sectors
			});

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
	}

	gaugeShouldRepaint(prev: Props) {
		return (this.props.size !== prev.size)
			|| (this.props.orientation !== prev.orientation)
			|| (this.props.frameVisible !== prev.frameVisible)
			|| (this.props.backgroundVisible !== prev.backgroundVisible)
			|| (this.props.foregroundVisible !== prev.foregroundVisible)
			|| (this.props.knobType !== prev.knobType)
			|| (this.props.knobStyle !== prev.knobStyle)
			|| (this.props.niceScale !== prev.niceScale)
			|| (this.props.labelNumberFormat !== prev.labelNumberFormat)
			|| (this.props.showThreshold !== prev.showThreshold)
			|| (this.props.threshold !== prev.threshold)
			|| (this.props.fullScaleDeflectionTime !== prev.fullScaleDeflectionTime)
			|| (this.props.playAlarm !== prev.playAlarm)
			|| (this.props.alarmSound !== prev.alarmSound)
			|| (this.props.titleString !== prev.titleString)
			|| (this.props.unitString !== prev.unitString)
			|| (this.props.sections !== prev.sections)
			|| (this.props.sectors !== prev.sectors);
	}

	componentDidUpdate(prev: Props) {
		if(this.gauge) {
			if(this.gaugeShouldRepaint(prev)) {
				this.componentDidMount((this.props.maxValue!==prev.maxValue || this.props.minValue!==prev.minValue) && this.props.resetValueOnBoundsChange);
			}
			else {
				const { props, gauge } = this;

				updateIfChanged(props.frameDesign, prev.frameDesign, gauge.setFrameDesign.bind(gauge));
				updateIfChanged(props.backgroundColor, prev.backgroundColor, gauge.setBackgroundColor.bind(gauge));
				updateIfChanged(props.foregroundType, prev.foregroundType, gauge.setForegroundType.bind(gauge));

				updateIfChanged(props.pointerType, prev.pointerType, gauge.setPointerType.bind(gauge));
				updateIfChanged(props.pointerColor, prev.pointerColor, gauge.setPointerColor.bind(gauge));

				const minUpd = updateIfChanged(props.minValue, prev.minValue, gauge.setMinValue.bind(gauge));
				const maxUpd = updateIfChanged(props.maxValue, prev.maxValue, gauge.setMaxValue.bind(gauge));
				if((minUpd || maxUpd) && props.resetValueOnBoundsChange && props.animate) {
					gauge.setValue(gauge.getMinValue());
				}
				
				updateIfChanged(props.showMinMeasuredValue, prev.showMinMeasuredValue, gauge.setMinMeasuredValueVisible.bind(gauge));
				updateIfChanged(props.showMaxMeasuredValue, prev.showMaxMeasuredValue, gauge.setMaxMeasuredValueVisible.bind(gauge));
				updateIfChanged(props.thresholdRising, prev.thresholdRising, gauge.setThresholdRising.bind(gauge));
				
				// BUG in 'steelseries' library
				// RadialVertical.setThresholdVisible might not work properly
				// thresholdVisible update detection moved in gaugeShouldRepaint()
				// updateIfChanged(props.thresholdVisible, prev.thresholdVisible, gauge.setThresholdVisible.bind(gauge));

				updateIfChanged(props.ledColor, prev.ledColor, gauge.setLedColor.bind(gauge));
				updateIfChanged(props.showLed, prev.showLed, gauge.setLedVisible.bind(gauge));

				updateIfChanged(props.minMeasuredValue, prev.minMeasuredValue, gauge.setMinMeasuredValue.bind(gauge));
				updateIfChanged(props.maxMeasuredValue, prev.maxMeasuredValue, gauge.setMaxMeasuredValue.bind(gauge));
				updateIfChanged(this.props.value, prev.value, () => {
					this.props.animate
						? this.gauge.setValueAnimated(this.props.value, this.props.animationCallback)
						: this.gauge.setValue(this.props.value);
				});
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}
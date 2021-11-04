import React from "react";
import { ColorDef, PointerType, Section, WindDirection as ssWindDirection, WindDirectionParams } from "steelseries";
import { updateIfChanged } from "../tools";

type ExcludedParams = "area" | "section"
	| "pointerTypeLatest" | "pointerTypeAverage"
	| "pointerColor" | "pointerColorAverage"
	| "roseVisible";
interface Props extends Omit<WindDirectionParams, ExcludedParams> {
	size: number;

	sections?: Section[];
	sectors?: Section[];

	lstPointerType?: PointerType;
	avgPointerType?: PointerType;
	lstPointerColor?: ColorDef;
	avgPointerColor?: ColorDef;

	showRose?: boolean;

	ltsValue?: number;
	avgValue?: number;

	animate?: boolean;
	lstAnimationCallback?: () => void;
	avgAnimationCallback?: () => void;
}

export class WindDirection extends React.Component<Props> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssWindDirection;

	constructor(props: Props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount(animate: boolean = true) {
		if(this.canvasRef.current) {
			this.gauge = new ssWindDirection(this.canvasRef.current, {
				size: this.props.size,
				
				frameDesign: this.props.frameDesign,//
				frameVisible: this.props.frameVisible,
				backgroundColor: this.props.backgroundColor,//
				backgroundVisible: this.props.backgroundVisible,
				foregroundType: this.props.foregroundType,//
				foregroundVisible: this.props.foregroundVisible,

				knobType: this.props.knobType,
				knobStyle: this.props.knobStyle,
				
				pointerTypeLatest: this.props.lstPointerType,//
				pointerTypeAverage: this.props.avgPointerType,//
				pointerColor: this.props.lstPointerColor,//
				pointerColorAverage: this.props.avgPointerColor,//

				lcdColor: this.props.lcdColor,//
				digitalFont: this.props.digitalFont,
				lcdVisible: this.props.lcdVisible,

				section: this.props.sections,//
				area: this.props.sectors,//
				fullScaleDeflectionTime: this.props.fullScaleDeflectionTime,
				pointSymbols: this.props.pointSymbols,//
				pointSymbolsVisible: this.props.pointSymbolsVisible,
				degreeScale: this.props.degreeScale,
				degreeScaleHalf: this.props.degreeScaleHalf,
				roseVisible: this.props.showRose,
				lcdTitleStrings: this.props.lcdTitleStrings,//
				titleString: this.props.titleString,
				useColorLabels: this.props.useColorLabels,

				customLayer: this.props.customLayer
			});

			if(this.props.ltsValue) {
				this.props.animate && animate
					? this.gauge.setValueAnimatedLatest(this.props.ltsValue, this.props.lstAnimationCallback)
					: this.gauge.setValueLatest(this.props.ltsValue);
			}

			if(this.props.avgValue) {
				this.props.animate && animate
					? this.gauge.setValueAnimatedAverage(this.props.avgValue, this.props.avgAnimationCallback)
					: this.gauge.setValueAverage(this.props.avgValue);
			}
		}
	}

	gaugeShouldRepaint(prev: Props) {
		return (this.props.size !== prev.size)
			|| (this.props.frameVisible !== prev.frameVisible)
			|| (this.props.backgroundVisible !== prev.backgroundVisible)
			|| (this.props.foregroundVisible !== prev.foregroundVisible)
			|| (this.props.knobType !== prev.knobType)
			|| (this.props.knobStyle !== prev.knobStyle)
			|| (this.props.digitalFont !== prev.digitalFont)
			|| (this.props.lcdVisible !== prev.lcdVisible)
			|| (this.props.fullScaleDeflectionTime !== prev.fullScaleDeflectionTime)
			|| (this.props.pointSymbolsVisible !== prev.pointSymbolsVisible)
			|| (this.props.degreeScale !== prev.degreeScale)
			|| (this.props.degreeScaleHalf !== prev.degreeScaleHalf)
			|| (this.props.showRose !== prev.showRose)
			|| (this.props.titleString !== prev.titleString)
			|| (this.props.useColorLabels !== prev.useColorLabels)
			|| (this.props.customLayer !== prev.customLayer);
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

				updateIfChanged(props.lstPointerType, prev.lstPointerType, gauge.setPointerType.bind(gauge));
				updateIfChanged(props.avgPointerType, prev.avgPointerType, gauge.setPointerTypeAverage.bind(gauge));
				updateIfChanged(props.lstPointerColor, prev.lstPointerColor, gauge.setPointerColor.bind(gauge));
				updateIfChanged(props.avgPointerColor, prev.avgPointerColor, gauge.setPointerColorAverage.bind(gauge));

				updateIfChanged(props.lcdColor, prev.lcdColor, gauge.setLcdColor.bind(gauge));

				updateIfChanged(props.sections, prev.sections, gauge.setSection.bind(gauge));
				updateIfChanged(props.sectors, prev.sectors, gauge.setArea.bind(gauge));
				updateIfChanged(props.pointSymbols, prev.pointSymbols, gauge.setPointSymbols.bind(gauge));
				updateIfChanged(props.lcdTitleStrings, prev.lcdTitleStrings, gauge.setLcdTitleStrings.bind(gauge));
				updateIfChanged(props.ltsValue, prev.ltsValue, () => {
					this.props.animate
					? this.gauge.setValueAnimatedLatest(this.props.ltsValue, this.props.lstAnimationCallback)
					: this.gauge.setValueLatest(this.props.ltsValue);
				});
				updateIfChanged(props.avgValue, prev.avgValue, () => {
					this.props.animate
					? this.gauge.setValueAnimatedAverage(this.props.avgValue, this.props.avgAnimationCallback)
					: this.gauge.setValueAverage(this.props.avgValue);
				});
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}
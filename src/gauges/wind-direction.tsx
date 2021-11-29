import { ColorDef, PointerType, Section, WindDirection as ssWindDirection, WindDirectionParams } from "steelseries";

import GaugeComponent from "./gauge-component";


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


export class WindDirection extends GaugeComponent<Props, ssWindDirection, WindDirectionParams> {
	GaugeClass = ssWindDirection;
	ignoredProps = ["animate", "lstAnimationCallback", "avgAnimationCallback"];

	getGaugeParams = () => ({
		size: this.props.size,
		
		frameDesign: this.props.frameDesign,
		frameVisible: this.props.frameVisible,
		backgroundColor: this.props.backgroundColor,
		backgroundVisible: this.props.backgroundVisible,
		foregroundType: this.props.foregroundType,
		foregroundVisible: this.props.foregroundVisible,

		knobType: this.props.knobType,
		knobStyle: this.props.knobStyle,
		
		pointerTypeLatest: this.props.lstPointerType,
		pointerTypeAverage: this.props.avgPointerType,
		pointerColor: this.props.lstPointerColor,
		pointerColorAverage: this.props.avgPointerColor,

		lcdColor: this.props.lcdColor,
		digitalFont: this.props.digitalFont,
		lcdVisible: this.props.lcdVisible,

		section: this.props.sections,
		area: this.props.sectors,
		fullScaleDeflectionTime: this.props.fullScaleDeflectionTime,
		pointSymbols: this.props.pointSymbols,
		pointSymbolsVisible: this.props.pointSymbolsVisible,
		degreeScale: this.props.degreeScale,
		degreeScaleHalf: this.props.degreeScaleHalf,
		roseVisible: this.props.showRose,
		lcdTitleStrings: this.props.lcdTitleStrings,
		titleString: this.props.titleString,
		useColorLabels: this.props.useColorLabels,

		customLayer: this.props.customLayer
	})

	gaugePostInit(animate: boolean) {
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

	setFrameDesign() {
		this.gauge.setFrameDesign(this.props.frameDesign);
	}

	setBackgroundColor() {
		this.gauge.setBackgroundColor(this.props.backgroundColor);
	}

	setForegroundType() {
		this.gauge.setForegroundType(this.props.foregroundType);
	}

	setLstPointerType() {
		this.gauge.setPointerType(this.props.lstPointerType);
	}

	setAvgPointerType() {
		this.gauge.setPointerTypeAverage(this.props.avgPointerType);
	}

	setLstPointerColor() {
		this.gauge.setPointerColor(this.props.lstPointerColor);
	}

	setAvgPointerColor() {
		this.gauge.setPointerColorAverage(this.props.avgPointerColor);
	}

	setLcdColor() {
		this.gauge.setLcdColor(this.props.lcdColor);
	}

	setSections() {
		this.gauge.setSection(this.props.sections);
	}

	setSectors() {
		this.gauge.setArea(this.props.sectors);
	}

	setPointSymbols() {
		this.gauge.setPointSymbols(this.props.pointSymbols);
	}

	setLcdTitleStrings() {
		this.gauge.setLcdTitleStrings(this.props.lcdTitleStrings);
	}

	setLstValue() {
		if(this.props.animate) {
			this.gauge.setValueAnimatedLatest(this.props.ltsValue, this.props.lstAnimationCallback);
		}
		else {
			this.gauge.setValueLatest(this.props.ltsValue);
		}
	}

	setAvgValue() {
		if(this.props.animate) {
			this.gauge.setValueAnimatedAverage(this.props.avgValue, this.props.avgAnimationCallback);
		}
		else {
			this.gauge.setValueAverage(this.props.avgValue);
		}
	}
}
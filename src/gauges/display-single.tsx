import GaugeComponent from "./gauge-component";
import { DisplaySingle as ssDisplaySingle, DisplaySingleParams } from "steelseries";



type ExcludedParams = "headerStringVisible"
	|"unitStringVisible"
	|"alwaysScroll";
interface Props extends Omit<DisplaySingleParams, ExcludedParams> {
	width: number;
	height: number;

	showHeaderString?: boolean;
	showUnitString?: boolean;

	infiniteScroll?: boolean;
}


export class DisplaySingle extends GaugeComponent<Props, ssDisplaySingle, DisplaySingleParams> {
	GaugeClass = ssDisplaySingle;

	getGaugeParams: () => DisplaySingleParams = () => ({
		width: this.props.width,
		height: this.props.height,
		section: this.props.section,
		headerString: this.props.headerString, //solo se valuesNumeric = false
		headerStringVisible: this.props.showHeaderString,
		unitString: this.props.unitString, // solo se valuesNumeric = false
		unitStringVisible: this.props.showUnitString,
		valuesNumeric: this.props.valuesNumeric,
		value: this.props.value,
		alwaysScroll: this.props.infiniteScroll, // solo se valuesNumeric = false (scroll sempre)
		autoScroll: this.props.autoScroll, // solo se valuesNumeric = false (scroll se txtLenght > gaugeLenght)

		lcdColor: this.props.lcdColor,
		digitalFont: this.props.digitalFont,
		lcdDecimals: this.props.lcdDecimals
	});

	gaugePreInit() {
		if(this.gauge && this.props.autoScroll) {
			this.gauge.setScrolling(false);
		}
	}

	setLcdColor() {
		this.gauge.setLcdColor(this.props.lcdColor);
	}

	setSection() {
		this.gauge.setSection(this.props.section);
	}

	setInfiniteScroll() {
		this.gauge.setScrolling(this.props.infiniteScroll);
	}

	setValue() {
		this.gauge.setValue(this.props.value);
	}

	componentWillUnmount() {
		if(this.gauge) {
			this.gauge.setScrolling(false);
		}
	}
}

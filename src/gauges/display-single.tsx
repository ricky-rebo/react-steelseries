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
		headerString: this.props.headerString,
		headerStringVisible: this.props.showHeaderString,
		unitString: this.props.unitString,
		unitStringVisible: this.props.valuesNumeric,
		value: this.props.value,
		alwaysScroll: this.props.infiniteScroll,
		autoScroll: this.props.autoScroll,

		lcdColor: this.props.lcdColor,
		digitalFont: this.props.digitalFont,
		lcdDecimals: this.props.lcdDecimals
	});

	setLcdColor() {
		this.gauge.setLcdColor(this.props.lcdColor);
	}

	setSection() {
		this.gauge.setSection(this.props.section);
	}

	setAutoScroll() {
		this.gauge.setScrolling(this.props.autoScroll);
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

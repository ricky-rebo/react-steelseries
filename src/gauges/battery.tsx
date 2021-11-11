import { Battery as ssBattery, BatteryParams } from "steelseries";
import GaugeComponent from "./gauge-component";


interface Props extends BatteryParams {
	size: number;
}


export class Battery extends GaugeComponent<Props, ssBattery, BatteryParams> {
	GaugeClass = ssBattery;
	
	getGaugeParams() {
		return { size: this.props.size }
	}

	gaugePostInit() {
		if(this.props.value) { 
			this.gauge.setValue(this.props.value);
		}
	}

	setValue() {
		this.log("set value");
		this.gauge.setValue(this.props.value);
	}
}

import GaugeComponent from "./gauge-component";
import { Led as ssLed, LedParams } from "steelseries";



interface Props extends LedParams {
	size: number;
	on?: boolean;
	blink?: boolean;
}


export class Led extends GaugeComponent<Props, ssLed, LedParams> {
	GaugeClass = ssLed;

	getGaugeParams = () => ({
		size: this.props.size,
		ledColor: this.props.ledColor
	});

	gaugePreInit() {
		if(this.gauge) {
			this.gauge.blink(false);
		}	
	}

	gaugePostInit() {
		if(this.props.on !== undefined) {
			this.gauge.setLedOnOff(this.props.on);
		}
	
		if(this.props.blink !== undefined) {
			this.gauge.blink(this.props.blink);
		}
	}

	setLedColor() {
		this.gauge.setLedColor(this.props.ledColor);
	}

	setOn() {
		this.gauge.setLedOnOff(this.props.on);
	}

	setBlink() {
		this.gauge.blink(this.props.blink);

		// when disabling blinking, bring back led to previous state
		if(!this.props.blink) {
			this.gauge.setLedOnOff((this.props.on === undefined) ? false : this.props.on);
		}
	}

	componentWillUnmount() {
		this.gaugePreInit()
	}
}

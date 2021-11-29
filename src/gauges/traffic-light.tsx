import React from "react";
import { Trafficlight as ssTrafficLight, TrafficlightParams } from "steelseries";
import { updateIfChanged } from "../tools";
import GaugeComponent from "./gauge-component";


interface Props extends TrafficlightParams {
	width: number;
	height: number;

	red?: boolean;
	yellow?: boolean;
	green?: boolean;
}

export class Trafficlight extends GaugeComponent<Props, ssTrafficLight, TrafficlightParams> {
	GaugeClass = ssTrafficLight;

	getGaugeParams = () => ({
		width: this.props.width,
		height: this.props.height
	});

	gaugePostInit() {
		if(this.props.red) {
			this.gauge.setRedOn(this.props.red);
		}

		if(this.props.yellow) {
			this.gauge.setYellowOn(this.props.yellow);
		}

		if(this.props.green) {
			this.gauge.setGreenOn(this.props.green);
		}
	}

	setRed() {
		this.log();
		this.gauge.setRedOn(this.props.red);
	}

	setYellow() {
		this.log();
		this.gauge.setYellowOn(this.props.yellow);
	}

	setGreen() {
		this.log();
		this.gauge.setGreenOn(this.props.green);
	}
}

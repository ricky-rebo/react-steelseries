import { Clock as ssClock, ClockParams } from "steelseries";
import GaugeComponent from "./gauge-component";


interface Props extends Partial<Omit<ClockParams, "hour"|"minute"|"second"|"secondMovesContinuous">> {
	size: number;
	value: Date;

	secondPointerTick?: boolean;
}


export class Clock extends GaugeComponent<Props, ssClock, ClockParams> {
	GaugeClass = ssClock;

	getGaugeParams() {
		return {
			frameDesign: this.props.frameDesign,
			frameVisible: this.props.frameVisible,
			backgroundColor: this.props.backgroundColor,
			backgroundVisible: this.props.backgroundVisible,
			foregroundType: this.props.foregroundType,
			foregroundVisible: this.props.foregroundVisible,
			pointerType: this.props.pointerType,
			pointerColor: this.props.pointerColor,
			size: this.props.size,

			hour: this.props.value.getHours(),
			minute: this.props.value.getMinutes(),
			second: this.props.value.getSeconds(),

			/* Should be opional, but they're not... */
			// BUG fix in @types/steelseries
			timeZoneOffsetHour: this.props.timeZoneOffsetHour === undefined ? 0 : this.props.timeZoneOffsetHour,
			timeZoneOffsetMinute: this.props.timeZoneOffsetMinute === undefined ? 0 : this.props.timeZoneOffsetMinute,
			isAutomatic: this.props.isAutomatic === undefined ? true : this.props.isAutomatic,
			
			secondMovesContinuous: this.props.secondPointerTick === undefined ? true : !this.props.secondPointerTick,
			secondPointerVisible: this.props.secondPointerVisible === undefined ? true : this.props.secondPointerVisible,
	
			customLayer: this.props.customLayer
		}
	}

	gaugePostInit() {}

	setFrameDesign() {
		this.cl(`set frameDesign`);
		if(this.gauge) {
			this.gauge.setFrameDesign(this.props.frameDesign);
		}
	}

	setBackgroundColor() {
		this.cl(`set backgroundColor`)
		if(this.gauge) {
			this.gauge.setBackgroundColor(this.props.backgroundColor);
		}
	}

	setForegroundType() {
		this.cl(`set foregrundType`);
		if(this.gauge) {
			this.gauge.setForegroundType(this.props.foregroundType);
		}
	}

	setPointerType() {
		this.cl("set pointerType");
		if(this.gauge) {
			this.gauge.setPointerType(this.props.pointerType);
		}
	}

	setPointerColor() {
		this.cl("set pointerColor");
		if(this.gauge) {
			this.gauge.setPointerColor(this.props.pointerColor);
		}
	}

	setIsAutomatic() {
		this.cl("set isAutomatic");
		if(this.gauge) {
			this.gauge.setAutomatic(this.props.isAutomatic);
		}
	}

	setTimeZoneOffsetHour() {
		this.cl("set timeZoneOffsetHour");
		if(this.gauge) {
			this.gauge.setTimeZoneOffsetHour(this.props.timeZoneOffsetHour);
		}
	}

	setTimeZoneOffsetMinute() {
		this.cl("set timeZoneOffsetMinute");
		if(this.gauge) {
			this.gauge.setTimeZoneOffsetMinute(this.props.timeZoneOffsetMinute);
		}
	}

	setSecondPointerVisible() {
		this.cl("set secondPointerVisible");
		if(this.gauge) {
			this.gauge.setSecondPointerVisible(this.props.secondPointerVisible);
		}
	}

	setSecondPointerTick() {
		this.cl("set secondPointerTick");
		if(this.gauge) {
			this.gauge.setSecondMovesContinuous(!this.props.secondPointerTick);
		}
	}

	setValue() {
		this.cl("set value");
		if(this.gauge) {
			this.gauge.setHour(this.props.value.getHours())
				.setMinute(this.props.value.getMinutes())
				.setSecond(this.props.value.getSeconds());
		}
	}

	componentWillUnmount() {
		if(this.gauge) {
			this.gauge.setAutomatic(false);
		}
	}
}

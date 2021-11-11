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

	setFrameDesign() {
		this.log(`set frameDesign`);
		this.gauge.setFrameDesign(this.props.frameDesign);
	}

	setBackgroundColor() {
		this.log(`set backgroundColor`)
		this.gauge.setBackgroundColor(this.props.backgroundColor);
	}

	setForegroundType() {
		this.log(`set foregrundType`);
		this.gauge.setForegroundType(this.props.foregroundType);
	}

	setPointerType() {
		this.log("set pointerType");
		this.gauge.setPointerType(this.props.pointerType);
	}

	setPointerColor() {
		this.log("set pointerColor");
		this.gauge.setPointerColor(this.props.pointerColor);
	}

	setIsAutomatic() {
		this.log("set isAutomatic");
		this.gauge.setAutomatic(this.props.isAutomatic);
	}

	setTimeZoneOffsetHour() {
		this.log("set timeZoneOffsetHour");
		this.gauge.setTimeZoneOffsetHour(this.props.timeZoneOffsetHour);
	}

	setTimeZoneOffsetMinute() {
		this.log("set timeZoneOffsetMinute");
		this.gauge.setTimeZoneOffsetMinute(this.props.timeZoneOffsetMinute);
	}

	setSecondPointerVisible() {
		this.log("set secondPointerVisible");
		this.gauge.setSecondPointerVisible(this.props.secondPointerVisible);
	}

	setSecondPointerTick() {
		this.log("set secondPointerTick");
		this.gauge.setSecondMovesContinuous(!this.props.secondPointerTick);
	}

	setValue() {
		this.log("set value");
		this.gauge.setHour(this.props.value.getHours())
			.setMinute(this.props.value.getMinutes())
			.setSecond(this.props.value.getSeconds());
	}

	componentWillUnmount() {
		if(this.gauge) {
			this.gauge.setAutomatic(false);
		}
	}
}

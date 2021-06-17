import React from "react";
import { Clock as ssClock, ClockParams } from "steelseries";
import { definedAndChanged } from "../tools";


interface Props extends Partial<ClockParams> {
	size: number;
	hour: number;
	minute: number;
	second: number;
}


export class Clock extends React.Component<Props> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssClock;

	constructor(props: Props) {
		super(props);

		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		if(this.canvasRef.current) {
			this.gauge = new ssClock(this.canvasRef.current, {
				frameDesign: this.props.frameDesign,
				frameVisible: this.props.frameVisible,
				backgroundColor: this.props.backgroundColor,
				backgroundVisible: this.props.backgroundVisible,
				foregroundType: this.props.foregroundType,
				foregroundVisible: this.props.foregroundVisible,
				pointerType: this.props.pointerType,
				pointerColor: this.props.pointerColor,
				size: this.props.size,
	
				hour: this.props.hour,
				minute: this.props.minute,
				second: this.props.second,
	
				/* Should be opional, but they're not... */
				timeZoneOffsetHour: this.props.timeZoneOffsetHour === undefined ? 0 : this.props.timeZoneOffsetHour,
				timeZoneOffsetMinute: this.props.timeZoneOffsetMinute === undefined ? 0 : this.props.timeZoneOffsetMinute,
				isAutomatic: this.props.isAutomatic === undefined ? true : this.props.isAutomatic,
				secondMovesContinuous: this.props.secondMovesContinuous === undefined ? true : this.props.secondMovesContinuous,
				secondPointerVisible: this.props.secondPointerVisible === undefined ? true : this.props.secondPointerVisible,
		
				customLayer: this.props.customLayer
			});
		}
	}

	componentDidUpdate(prev: Props) {
		if(this.canvasRef.current) {
			if(this.props.size !== prev.size) {
				// FIX stop the clock before redrawing it, otherwise animation breaks 
				this.gauge.setAutomatic(false);
				this.componentDidMount();
				return;
			}

			const { props } = this;

			if(definedAndChanged(props.frameDesign, prev.frameDesign)) {
				this.gauge.setFrameDesign(props.frameDesign);
			}

			if(definedAndChanged(props.backgroundColor, prev.backgroundColor)) {
				this.gauge.setBackgroundColor(props.backgroundColor);
			}

			if(definedAndChanged(props.foregroundType, prev.foregroundType)) {
				this.gauge.setForegroundType(props.foregroundType);
			}

			if(definedAndChanged(props.pointerType, prev.pointerType)) {
				this.gauge.setPointerType(props.pointerType);
			}

			if(definedAndChanged(props.pointerColor, prev.pointerColor)) {
				this.gauge.setPointerColor(props.pointerColor);
			}

			if(definedAndChanged(props.isAutomatic, prev.isAutomatic)) {
				this.gauge.setAutomatic(props.isAutomatic);
			}

			if(definedAndChanged(props.timeZoneOffsetHour, prev.timeZoneOffsetHour)) {
				this.gauge.setTimeZoneOffsetHour(props.timeZoneOffsetHour);
			}

			if(definedAndChanged(props.timeZoneOffsetMinute, prev.timeZoneOffsetMinute)) {
				this.gauge.setTimeZoneOffsetMinute(props.timeZoneOffsetMinute);
			}

			if(definedAndChanged(props.secondPointerVisible, prev.secondPointerVisible)) {
				this.gauge.setSecondPointerVisible(props.secondPointerVisible);
			}

			if(definedAndChanged(props.secondMovesContinuous, prev.secondMovesContinuous)) {
				this.gauge.setSecondMovesContinuous(props.secondMovesContinuous);
			}
			
			if(props.hour !== prev.hour) {
				this.gauge.setHour(props.hour);
			}

			if(props.minute !== prev.minute) {
				this.gauge.setMinute(props.minute);
			}
			
			if(props.second !== prev.second) {
				this.gauge.setSecond(props.second);
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}

import React from "react";
import { Clock as ssClock, ClockParams } from "steelseries";


interface Props extends Partial<ClockParams> {
	size: number;
	hour: number;
	minute: number;
	second: number;
}


export class Clock extends React.Component<Props, {}> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	gauge: ssClock;

	constructor(props: Props) {
		super(props);

		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		if(this.canvasRef.current) {
			this.gauge = init_gauge(this.canvasRef.current, this.props);
		}
	}

	componentDidUpdate(prev: Props) {
		if(this.canvasRef.current) {
			const { props } = this;
			if(props.size !== prev.size) {
				this.gauge = init_gauge(this.canvasRef.current, this.props);
			}
			else {
				if(props.frameDesign && props.frameDesign !== prev.frameDesign)
					this.gauge.setFrameDesign(props.frameDesign);

				if(props.backgroundColor && props.backgroundColor !== prev.backgroundColor)
					this.gauge.setBackgroundColor(props.backgroundColor);

				if(props.foregroundType && props.foregroundType !== prev.foregroundType)
					this.gauge.setForegroundType(props.foregroundType);

				if(props.pointerType && props.pointerType !== prev.pointerType)
					this.gauge.setPointerType(props.pointerType);

				if(props.pointerColor && props.pointerColor !== prev.pointerColor)
					this.gauge.setPointerColor(props.pointerColor);

				if(props.isAutomatic !== undefined && props.isAutomatic !== prev.isAutomatic)
					this.gauge.setAutomatic(props.isAutomatic);

				if(props.timeZoneOffsetHour !== undefined && props.timeZoneOffsetHour !== prev.timeZoneOffsetHour)
					this.gauge.setTimeZoneOffsetHour(props.timeZoneOffsetHour);

				if(props.timeZoneOffsetMinute !== undefined && props.timeZoneOffsetMinute !== prev.timeZoneOffsetMinute)
					this.gauge.setTimeZoneOffsetMinute(props.timeZoneOffsetMinute);

				if(props.secondPointerVisible !== undefined && props.secondPointerVisible !== prev.secondPointerVisible)
					this.gauge.setSecondPointerVisible(props.secondPointerVisible);

				if(props.secondMovesContinuous !== undefined && props.secondMovesContinuous !== prev.secondMovesContinuous)
					this.gauge.setSecondMovesContinuous(props.secondMovesContinuous);
				
				if(props.hour !== prev.hour)
					this.gauge.setHour(props.hour);

				if(props.minute !== prev.minute)
					this.gauge.setMinute(props.minute);
				
				if(props.second !== prev.second)
					this.gauge.setSecond(props.second);
			}
		}
	}

	render() {
		return <canvas ref={this.canvasRef} width={this.props.size} height={this.props.size}></canvas>
	}
}


function init_gauge(canvas: HTMLCanvasElement, params: Props): ssClock {
		const gauge = new ssClock(canvas, {
			frameDesign: params.frameDesign,
			frameVisible: params.frameVisible,
			backgroundColor: params.backgroundColor,
			backgroundVisible: params.backgroundVisible,
			foregroundType: params.foregroundType,
			foregroundVisible: params.foregroundVisible,
			pointerType: params.pointerType,
			pointerColor: params.pointerColor,
			size: params.size,

			hour: params.hour,
			minute: params.minute,
			second: params.second,

			/* Should be opional, but they're not... */
			timeZoneOffsetHour: params.timeZoneOffsetHour === undefined ? 0 : params.timeZoneOffsetHour,
			timeZoneOffsetMinute: params.timeZoneOffsetMinute === undefined ? 0 : params.timeZoneOffsetMinute,
			isAutomatic: params.isAutomatic === undefined ? true : params.isAutomatic,
			secondMovesContinuous: params.secondMovesContinuous === undefined ? true : params.secondMovesContinuous,
			secondPointerVisible: params.secondPointerVisible === undefined ? true : params.secondPointerVisible,
	
			customLayer: params.customLayer
		});

		return gauge;
	}

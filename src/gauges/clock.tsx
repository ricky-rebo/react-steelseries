import React from "react";
import { Clock as ssClock, ClockParams } from "steelseries";
import { definedAndChanged, updateIfChanged } from "../tools";


interface Props extends Partial<Omit<ClockParams, "hour"|"minute"|"second|">> {
	size: number;
	value: Date;
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
	
				hour: this.props.value.getHours(),
				minute: this.props.value.getMinutes(),
				second: this.props.value.getSeconds(),
	
				/* Should be opional, but they're not... */
				// BUG fix in @types/steelseries
				timeZoneOffsetHour: this.props.timeZoneOffsetHour === undefined ? 0 : this.props.timeZoneOffsetHour,
				timeZoneOffsetMinute: this.props.timeZoneOffsetMinute === undefined ? 0 : this.props.timeZoneOffsetMinute,
				isAutomatic: this.props.isAutomatic === undefined ? true : this.props.isAutomatic,
				secondMovesContinuous: this.props.secondMovesContinuous === undefined ? true : this.props.secondMovesContinuous,
				secondPointerVisible: this.props.secondPointerVisible === undefined ? true : this.props.secondPointerVisible,
		
				customLayer: this.props.customLayer
			});
		}
	}

	gaugeShouldRepaint(prev: Props) {
		return (this.props.size !== prev.size)
			|| definedAndChanged(this.props.frameVisible, prev.frameVisible)
			|| definedAndChanged(this.props.backgroundVisible, prev.backgroundVisible)
			|| definedAndChanged(this.props.foregroundVisible, prev.foregroundVisible)
			|| definedAndChanged(this.props.secondPointerVisible, prev.secondPointerVisible)
			|| definedAndChanged(this.props.customLayer, prev.customLayer);
	}

	componentDidUpdate(prev: Props) {
		if(this.canvasRef.current) {
			if(this.gaugeShouldRepaint(prev)) {
				// stop the clock before redrawing it, otherwise animation breaks 
				this.gauge.setAutomatic(false);
				this.componentDidMount();
			}
			else {
				const { props } = this;

				updateIfChanged(props.frameDesign, prev.frameDesign, this.gauge.setFrameDesign.bind(this.gauge));
				updateIfChanged(props.backgroundColor, prev.backgroundColor, this.gauge.setBackgroundColor.bind(this.gauge));
				updateIfChanged(props.foregroundType, prev.foregroundType, this.gauge.setForegroundType.bind(this.gauge));
				updateIfChanged(props.pointerType, prev.pointerType, this.gauge.setPointerType.bind(this.gauge));
				updateIfChanged(props.pointerColor, prev.pointerColor, this.gauge.setPointerColor.bind(this.gauge));

				updateIfChanged(props.isAutomatic, prev.isAutomatic, this.gauge.setAutomatic.bind(this.gauge));
				updateIfChanged(props.timeZoneOffsetHour, prev.timeZoneOffsetHour, this.gauge.setTimeZoneOffsetHour.bind(this.gauge));
				updateIfChanged(props.timeZoneOffsetMinute, prev.timeZoneOffsetMinute, this.gauge.setTimeZoneOffsetMinute.bind(this.gauge));
				updateIfChanged(props.secondPointerVisible, prev.secondPointerVisible, this.gauge.setSecondPointerVisible.bind(this.gauge));
				updateIfChanged(props.secondMovesContinuous, prev.secondMovesContinuous, this.gauge.setSecondMovesContinuous.bind(this.gauge));
				
				if(props.value.getHours() !== prev.value.getHours()) {
					this.gauge.setHour(props.value.getHours());
				}

				if(props.value.getMinutes() !== prev.value.getMinutes()) {
					this.gauge.setMinute(props.value.getMinutes());
				}
				
				if(props.value.getSeconds() !== prev.value.getSeconds()) {
					this.gauge.setSecond(props.value.getSeconds());
				}
			}
		}
	}

	// TODO stop animations in componentWillUnmount()

	render() {
		return <canvas ref={this.canvasRef}></canvas>
	}
}

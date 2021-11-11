import GaugeComponent from "./gauge-component";
import { Horizon as ssHorizon, HorizonParams } from "steelseries";


interface Props extends HorizonParams {
	size: number;
	
	roll?: number;
	pitch?: number;
	pitchOffset?: number;
	
	animate?: boolean;
	rollAnimationCallback?: () => void;
	pitchAnimationCallback?: () => void;
}


export class Horizon extends GaugeComponent<Props, ssHorizon, HorizonParams> {
	GaugeClass = ssHorizon;

	getGaugeParams = () => ({
		size: this.props.size,
		pointerColor: this.props.pointerColor,
		frameDesign: this.props.frameDesign,
		frameVisible: this.props.frameVisible,
		foregroundType: this.props.foregroundType,
		foregroundVisible: this.props.foregroundVisible
	});

	gaugePostInit(animate = true) {
		if(this.props.pitchOffset !== undefined) {
			this.gauge.setPitchOffset(this.props.pitchOffset);
		}
	
		if(this.props.roll !== undefined) {
			this.props.animate && animate
				? this.gauge.setRollAnimated(this.props.roll, this.props.rollAnimationCallback)
				: this.gauge.setRoll(this.props.roll);
		}
	
		if(this.props.pitch !== undefined) {
			this.props.animate && animate
				? this.gauge.setPitchAnimated(this.props.pitch, this.props.pitchAnimationCallback)
				: this.gauge.setPitch(this.props.pitch);
		}
	}

	setFrameDesign() {
		this.log(`set frameDesign`);
		this.gauge.setFrameDesign(this.props.frameDesign);
	}

	setForegroundType() {
		this.log(`set foregrundType`);
		this.gauge.setForegroundType(this.props.foregroundType);
	}

	setPitchOffset() {
		this.log("set pitchOffset");
		this.gauge.setPitchOffset(this.props.pitchOffset);
	}

	setPitch() {
		this.log("set pitch");
		if(this.props.animate) {
			this.gauge.setPitchAnimated(this.props.pitch, this.props.pitchAnimationCallback);
		}
		else {
			this.gauge.setPitch(this.props.pitch);
		}
	}

	setRoll() {
		this.log("set roll");
		if(this.props.animate) {
			this.gauge.setRollAnimated(this.props.roll, this.props.rollAnimationCallback);
		}
		else {
			this.gauge.setRoll(this.props.roll);
		}
	}
}

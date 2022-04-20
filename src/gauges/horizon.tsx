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
	IgnoredProps = ["animate", "rollAnimationCallback", "pitchAnimationCallback"]

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
		this.gauge.setFrameDesign(this.props.frameDesign);
	}

	setForegroundType() {
		this.gauge.setForegroundType(this.props.foregroundType);
	}

	setPitchOffset() {
		this.gauge.setPitchOffset(this.props.pitchOffset);

		// BUG in 'steelseries'
		// setPitchOffset() not working standalone
		// possible solution: replace this.repaint() with this.setPitch(pitch) in library
		this.gauge.setPitch(this.gauge.getPitch());
	}

	setPitch() {
		if(this.props.animate) {
			this.gauge.setPitchAnimated(this.props.pitch, this.props.pitchAnimationCallback);
		}
		else {
			this.gauge.setPitch(this.props.pitch);
		}
	}

	setRoll() {
		if(this.props.animate) {
			this.gauge.setRollAnimated(this.props.roll, this.props.rollAnimationCallback);
		}
		else {
			this.gauge.setRoll(this.props.roll);
		}
	}
}

import { ctx } from "./canvas.js";
import { triggerAnimation } from "./playground.js"

const lineDashSpeed = 0.5;

export let pairs = [];


export class Pair {
	constructor(qubit1, qubit2, nodeDiameter) {
		this.qubit1 = qubit1;
		this.qubit2 = qubit2;
		this.shown = false;
		this.lineDashDirection = 1;
		this.lineDashOffset = 0.0;
	}


	update() {
		if (!this.shown) return;

		this.lineDashOffset += lineDashSpeed * this.lineDashDirection;
		triggerAnimation();
	}


	draw() {
		if (!this.shown) return;

		// line
		ctx.strokeStyle = "white";
		ctx.lineDashOffset = this.lineDashOffset;
		ctx.beginPath();
		ctx.moveTo(this.qubit1.posX, this.qubit1.posY);
		ctx.lineTo(this.qubit2.posX, this.qubit2.posY);
		ctx.stroke();
	}
}


export function showPairsFromQubit(qubit) {
	for (let pair of pairs) {
		if (pair.qubit1 == qubit || pair.qubit2 == qubit) {
			pair.shown = true;
			pair.lineDashDirection = (pair.qubit1 == qubit) ? 1 : -1;
		}
	}
}


export function hideAllPairs() {
	for (let pair of pairs) {
		pair.shown = false;
	}
}


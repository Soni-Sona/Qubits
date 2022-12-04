import { ctx } from "./canvas.js";
import { triggerAnimation } from "./playground.js"

const lineDashSpeed = 0.5;
let colorShown = "#777";
let colorHighlighted = "#fff";

export let pairs = [];


export class Pair {
	constructor(qubit1, qubit2, nodeDiameter) {
		this.qubit1 = qubit1;
		this.qubit2 = qubit2;
		this.shown = false; // indicate intrication

		// showing possible interactions for gates acting on multiple qubits
		this.highlighted = false;
		this.lineDashDirection = 1;
		this.lineDashOffset = 0.0;
	}


	update() {
		if (!this.highlighted) return;

		this.lineDashOffset += lineDashSpeed * this.lineDashDirection;
		triggerAnimation();
	}


	draw() {
		if (!this.shown && !this.highlighted) return;

		// line
		ctx.strokeStyle = this.highlighted ? colorHighlighted : colorShown;
		ctx.lineDashOffset = this.lineDashOffset;
		ctx.beginPath();
		ctx.moveTo(this.qubit1.posX, this.qubit1.posY);
		ctx.lineTo(this.qubit2.posX, this.qubit2.posY);
		ctx.stroke();
	}
}


export function highlightPairsFromQubit(qubit) {
	for (let pair of pairs) {
		if (pair.qubit1 == qubit || pair.qubit2 == qubit) {
			pair.highlighted = true;
			pair.lineDashDirection = (pair.qubit1 == qubit) ? 1 : -1;
		}
	}
}


export function unhighlightAllPairs() {
	for (let pair of pairs) {
		pair.highlighted = false;
	}
}


export function showPairBetweenQubits(qubit1, qubit2) {
	for (let pair of pairs) {
		if ((pair.qubit1 == qubit1 && pair.qubit2 == qubit2)
		 || (pair.qubit1 == qubit2 && pair.qubit2 == qubit1)) {
			pair.shown = true;
		}
	}
}


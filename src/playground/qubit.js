import { qubits as physicalQubits } from "../index.js";
import { ctx } from "./canvas.js";
import { triggerAnimation } from "./playground.js";

let qubitDiameter = 100; // in pixels
let qubitNameSize = 30;
let colorStroke = "#fff";
let colorZero = "#ddd";
let colorOne  = "#aaf";
let colorNone = "#777";
let nameOpacity = 0.2;

export let qubits = []; // list of graphical qubits


export class Qubit {
	constructor(index, posX, posY) {
		this.index = index;
		this.name = String.fromCharCode(97 + index);
		this.posX = posX;
		this.posY = posY;
		this.probability = 0.0; // number or null
	}


	update() {
		
	}


	draw() {
		ctx.save()
		ctx.beginPath();
		ctx.arc(this.posX, this.posY, qubitDiameter / 2, 0, 2 * Math.PI);
		ctx.clip();

		// background color
		ctx.fillStyle = (this.probability === null) ? colorNone : colorZero
		ctx.fillRect(
			this.posX - qubitDiameter / 2,
			this.posY - qubitDiameter / 2,
			qubitDiameter,
			qubitDiameter
		);

		// probability
		if (this.probability !== null) {
			ctx.fillStyle = colorOne;
			ctx.fillRect(
				this.posX - qubitDiameter / 2,
				this.posY + qubitDiameter / 2,
				qubitDiameter,
				- this.probability * qubitDiameter
			);
		}

		ctx.restore(); // remove clip

		// stroke
		ctx.strokeStyle = colorStroke;
		ctx.beginPath();
		ctx.arc(this.posX, this.posY, qubitDiameter / 2, 0, 2 * Math.PI);
		ctx.stroke();

		// name
		ctx.font = qubitNameSize + "px sans-serif";
		ctx.fillStyle = "black";
		ctx.globalAlpha = nameOpacity;
		ctx.fillText(this.name, this.posX, this.posY);
		ctx.globalAlpha = 1;
	}

	isInside(x, y) {
		let dx = x - this.posX;
		let dy = y - this.posY;
		let distanceSquared = dx**2 + dy**2;
		return distanceSquared <= (qubitDiameter / 2)**2;
	}
}


export function updateProbabilities() {
	for (let i = 0; i < qubits.length; i++) {
		let qubit = qubits[i];

		if (!physicalQubits.correlated[i]) { // independent qubit, has own probability
			qubit.probability = physicalQubits.probabilities[i];
		} else {
			qubit.probability = null;
		}
	}

	triggerAnimation();
}


import { qubits as physicalQubits } from "../index.js";
import { ctx } from "./canvas.js";
import { triggerAnimation } from "./playground.js";

let qubitDiameter = 100; // in pixels
let qubitNameSize = 30;
let colorStroke = "#fff";
let colorZero = "#ddd";
let colorOne  = "#aaf";
let colorMask = "#000";
let maskOpacity = 0.4;
let nameOpacity = 0.2;

let diameterStiffness = 0.08;
let diameterDamping = 0.25;
let probabilityStiffness = 0.2;
let maskStiffness = 0.1;
let epsilon = 1e-3;

export let qubits = []; // list of graphical qubits


export class Qubit {
	constructor(index, posX, posY) {
		this.index = index;
		this.name = String.fromCharCode(97 + index);
		this.posX = posX;
		this.posY = posY;
		this.probability = 0.0;
		this.correlated = false;

		// for animations
		this.diameterMul = 1;
		this.diameterChange = 0;
		this.shownProbability = 0.0;
		this.maskOpacity = 0;
	}


	update() {
		let diffProbability = this.probability - this.shownProbability;
		let diffMaskOpacity = (this.correlated ? maskOpacity : 0) - this.maskOpacity;
		let diffDiameterMul = 1 - this.diameterMul;

		if (Math.abs(diffProbability) > epsilon || Math.abs(diffMaskOpacity) > epsilon
			|| Math.abs(diffDiameterMul) > epsilon || Math.abs(this.diameterChange) > epsilon) {
			this.shownProbability += probabilityStiffness * diffProbability;
			this.maskOpacity += maskStiffness * diffMaskOpacity;

			this.diameterChange *= 1 - diameterDamping;
			this.diameterChange += diameterStiffness * diffDiameterMul;
			this.diameterMul += this.diameterChange;

			triggerAnimation();
		}
	}


	draw() {
		let diameter = qubitDiameter * this.diameterMul;

		ctx.save()
		ctx.beginPath();
		ctx.arc(this.posX, this.posY, diameter / 2, 0, 2 * Math.PI);
		ctx.clip();

		// background color
		ctx.fillStyle = colorZero;
		ctx.fillRect(
			this.posX - diameter / 2,
			this.posY - diameter / 2,
			diameter,
			diameter
		);

		// probability
		ctx.fillStyle = colorOne;
		ctx.fillRect(
			this.posX - diameter / 2,
			this.posY + diameter / 2,
			diameter,
			- this.shownProbability * diameter
		);

		// correlated mask
		if (this.maskOpacity >= epsilon) {
			ctx.globalAlpha = this.maskOpacity;
			ctx.fillStyle = colorMask;
			ctx.fillRect(
				this.posX - diameter / 2,
				this.posY - diameter / 2,
				diameter,
				diameter
			);
			ctx.globalAlpha = 1;
		}

		ctx.restore(); // remove clip

		// stroke
		ctx.strokeStyle = colorStroke;
		ctx.beginPath();
		ctx.arc(this.posX, this.posY, diameter / 2, 0, 2 * Math.PI);
		ctx.stroke();

		// // name
		// ctx.font = qubitNameSize + "px sans-serif";
		// ctx.fillStyle = "black";
		// ctx.globalAlpha = nameOpacity;
		// ctx.fillText(this.name, this.posX, this.posY);
		// ctx.globalAlpha = 1;
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
		qubit.probability = physicalQubits.probabilities[i];
		qubit.correlated = physicalQubits.correlated[i];
	}

	triggerAnimation();
}


import { ctx } from "./canvas.js";

let qubitDiameter = 100; // in pixels
let qubitNameSize = 20;

export let qubits = [];


export class Qubit {
	constructor(index, posX, posY) {
		this.name = String.fromCharCode(97 + index);
		this.posX = posX;
		this.posY = posY;
	}


	update() {
		
	}


	draw() {
		ctx.strokeStyle = "white";
		ctx.fillStyle = "#88f";
		ctx.beginPath();
		ctx.arc(this.posX, this.posY, qubitDiameter / 2, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();

		// name
		ctx.font = qubitNameSize + "px sans-serif";
		ctx.fillStyle = "black";
		ctx.fillText(this.name, this.posX, this.posY);
	}

	isInside(x, y) {
		let dx = x - this.posX;
		let dy = y - this.posY;
		let distanceSquared = dx**2 + dy**2;
		return distanceSquared <= (qubitDiameter / 2)**2;
	}
}


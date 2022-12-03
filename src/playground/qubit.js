import { ctx } from "./canvas.js";

let qubitDiameter = 100; // in pixels


export class Qubit {
	constructor(name, posX, posY) {
		this.name = name
		this.posX = posX;
		this.posY = posY;
	}

	draw() {
		ctx.strokeStyle = "white";
		ctx.fillStyle = "#88f";
		ctx.beginPath();
		ctx.arc(this.posX, this.posY, qubitDiameter / 2, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();

		ctx.fillStyle = "black";
		// name
		ctx.fillText(this.name, this.posX, this.posY);
	}
}


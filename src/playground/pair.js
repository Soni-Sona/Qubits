import { ctx } from "./canvas.js";

let pairNodeDiameter = 10;


export class Pair {
	constructor(qubit1, qubit2, nodeDiameter) {
		this.qubit1 = qubit1;
		this.qubit2 = qubit2;
		this.nodeX = (this.qubit1.posX + this.qubit2.posX) / 2;
		this.nodeY = (this.qubit1.posY + this.qubit2.posY) / 2;
	}

	draw() {
		// line
		ctx.strokeStyle = "white";
		ctx.beginPath();
		ctx.moveTo(this.qubit1.posX, this.qubit1.posY);
		ctx.lineTo(this.qubit2.posX, this.qubit2.posY);
		ctx.stroke();

		// node at center of line
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.arc(
			this.nodeX,
			this.nodeY,
			pairNodeDiameter / 2,
			0, 2 * Math.PI
		);
		ctx.fill();
	}
}


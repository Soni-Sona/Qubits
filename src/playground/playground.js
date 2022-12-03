import { ctx } from "./canvas.js";
import { Qubit } from "./qubit.js";
import { Pair } from "./pair.js";
import { createGateTiles, drawGateTiles } from "./gateTile.js"


const qubitCenterDistance = 200;


let qubits = [];
let pairs = [];


export function initializeLevel(qubitCount, availableGates) {
	createQubitsAndPairs(qubitCount);
	createGateTiles(availableGates);
	draw();
}


function createQubitsAndPairs(qubitCount) {
	qubits = [];
	pairs = [];

	let centerX = ctx.width  / 2;
	let centerY = ctx.height / 2;


	if (qubitCount == 1) {
		// centered
		qubits.push(new Qubit(1, centerX, centerY));

	} else {
		// qubits arranged on a circle of diameter qubitCircleRadius
		// if qubitCount even and > 2, arrange on a polygon of qubitCount + 1
		let addEmptySlot = (qubitCount % 2 == 0 && qubitCount > 2);
		let slotCount = addEmptySlot ? qubitCount + 1 : qubitCount;

		let qubitCircleRadius = (slotCount == 2) ?
			qubitCenterDistance / 2 :
			slotCount * qubitCenterDistance / (2 * Math.PI);

		let startAngle = 2 * Math.PI *
			(-0.25 - (addEmptySlot ? 1 / slotCount : 0) - (qubitCount == 2 ? 0.25 : 0));

		for (let i = 0; i < qubitCount; i++) {
			qubits.push(new Qubit(
				i + 1,
				centerX + qubitCircleRadius * Math.cos(startAngle - 2 * Math.PI * i / slotCount),
				centerY + qubitCircleRadius * Math.sin(startAngle - 2 * Math.PI * i / slotCount)
			));
		}

		// find all pairs
		for (let i = 0; i < qubitCount - 1; i++) {
			for (let j = i + 1; j < qubitCount; j++) {
				pairs.push(new Pair(qubits[i], qubits[j]));
			}
		}
	}
}


function draw() {
	ctx.clearRect(0, 0, ctx.width, ctx.height);

	ctx.setLineDash([3, 3]);
	for (let pair of pairs) {
		pair.draw();
	}

	ctx.setLineDash([]);
	for (let qubit of qubits) {
		qubit.draw();
	}

	drawGateTiles();
}


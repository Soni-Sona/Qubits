import { ctx, resize } from "./canvas.js";
import { qubits, Qubit } from "./qubit.js";
import { pairs, Pair } from "./pair.js";
import { gateTiles, createGateTiles } from "./gateTile.js"


const qubitCenterDistance = 200;


export function initializeLevelGraphics(qubitCount, availableGates) {
	createQubitsAndPairs(qubitCount);
	createGateTiles(availableGates);
	triggerAnimation();
}


function createQubitsAndPairs(qubitCount) {
	qubits.length = 0
	pairs.length = 0;

	let centerX = ctx.width  / 2;
	let centerY = ctx.height / 2;


	if (qubitCount == 1) {
		// centered
		qubits.push(new Qubit(0, centerX, centerY));

	} else {
		// qubits arranged on a circle of diameter qubitCircleRadius

		let qubitCircleRadius = (qubitCount == 2) ?
			qubitCenterDistance / 2 :
			qubitCount * qubitCenterDistance / (2 * Math.PI);

		let startAngle = -2 * Math.PI * (qubitCount == 2 ? 0.5 : 0.25);

		for (let i = 0; i < qubitCount; i++) {
			qubits.push(new Qubit(
				i,
				centerX + qubitCircleRadius * Math.cos(startAngle - 2 * Math.PI * i / qubitCount),
				centerY + qubitCircleRadius * Math.sin(startAngle - 2 * Math.PI * i / qubitCount)
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


let animating = false; // whether needeed to requestAnimationFrame, saving frame drawing
let needAnimating = false;
resize();

function animate() {
	needAnimating = false;

	update();
	draw();

	animating = needAnimating;
	// if (animating) { ctx.fillStyle="white"; ctx.fillRect(0, 0, 10, 10); } // debug
	if (animating) requestAnimationFrame(animate);
}

export function triggerAnimation() {
	if (animating) {
		needAnimating = true; // request to keep going
	} else {
		animating = true;
		animate();
	}
}


function update() {
	for (let pair of pairs) {
		pair.update();
	}

	for (let qubit of qubits) {
		qubit.update();
	}
}


function draw() {
	ctx.clearRect(0, 0, ctx.width, ctx.height);

	// pairs
	ctx.setLineDash([5, 5]);
	for (let pair of pairs) {
		pair.draw();
	}

	// qubits
	ctx.setLineDash([]);
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	for (let qubit of qubits) {
		qubit.draw();
	}

	// gateTiles
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	for (let gateTile of gateTiles) {
		gateTile.draw();
	}
}


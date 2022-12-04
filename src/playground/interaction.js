import { qubits as physicalQubits } from "../index.js";
import { canvas } from "./canvas.js";
import { triggerAnimation } from "./playground.js";
import {
	qubits,
	Qubit,
	updateProbabilities as updateGraphicalQubitProbabilities
} from "./qubit.js";
import {
	highlightPairsFromQubit,
	unhighlightAllPairs,
	showPairBetweenQubits
} from "./pair.js"
import { gateTiles, GateTile, createDraggedTile, removeDraggedTile } from "./gateTile.js"
import * as gates from "../gates.js";
export default null;

let gatesOnTwoQubits = [
	gates.gateCNOT,
	gates.gateCZ,
	gates.gateSWAP,
];


let draggedGateTile = null;
let currentGate = null;
let selectedQubits = [];
let currentTouchId = null;

/**
 * "none": waiting for drag gateTile or touch qubit
 * "draggingGateTile"
 * "waitingQubit2"; for gates acting on two qubits
 */
let state = "none";


function findClosest(x, y, qubitsOnly) { // returns Qubit or gateTile
	let closest = null;
	let minDistanceSquared = Infinity;
	let testedObjects = qubitsOnly ? qubits : [...qubits, ...gateTiles];

	for (let object of testedObjects) {
		let dx = object.posX - x;
		let dy = object.posY - y;
		let distanceSquared = dx**2 + dy**2;

		if (distanceSquared < minDistanceSquared) {
			closest = object;
			minDistanceSquared = distanceSquared;
		}
	}

	return closest;
}


function touchStart(event) {
	event.preventDefault();
	if (state === "draggingGateTile") return;

	let touches = event.changedTouches;

	for (let touch of touches) {
		let x = touch.clientX;
		let y = touch.clientY;
		let id = touch.identifier;

		let closest = findClosest(x, y, false);
		if (closest.isInside(x, y)) {
			if (closest instanceof Qubit) {
				switch (state) {
					case "none":
						console.log("Clicked on " + closest.name);
						// TODO
						updateGraphicalQubitProbabilities();

						break;

					case "waitingQubit2":
						if (selectedQubits.includes(closest)) break; // qubit already selected
						selectedQubits.push(closest);
						console.log("Clicked on 2nd qubit " + closest.name);
						// physicalQubits.applyGate(
						// 	currentGate(...selectedQubits)
						// );
						updateGraphicalQubitProbabilities();
						unhighlightAllPairs();
						showPairBetweenQubits(...selectedQubits);
						state = "none";
						draggedGateTile = null;
						currentGate = null;
						selectedQubits = [];
						break;
				}

			} else if (closest instanceof GateTile) {
				switch (state) {
					case "none":
						draggedGateTile = createDraggedTile(closest, x, y);
						currentGate = draggedGateTile.gate;
						currentTouchId = id;

						state = "draggingGateTile";
						break;
				}
			}
		}
	}
}


function touchMove(event) {
	event.preventDefault();

	let touches = event.changedTouches;

	for (let touch of touches) {
		let x = touch.clientX;
		let y = touch.clientY;
		let id = touch.identifier;
		if (id != currentTouchId) continue;

		switch (state) {
			case "draggingGateTile":
				draggedGateTile.posX = x;
				draggedGateTile.posY = y;
				triggerAnimation();
		}
	}
}


function touchEnd(event) {
	event.preventDefault();

	let touches = event.changedTouches;

	for (let touch of touches) {
		let x = touch.clientX;
		let y = touch.clientY;
		let id = touch.identifier;
		if (id != currentTouchId) continue;

		switch (state) {
			case "draggingGateTile":
				// delete GateTile

				// find closest qubit on which tile is dropped
				let closest = findClosest(x, y, true);
				if (closest.isInside(x, y)) {
					console.log(draggedGateTile.name + " dropped on " + closest.name);

					if (gatesOnTwoQubits.includes(draggedGateTile.gate)) {
						console.log("Waiting 2nd qubit")
						selectedQubits = [closest];

						highlightPairsFromQubit(closest);
						state = "waitingQubit2";

					} else { // gate acting on single qubit
						// physicalQubits.applyGate(currentGate(closest.index));
						updateGraphicalQubitProbabilities();
						currentGate = null;
						state = "none";
					}

				} else { // not dropped on qubit
					console.log(draggedGateTile.name + " dropped on nothing");
					currentGate = null;
					state = "none";
				}

				removeDraggedTile();
				draggedGateTile = null;
				currentTouchId = null;
				triggerAnimation();
		}
	}
}


function convertMouseToTouch(x, y) {
	return {
		preventDefault: ()=>{},
		changedTouches: [{
			clientX: x,
			clientY: y,
			id: 1
		}]
	};
}


function mouseDown(event) {
	let x = event.clientX,
	    y = event.clientY;

	touchStart(convertMouseToTouch(x, y));
}


function mouseMove(event) {
	let x = event.clientX,
	    y = event.clientY;

	touchMove(convertMouseToTouch(x, y));
}


function mouseUp(event) {
	let x = event.clientX,
	    y = event.clientY;

	touchEnd(convertMouseToTouch(x, y));
}


canvas.addEventListener("touchstart", touchStart, {passive: false});
canvas.addEventListener("touchmove",  touchMove,  {passive: false});
canvas.addEventListener("touchend",   touchEnd,   {passive: false});
canvas.addEventListener("mousedown",  mouseDown,  false);
canvas.addEventListener("mousemove",  mouseMove,  false);
canvas.addEventListener("mouseup",    mouseUp,    false);


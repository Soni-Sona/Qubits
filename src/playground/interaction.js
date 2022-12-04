import {
	qubits as physicalQubits,
	measurementStep
} from "../index.js";
import { canvas } from "./canvas.js";
import { triggerAnimation as triggerAnimationPlayground } from "./playground.js";
import { triggerAnimation as triggerAnimationHistogram, initializeHistogram, addMeasurement } from "../histogram.js";
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

const epsilon = 1e-4;
let qubitDiameterChange = 0.08;

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


let savedPhysicalQubits;
let undoCount = 0;
let maxUndoCount = Infinity;

function savePhysicalQubits() {
	savedPhysicalQubits = physicalQubits.copy();
}

function loadSavedPhysicalQubits() {
	physicalQubits.coefficients = savedPhysicalQubits.coefficients;
	physicalQubits.computeProbabilites();
	physicalQubits.computeCorrelated();
}

function checkAllCollapsed() {
	for (let i = 0; i < physicalQubits.coefficients.rows; i++) {
		if (physicalQubits.coefficients.data[i][0].getSquaredNorm() >= 1 - epsilon) {
			addMeasurement(i);
			return true;
		}
	}
	return false;
}

function showUndoButton() {
	if (measurementStep !== "undo-redo" && measurementStep !== "simulate many") return;
	if (undoCount >= maxUndoCount || measurementStep === "simulate many") {
		document.getElementById("simulate").style.display = "initial";
	} else {
		document.getElementById("undoRedo").style.display = "initial";
	}
}

document.getElementById("undoRedo").onclick = () => {
	undoCount ++;
	document.getElementById("undoRedo").style.display = "none";
	loadSavedPhysicalQubits();
	updateGraphicalQubitProbabilities();
	triggerAnimationHistogram();
	savePhysicalQubits();
};

let simulateDom = document.getElementById("simulate");
let timeout = null;
let timeInterval = 50;

simulateDom.onclick = () => {
	if (simulateDom.innerText === "Stop") {
		simulateDom.innerText = "Simulate many times";
		clearInterval(timeout);

	} else {
		simulateDom.innerText = "Stop";
		loop();
	}
};

function loop() {
	timeout = setTimeout(() => {
		for (let i = 0; i < physicalQubits.qubitCount; i++) {
			physicalQubits.observeState(i);
		}
		checkAllCollapsed();
		updateGraphicalQubitProbabilities();
		triggerAnimationHistogram();

		timeout = setTimeout(() => {
			loadSavedPhysicalQubits();
			updateGraphicalQubitProbabilities();
			triggerAnimationHistogram();
			savePhysicalQubits();
			loop();
		}, timeInterval);
	}, timeInterval);
}


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
						physicalQubits.observeState(closest.index);
						closest.diameterChange -= qubitDiameterChange;
						updateGraphicalQubitProbabilities();
						if (checkAllCollapsed()) showUndoButton();

						break;

					case "waitingQubit2":
						if (selectedQubits.includes(closest)) break; // qubit already selected
						selectedQubits.push(closest);
						console.log("Clicked on 2nd qubit " + closest.name);
						physicalQubits.applyGate(
							currentGate(...selectedQubits.reverse().map(q => q.index))
						);
						closest.diameterChange -= qubitDiameterChange;
						updateGraphicalQubitProbabilities();
						unhighlightAllPairs();
						showPairBetweenQubits(...selectedQubits);
						savePhysicalQubits();
						if (measurementStep !== "histogram") initializeHistogram();
						state = "none";
						draggedGateTile = null;
						currentGate = null;
						selectedQubits = [];
						break;
				}

				triggerAnimationHistogram();

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
				triggerAnimationPlayground();
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
					closest.diameterChange += qubitDiameterChange;

					if (gatesOnTwoQubits.includes(draggedGateTile.gate)) {
						console.log("Waiting 2nd qubit")
						selectedQubits = [closest];

						highlightPairsFromQubit(closest);
						state = "waitingQubit2";

					} else { // gate acting on single qubit
						physicalQubits.applyGate(currentGate(closest.index));
						updateGraphicalQubitProbabilities();
						currentGate = null;
						savePhysicalQubits();
						if (measurementStep !== "histogram") initializeHistogram();
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
				triggerAnimationPlayground();
				triggerAnimationHistogram();
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


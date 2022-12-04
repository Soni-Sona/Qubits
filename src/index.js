import { Qubits } from "./qubits.js";
import { initializeLevelGraphics } from "./playground/playground.js";
import { initializeHistogram } from "./histogram.js";
import * as gates from "./gates.js"
import "./playground/interaction.js";


export let qubits = null;


function initializeLevel(qubitCount, availableGates) {
	qubits = new Qubits(qubitCount);
	initializeLevelGraphics(qubitCount, availableGates);
	initializeHistogram();
}

initializeLevel(3, [
	gates.gateX,
	gates.gateH,
	gates.gateT,
	gates.gateCNOT,
]);


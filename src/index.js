import { Qubits } from "./qubits.js";
import { initializeLevelGraphics } from "./playground/playground.js";
import * as gates from "./gates.js"
import "./playground/interaction.js";


export let qubits = null;


function initializeLevel(qubitCount, availableGates) {
	qubits = new Qubits(qubitCount);
	initializeLevelGraphics(qubitCount, availableGates);
}

initializeLevel(4, [gates.gateX, gates.gateCNOT]);


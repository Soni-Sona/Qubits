import * as gates from "./gates.js"


class Slide {
	constructor(text, qubitCount, availableGates, measurementStep, reset) {
		this.text = text;
		this.qubitCount = qubitCount;
		this.availableGates = availableGates;
		this.measurementStep = measurementStep; // "none", "undo-redo", "simulate many", "histogram"
		this.reset = reset;
	}
}


export let slides = [
	new Slide(
		"Test",
		1,
		[gates.gateX],
		"none",
		true
	),

	new Slide(
		"Coucou",
		3,
		[gates.gateX, gates.gateH, gates.gateT, gates.gateCNOT],
		"simulate many",
		true
	),
];


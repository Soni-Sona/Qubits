import * as gates from "./gates.js"


class Slide {
	constructor(text, qubitCount, availableGates, reset) {
		this.text = text;
		this.qubitCount = qubitCount;
		this.availableGates = availableGates;
		this.reset = reset;
	}
}


export let slides = [
	new Slide(
		"Test",
		1,
		[gates.gateX],
		true
	),

	new Slide(
		"Coucou",
		3,
		[gates.gateX, gates.gateH, gates.gateT, gates.gateCNOT],
		true
	),
];


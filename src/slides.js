import * as gates from "./gates.js"


class Slide {
	constructor(text, qubitCount, availableGates, showSimulateMany, reset) {
		this.text = text;
		this.qubitCount = qubitCount;
		this.availableGates = availableGates;
		this.showSimulateMany = showSimulateMany;
		this.reset = reset;
	}
}


export let slides = [
	new Slide(
		"Test",
		1,
		[gates.gateX],
		false,
		true
	),

	new Slide(
		"Coucou",
		3,
		[gates.gateX, gates.gateH, gates.gateT, gates.gateCNOT],
		true,
		true
	),
];


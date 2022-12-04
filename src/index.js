import { slides } from "./slides.js";
import { Qubits } from "./qubits.js";
import { initializeLevelGraphics } from "./playground/playground.js";
import { initializeHistogram } from "./histogram.js";
import "./playground/interaction.js";


export let qubits = null;
export let measurementStep;


function initializeLevel(qubitCount, availableGates) {
	qubits = new Qubits(qubitCount);
	initializeLevelGraphics(qubitCount, availableGates);
	initializeHistogram();
}


function loadSlide(slideId) {
	let slide = slides[slideId];

	if (slide.reset || slide.qubitCount != qubits.qubitCount) {
		initializeLevel(slide.qubitCount, slide.availableGates);
	}

	measurementStep = slide.measurementStep;

	document.getElementById("levelText").innerHTML = slide.text;
	document.getElementById("undoRedo").style.display = "none";
	document.getElementById("simulate").style.display = "none";
	document.getElementById("histogram").style.display = measurementStep === "none" ? "none" : "initial";
}


let currentSlide = 0;
loadSlide(currentSlide);


document.getElementById("reset").onclick = () => {
	loadSlide(currentSlide);
};


document.getElementById("prev").onclick = () => {
	if (currentSlide <= 0) return;
	loadSlide(--currentSlide);
};


document.getElementById("next").onclick = () => {
	if (currentSlide >= slides.length - 1) return;
	loadSlide(++currentSlide);
};


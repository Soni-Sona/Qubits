import { qubits } from "./index.js";
export let canvas = document.getElementById("histogram");
export let ctx = canvas.getContext("2d");

const epsilon = 1e-4;
let labelSizeMax = 20;
let barWidthRatio = 0.8; // ratio between barWidth and barHorizontalSpace
let colorZero = "#ddd";
let colorOne  = "#aaf";

export function resize() {
	let scale = window.devicePixelRatio;
	ctx.width  = canvas.clientWidth;
	ctx.height = canvas.clientHeight;
	canvas.width  = ctx.width  * scale;
	canvas.height = ctx.height * scale;

	ctx.scale(scale, scale);
}

resize();
window.addEventListener("resize", resize);


let histogram = [];


export function initializeHistogram() {
	histogram.length = qubits.coefficients.rows;
	histogram.fill(0);
	triggerAnimation();
}


export function triggerAnimation() {
	update();
	draw();
}


function update() {
	for (let i = 0; i < histogram.length; i++) {
		histogram[i] = qubits.getStateProbability(i.toString(2).padStart(4, "0"));
	}
	console.log(histogram)
}


function draw() {
	ctx.clearRect(0, 0, ctx.width, ctx.height);

	let nonZeroCount = 0;
	for (let i = 0; i < histogram.length; i++) {
		if (histogram[i] > epsilon) nonZeroCount ++;
	}

	let barHorizontalSpace = ctx.width / nonZeroCount;
	let labelSize = Math.min(barHorizontalSpace, labelSizeMax);

	if (nonZeroCount > 0) {
		// bars
		let currentBar = 0;
		ctx.fillStyle = colorOne;
		for (let i = 0; i < histogram.length; i++) {
			if (histogram[i] <= epsilon) continue;

			ctx.fillRect(
				(currentBar + 0.5 - barWidthRatio / 2) * barHorizontalSpace,
				ctx.height - labelSize,
				barHorizontalSpace * barWidthRatio,
				-(ctx.height - labelSize) * histogram[i]
			);

			currentBar ++;
		}
	}

	// axes
	ctx.strokeStyle = "#fff";
	ctx.beginPath();
	ctx.moveTo(0.5, 0);
	ctx.lineTo(0.5, ctx.height - labelSize);
	ctx.lineTo(ctx.width, ctx.height - labelSize);
	ctx.stroke();
}


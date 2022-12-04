import { qubits } from "./index.js";
export let canvas = document.getElementById("histogram");
export let ctx = canvas.getContext("2d");

const epsilon = 1e-4;
let labelSizeMax = 20;
let barWidthRatio = 0.8; // ratio between barWidth and barHorizontalSpace
let colorZero = "#ddd";
let colorOne  = "#aaf";
let animationStiffness = 0.1;

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


let animating = false; // whether needeed to requestAnimationFrame, saving frame drawing
let needAnimating = false;

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
	for (let i = 0; i < histogram.length; i++) {
		let target = qubits.getStateProbability(i.toString(2).padStart(qubits.qubitCount, "0"));
		let diff = target - histogram[i];
		if (diff > epsilon || diff < -epsilon) needAnimating = true;
		histogram[i] += animationStiffness * diff;
	}
}


function draw() {
	ctx.clearRect(0, 0, ctx.width, ctx.height);

	let barHorizontalSpace = ctx.width / histogram.length;
	let labelSize = Math.min(barHorizontalSpace, labelSizeMax);

	// bars
	ctx.fillStyle = colorOne;
	for (let i = 0; i < histogram.length; i++) {
		if (histogram[i] <= epsilon) continue;

		ctx.fillRect(
			(i + 0.5 - barWidthRatio / 2) * barHorizontalSpace,
			ctx.height - labelSize,
			barHorizontalSpace * barWidthRatio,
			-(ctx.height - labelSize) * histogram[i]
		);
	}

	// labels
	let labelCircleRadius = (qubits.qubitCount == 1) ?
		0 : labelSize / 4;
	let labelDotRadius = (qubits.qubitCount == 1) ? labelSize / 4 :
		(qubits.qubitCount == 2) ? labelCircleRadius :
		2.7 * labelCircleRadius / qubits.qubitCount;

	let startAngle = -2 * Math.PI * (qubits.qubitCount == 2 ? 0.5 : 0.25);

	for (let i = 0; i < histogram.length; i++) {
		let centerX = (i + 0.5) * barHorizontalSpace;
		let centerY = ctx.height - labelSize / 2;

		for (let j = 0; j < qubits.qubitCount; j++) {
			ctx.fillStyle = (i & 2**j) ? colorOne : colorZero;
			ctx.beginPath();
			ctx.arc(
				centerX + labelCircleRadius * Math.cos(startAngle - 2 * Math.PI * j / qubits.qubitCount),
				centerY + labelCircleRadius * Math.sin(startAngle - 2 * Math.PI * j / qubits.qubitCount),
				labelDotRadius,
				0,
				2 * Math.PI
			);
			ctx.fill();
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


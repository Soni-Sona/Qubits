let canvas = document.getElementById("playground");
export let ctx = canvas.getContext("2d");


function resize() {
	let scale = window.devicePixelRatio;
	ctx.width  = canvas.clientWidth;
	ctx.height = canvas.clientHeight;
	canvas.width  = ctx.width  * scale;
	canvas.height = ctx.height * scale;

	ctx.scale(scale, scale);
}

resize();



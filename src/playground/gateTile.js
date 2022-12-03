import { ctx } from "./canvas.js";
import * as gates from "../gates.js"

let gateTileSize = 70;
let gateTileMenuPadding = 5;
let gateTileNameSize = 40;

const gateTileParameters = {
	[gates.gateX]: {
		name: "X",
		color: "#4f4",
		textColor: "#000"
	},

	[gates.gateY]: {
		name: "Y",
		color: "#4f4",
		textColor: "#000"
	},

	[gates.gateZ]: {
		name: "Z",
		color: "#4f4",
		textColor: "#000"
	},

	[gates.gateH]: {
		name: "H",
		color: "#4f4",
		textColor: "#000"
	},

	[gates.gateS]: {
		name: "S",
		color: "#4f4",
		textColor: "#000"
	},

	[gates.gateT]: {
		name: "T",
		color: "#4f4",
		textColor: "#000"
	},

	[gates.gateCNOT]: {
		name: "CN",
		color: "#4f4",
		textColor: "#000"
	},

	[gates.gateCZ]: {
		name: "CZ",
		color: "#4f4",
		textColor: "#000"
	},

	[gates.gateSWAP]: {
		name: "SW",
		color: "#4f4",
		textColor: "#000"
	},
}


let gateTiles = [];
let gateMenuTiles = [];


class GateTile {
	constructor(gate, posX, posY, dragged) {
		for (let key of ["name", "color", "textColor"])
			this[key] = gateTileParameters[gate][key];

		this.posX = posX;
		this.posY = posY;
		this.dragged = dragged;
	}

	draw() {
		// tile
		ctx.fillStyle = this.color;
		ctx.fillRect(
			this.posX - gateTileSize / 2,
			this.posY - gateTileSize / 2,
			gateTileSize,
			gateTileSize
		);

		// text
		ctx.fillStyle = this.textColor;
		ctx.fillText(this.name, this.posX, this.posY);
	}
}


export function createGateTiles(availableGates) {
	gateMenuTiles = [];
	let padding = gateTileSize / 2 + gateTileMenuPadding;

	for (let i = 0; i < availableGates.length; i++) {
		gateMenuTiles.push(new GateTile(
			availableGates[i],
			(gateTileSize + gateTileMenuPadding) * i + padding,
			padding
		));
	}

	gateTiles = [...gateMenuTiles];
}


export function drawGateTiles() {
	ctx.font = gateTileNameSize + "px sans-serif";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";

	for (let gateTile of gateTiles) {
		gateTile.draw();
	}
}


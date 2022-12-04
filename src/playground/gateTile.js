import { ctx } from "./canvas.js";
import * as gates from "../gates.js"

let gateTileSize = 70;
let gateTileMenuPadding = 5;
let gateTileNameSize = 35;
let draggedAlpha = 0.6;

const gateTileParameters = {
	[gates.gateX]: {
		name: "X",
		color: "#f62",
		textColor: "#000"
	},

	[gates.gateY]: {
		name: "Y",
		color: "#f62",
		textColor: "#000"
	},

	[gates.gateZ]: {
		name: "Z",
		color: "#f62",
		textColor: "#000"
	},

	[gates.gateH]: {
		name: "H",
		color: "#ff4",
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
		name: "CX",
		color: "#68f",
		textColor: "#000"
	},

	[gates.gateCZ]: {
		name: "CZ",
		color: "#68f",
		textColor: "#000"
	},

	[gates.gateSWAP]: {
		name: "SW",
		color: "#68f",
		textColor: "#000"
	},
}


export let gateTiles = [];
export let gateMenuTiles = [];


export class GateTile {
	constructor(gate, posX, posY, dragged) {
		this.gate = gate;
		for (let key of ["name", "color", "textColor"])
			this[key] = gateTileParameters[gate][key];

		this.posX = posX;
		this.posY = posY;
		this.dragged = dragged;
	}


	update() {

	}


	draw() {
		if (this.dragged) ctx.globalAlpha = draggedAlpha;

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
		ctx.font = "italic " + gateTileNameSize + "px Georgia";
		ctx.fillText(this.name, this.posX, this.posY);

		if (this.dragged) ctx.globalAlpha = 1;
	}

	isInside(x, y) {
		return (
			   x >= this.posX - gateTileSize / 2
			&& x <= this.posX + gateTileSize / 2
			&& y >= this.posY - gateTileSize / 2
			&& y <= this.posY + gateTileSize / 2);
	}
}


export function createGateTiles(availableGates) {
	gateMenuTiles = [];
	let padding = gateTileSize / 2 + gateTileMenuPadding;

	for (let i = 0; i < availableGates.length; i++) {
		gateMenuTiles.push(new GateTile(
			availableGates[i],
			(gateTileSize + gateTileMenuPadding) * i + padding,
			padding,
			false
		));
	}

	gateTiles = [...gateMenuTiles];
}


export function createDraggedTile(sourceGateTile, x, y) {
	let newGateTile = new GateTile(sourceGateTile.gate, x, y, true);
	gateTiles.push(newGateTile);
	return newGateTile;
}

export function removeDraggedTile() {
	gateTiles.pop();
}


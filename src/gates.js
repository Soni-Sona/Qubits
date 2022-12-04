import { Complex } from './complex.js'
import { Matrix } from './matrix.js'

let IBaseMatrix = new Matrix(2,2,[[new Complex(1), new Complex(0)],
	                              [new Complex(0), new Complex(1)]])
let XBaseMatrix = new Matrix(2,2,[[new Complex(0), new Complex(1)],
	                              [new Complex(1), new Complex(0)]])
let YBaseMatrix = new Matrix(2,2,[[new Complex(0), new Complex(0, -1)],
	                              [new Complex(0, 1), new Complex(0)]])
let ZBaseMatrix = new Matrix(2,2,[[new Complex(1), new Complex(0)],
	                              [new Complex(0), new Complex(-1)]])

let norm = 0.5**0.5
let HBaseMatrix = new Matrix(2,2[[new Complex(norm), new Complex(norm)],
	                             [new Complex(norm), new Complex(-norm)]])


function PBaseMatrix(phase) {
	let mat = new Matrix(2,2,[[new Complex(1), new Complex(0)],
		                      [new Complex(0), new Complex(Math.cos(delta),
								                     Math.sin(delta))]])
	return mat
}

let SBaseMatrix = new Matrix(2,2,[[new Complex(1), new Complex(0)],
		                          [new Complex(0), new Complex(0, 1)]])
let TBaseMatrix = new Matrix(2,2,[[new Complex(1), new Complex(0)],
		                          [new Complex(0), new Complex(norm, norm)]])

export function gateX(qubitIndex) {
	function createMatrix(qubitCount) {
		return 0;
	}

	return createMatrix;
}


export function gateY(qubitIndex) {
	function createMatrix(qubitCount) {
		return 0;
	}

	return createMatrix;
}


export function gateZ(qubitIndex) {
	function createMatrix(qubitCount) {
		return 0;
	}

	return createMatrix;
}


export function gateH(qubitIndex) {
	function createMatrix(qubitCount) {
		return 0;
	}

	return createMatrix;
}


export function gateS(qubitIndex) {
	function createMatrix(qubitCount) {
		return 0;
	}

	return createMatrix;
}


export function gateT(qubitIndex) {
	function createMatrix(qubitCount) {
		return 0;
	}

	return createMatrix;
}


export function gateCNOT(qubitIndex1, qubitIndex2) {
	function createMatrix(qubitCount) {
		return 0;
	}

	return createMatrix;
}


export function gateCZ(qubitIndex1, qubitIndex2) {
	function createMatrix(qubitCount) {
		return 0;
	}

	return createMatrix;
}


export function gateSWAP(qubitIndex1, qubitIndex2) {
	function createMatrix(qubitCount) {
		return 0;
	}

	return createMatrix;
}


import { Complex } from './complex.js'
import { Matrix } from './matrix.js'

let IBaseMatrix = new Matrix(2,2,[[new Complex(1), new Complex(0)],
	                              [new Complex(0), new Complex(1)]])
let BaseMatrix00 = new Matrix(2,2,[[new Complex(1), new Complex(0)],
	                              [new Complex(0), new Complex(0)]])
let BaseMatrix11 = new Matrix(2,2,[[new Complex(0), new Complex(0)],
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

function nTensorProduct(matrix, n) {
	if(matrix instanceof Matrix && n > 0) {
		let result = matrix.copy()
		for(let i = 0; i<n-1; i++) {
			result = matrix.tensorProduct(result)
		}
		return result
	}
}

function singleQubitGate(matrix, qubitIndex, qubitCount) {
	if(matrix instanceof Matrix) {
		let result = null
		if(qubitIndex == qubitCount-1) {
			result = matrix.copy()
		}
		else if(qubitIndex < qubitCount - 1 && qubitIndex >= 0) {
			result = nTensorProduct(IBaseMatrix, qubitCount-qubitIndex-1)
			result = matrix.tensorProduct(result)
		}
		if(qubitIndex > 0 && qubitIndex < qubitCount) {
			result = nTensorProduct(IBaseMatrix, qubitIndex).tensorProduct(result)
		}
		return result
	}
}

function dualQubitGate(matrix1, matrix2, qubitIndex1,
	                   qubitIndex2, qubitCount) {
	if(qubitCount >= 2 && matrix1 instanceof Matrix
	       && matrix2 instanceof Matrix) {
		if(qubitIndex1 < qubitIndex2) {
			let result1 = singleQubitGate(matrix2, 0, qubitCount - qubitIndex2)
			let result2 = singleQubitGate(matrix1, qubitIndex1, qubitIndex1+1)
			let result  = result1.tensorProduct(result2)

			return result
		}
		else if(qubitIndex2 > qubitIndex1) {
			let result1 = singleQubitGate(matrix1, 0, qubitCount - qubitIndex1)
			let result2 = singleQubitGate(matrix2, qubitIndex2, qubitIndex2+1)
			let result  = result1.tensorProduct(result2)

			return result
		}
	}
}

export function gateX(qubitIndex) {
	function createMatrix(qubitCount) {
		return singleQubitGate(XBaseMatrix, qubitIndex, qubitCount) 
	}

	return createMatrix;
}


export function gateY(qubitIndex) {
	function createMatrix(qubitCount) {
		return singleQubitGate(YBaseMatrix, qubitIndex, qubitCount) 
	}

	return createMatrix;
}


export function gateZ(qubitIndex) {
	function createMatrix(qubitCount) {
		return singleQubitGate(ZBaseMatrix, qubitIndex, qubitCount) 
	}

	return createMatrix;
}


export function gateH(qubitIndex) {
	function createMatrix(qubitCount) {
		return singleQubitGate(HBaseMatrix, qubitIndex, qubitCount) 
	}

	return createMatrix;
}


export function gateP(qubitIndex, phase) {
	function createMatrix(qubitCount) {
		return singleQubitGate(PBaseMatrix(phase), qubitIndex, qubitCount) 
	}
	
	return createMatrix;
}

export function gateS(qubitIndex) {
	function createMatrix(qubitCount) {
		return singleQubitGate(SBaseMatrix, qubitIndex, qubitCount) 
	}

	return createMatrix;
}


export function gateT(qubitIndex) {
	function createMatrix(qubitCount) {
		return singleQubitGate(TBaseMatrix, qubitIndex, qubitCount) 
	}
	
	return createMatrix;
}

function gateCU(qubitIndex1, qubitIndex2, qubitCount, matrix)
{
	if(matrix instanceof Matrix && matrix.rows == 2 && matrix.columns == 2) {
		let mat1 = dualQubitGate(BaseMatrix00, IBaseMatrix,
							 qubitIndex1, qubitIndex2, qubitCount)
		let mat2 = dualQubitGate(BaseMatrix11, matrix,
							 qubitIndex1, qubitIndex2, qubitCount)
		return mat1.add(mat2)
	}
}

export function gateCNOT(qubitIndex1, qubitIndex2) {
	function createMatrix(qubitCount) {
		return gateCU(qubitIndex1, qubitIndex2, qubitCount, XBaseMatrix)
	}

	return createMatrix;
}


export function gateCZ(qubitIndex1, qubitIndex2) {
	function createMatrix(qubitCount) {
		return gateCU(qubitIndex1, qubitIndex2, qubitCount, ZBaseMatrix)
	}

	return createMatrix;
}


export function gateSWAP(qubitIndex1, qubitIndex2) {
	function createMatrix(qubitCount) {
		return 0;
	}

	return createMatrix;
}


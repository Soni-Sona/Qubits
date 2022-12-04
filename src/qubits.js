import { Matrix } from './matrix.js';

const epsilon = 1e-4

export class Qubits {
	constructor(qubitCount) {
		this.qubitCount = qubitCount;

		this.coefficients = new Matrix(2**qubitCount, 1)
		this.coefficients.data[0][0].real = 1;

		this.probabilities = new Float32Array(qubitCount)
		this.correlated = new Array(qubitCount)
	}

	getStateProbability(state) {;
		if(typeof(state) === "string" && state.length == this.qubitCount) {
			let index = 0;
			for(let i = 0; i < this.qubitCount; i++) {
				index += 2**(this.qubitCount-i-1)*state[this.qubitCount-i-1];
			}

			return this.coefficients.data[index][0].getSquaredNorm();
		}
	}

	computeProbabilites() {
		for(let qubitIndex = 0; qubitIndex<this.qubitCount; qubitIndex++) {
			let probability = 0
			for(let i = 0; i<2**this.qubitCount; i++) {
				if(i & 2**(this.qubitCount-qubitIndex-1)) {
					probability += this.coefficients.data[i][0].getSquaredNorm()
				}
			}

			this.probabilities[qubitIndex] = probability
		}
	}

	computeCorrelated() {
		for(let qubitIndex = 0; qubitIndex<this.qubitCount; qubitIndex++) {
			this.correlated[qubitIndex] = false
			for(let i = 0; i<this.qubitCount; i++) {
				if(i != qubitIndex) {
					let qubitProbability = this.probabilities[qubitIndex]
					let product = this.probabilities[i]*qubitProbability

					let coefficientIndex = 2**qubitIndex + 2**i
					let stateProbability =
						this.coefficients.data[coefficientIndex]
						                      [0].getSquaredNorm()

					if(product < stateProbability - epsilon ||
						product > stateProbability + epsilon) {
						this.correlated[qubitIndex] = true
						break
					}
				}
			}
		}
	}

	applyGate(createMatrixFunction) {
		let matrix = createMatrixFunction(this.qubitCount)
		this.coefficients = this.coefficients.multiply(matrix)
		this.computeProbabilites()
		this.computeCorrelated()
	}
}

import { Complex } from './complex.js'

export class Matrix {
	constructor(rows, columns, data) {
		this.rows = rows
		this.columns = columns

		if(data) {
			this.data = []
			for(let i = 0; i<this.rows; i++) {
				this.data[i] = []
				for(let j = 0; j<this.columns; j++) {
					this.data[i][j] = data[i][j].copy()
				}
			}
		}
		else {
			this.data = []
			for(let i = 0; i<rows; i++) {
				this.data[i] = []
				for(let j = 0; j<columns; j++) {
					this.data[i][j] = new Complex(0, 0)
				}
			}
		}
	}

	copy() {
		let copy = new Matrix(this.rows, this.columns, this.data)
		return copy
	}

	add(matrix) {
		if(matrix instanceof Matrix && this.columns == matrix.columns
			&& this.rows == matrix.rows) {
			let result = new Matrix(this.rows, this.columns)
			for(let i = 0; i<this.rows; i++) {
				for(let j = 0; j<this.columns; j++) {
					result.data[i][j] =
						this.data[i][j].add(matrix.data[i][j])
				}
			}

			return result
		}
	}

	product(matrix) { //Right multiplication
		if(matrix instanceof Matrix && this.columns == matrix.rows) {
			let result = new Matrix(this.rows, matrix.columns)

			for(let i = 0; i<this.rows; i++) {
				for(let j = 0; j<matrix.columns; j++) {
					for(let k = 0; k<matrix.rows; k++) {
						result.data[i][j] = result.data[i][j].add(this.data[i][k].multiply(matrix.data[k][j]))
					}
				}
			}

			return result
		}
	}

	multiply(factor) { //Left multiplication
		if(factor instanceof Matrix) {
			return factor.product(this)
		}
		else if(factor instanceof Complex) {
			let result = new Matrix(this.rows, this.columns)
			for(let i = 0; i<this.rows; i++) {
				for(let j = 0; j<this.columns; j++) {
					result.data[i][j] = this.data[i][j].multiply(factor)
				}
			}
			return result
		}
	}

	tensorProduct(matrix) {
		if(matrix instanceof Matrix) {
			let result = new Matrix(this.rows, this.columns)
			for(let i = 0; i<this.rows; i++) {
				for(let j = 0; j<this.columns; j++) {
					result.data[i][j] = matrix.multiply(this.data[i][j])
				}
			}
			
			let flattenResult = new Matrix(this.rows*matrix.rows,
			                               this.columns*matrix.columns)
			for(let i1 = 0; i1<this.rows; i1++) {
				for(let j1 = 0; j1<this.columns; j1++) {
					for(let i2 = 0; i2<matrix.rows; i2++) {
						for(let j2 = 0; j2<matrix.columns; j2++) {
							flattenResult.data[i1*matrix.rows+i2]
							                  [j1*matrix.columns+j2] =
								result.data[i1][j1].data[i2][j2]
						}
					}
				}
			}

			return flattenResult
		}
	}
}

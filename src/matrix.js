import { Complex } from './complex.js'

export class Matrix {
	constructor(rows, columns, data) {
		this.rows = rows
		this.columns = columns

		if(data) {
			for(let i = 0; i<this.rows; i++) {
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
			let result = Matrix(this.rows, this.columns)
			for(let i = 0; i<this.rows; i++) {
				for(let j = 0; j<this.columns; j++) {
					result.data[i][j] = this.data[i][j] + matrix.data[i][j]
				}
			}
		}
	}

	multiply(matrix) {
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
}

export class Complex {

	constructor(real, imag) {
		this.real = real;
		this.imag = imag;
	}

	copy() {
		let copy = new Complex(this.real, this.imag)
		return copy
	}
	
	add(a) {
		if(a instanceof Complex) {
			return new Complex(this.real+a.real, this.imag+a.imag)
		}
	}

	getSquaredNorm() {
		return this.real*this.real + this.imag*this.imag
	}

	multiply(a)
	{
		if(a instanceof Complex) {
			let real = this.real*a.real - this.imag*a.imag
			let imag = this.real*a.imag + this.imag*a.real
			return new Complex(real, imag)
		}
		else if(typeof(a) === 'number')
		{
			return new Complex(a*this.real, a*this.imag)
		}
	}
}

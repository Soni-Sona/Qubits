export class Complex {

	constructor(real, imag) {
		this.real = real;
		this.imag = imag;
	}
	
	add(a) {
		if(a instanceof Complex) {
			return new Complex(this.real+a+real, this.imag+a.imag)
		}
	}

	multiply(a)
	{
		if(a instanceof Complex) {
			let real = this.real*a.real - this.imag*a.imag
			let imag = this.real*a.imag + this.imag*a.real
			return new Complex(real, imag)
		}
	}
}

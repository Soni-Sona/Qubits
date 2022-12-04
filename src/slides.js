import * as gates from "./gates.js"


class Slide {
	constructor(text, qubitCount, availableGates, measurementStep, reset) {
		this.text = text;
		this.qubitCount = qubitCount;
		this.availableGates = availableGates;
		this.measurementStep = measurementStep; // "none", "undo-redo", "simulate many", "histogram"
		this.reset = reset;
	}
}


export let slides = [
	new Slide(
		"The aim of this project is to familiarize the layman to quantum computers. Quantum computers use an alternative concept to conventional computers to do computations, and are in undergoing development, pushed ahead by massive companies such as Google or IBM. Today, we are not going to cover why quantum computers are of such interest and what problem they can solve, but we will focussed on explaining the fundemantal principles of their working to the widest audience. ",
		0,
		[],
		"none",
		true
	),

	new Slide(
		"However, quantum computers operate with the laws of quantum mechanics, which are notoriously counterintuitive and difficult to grasp. It will be no easy task. We'll thus try to keep it simple and stay away from the real mathematical technicalities which are necessary to fully understand it, by using an interactive approach from the ground up. ",
		0,
		[],
		"none",
		false
	),

	new Slide(
		"First, we will explain briefly the fundemental principles of classic computers which we use in our daily life. Computers are computing machines, and that is all they do. To do so, they need to represent numbers physically, and the easiest way to do so is to use binary digits, also called bits. Bits are like ordinary digits from 0 to 9 we all use, except only 0 and 1 exists. This is convenient for computers who have very limited cognition abilities. A bit in a computer is typically represented by an electric signal, on for 1 and off for 0.",
		0,
		[],
		"none",
		false
	),

	new Slide(
		"Here, we have represented a bit of value 0. The nice shape and color are only there for humans, computers don't need them.",
		1,
		[],
		"none",
		true
	),

	new Slide(
		"A bit on its own is not very useful. It would only sit there for ever and never do anything interesting. If we want to do computations, we'd better find a way to transform it, so that we could turn numbers into other numbers. After all, computing is only that. The easiest (and only way) to change a single bit is by turning it into a 0 if it is a 1 and into a 1 if it is a 0.",
		1,
		[],
		"none",
		false
	),

	new Slide(
  		"This is achieved by this X gate (the name comes from a very wierd thing in quantum physics). Drag it on the bit to flip it.",
		1,
		[gates.gateX],
		"none",
		true
	),

	new Slide(
		" Quantum computers use a variant of the bit, called the quantum bits or the qubit. Quantum bits are like regular bits except that it's possible in some circumstances that we can't know for sure if they are a 0 or a 1. We would say that they are in a superposition of both 0 and 1. This is not very illuminating. Let's see an example.",
		0,
		[gates.gateX],
		"none",
		true
	),

	new Slide(
		"Here, we have a very simple qubit, from which we are certain that its value is 0. Its state is fully determined and there is no superposition. In that case, we see that it shows no difference to a regular classical bit. Let's how we could make it more interesting.",
		1,
		[gates.gateX],
		"none",
		true
	),

	new Slide(
		"This is the Hadamard gate. Drag it on the qubit. It will put a boring qubit into a more fun one with superposition. What does it mean?",
		1,
		[gates.gateX, gates.gateH],
		"none",
		true
	),

	new Slide(
		"This is where a very strange part of quantum mechanics comes in: there is no way to see the qubit in two different states at the same time. If we try to watch it, or observe it, it will choose randomly what side it will take. There is no place here to discuss this subject in all this glory, so let's just try to observe the qubit.",
		1,
		[gates.gateX, gates.gateH],
		"none",
		false
	),

	new Slide(
		"We can do that by clicking or tapping on it. It may seem a bit strange that we call that observing as we could already see it before. But keep in mind that in the real world, we cannot observe the qubit in its superposed state, and it would have appeared as a black box until we would have made the observation.",
		1,
		[gates.gateX, gates.gateH],
		"none",
		false
	),

	new Slide(
		"The second wierd thing to notice is that once you do the observation, you'll have permanently destroyed the superposition. If you try to observe it again now we will always see it in the same state. We say that its state has collapsed. We've provided you a way to go in the past to repair your mess by clicking on the undo button. We can try to reobserve it, but keep in mind that this is not realistic. In the real world, we would have to reapply an H gate again to rebuild the superposition.",
		1,
		[gates.gateX, gates.gateH],
		"undo-redo",
		false
	),

	new Slide(
		"Try to undo and observe it again many times to see that its behaviour is random. We will record the result for you in the same time to construct a histogram. The histogram shows how often different results have occurred.",
		1,
		[gates.gateX, gates.gateH],
		"undo-redo",
		false
	),

	new Slide(
		"We can simulate it for you many times to make a better histogram. We can see there that 0 and 1 happen roughly the same amount. We say that they are equiprobable or uniformly distributed.",
		1,
		[gates.gateX, gates.gateH],
		"simulate many",
		false
	),

	new Slide(
		"There is a way to make it so that 1 will appear less often than 0, but to do so, we'll have to use a T gate. Try to drag an H gate, then a T gate, and an H gate again. The T gate won't appear to have done anything, but it will have changed an invisible property of the qubit, such that the second H gate won't make 1 as likely as 0. The property is called phase, and it's much too technical to explain here.",
		1,
		[gates.gateX, gates.gateH, gates.gateT],
		"simulate many",
		true
	),

	new Slide(
		"Try to do repeated measurements again, to see that one state will be more likely than the other. We have represented the probability to get 1 by the colored portion of the qubit.",
		1,
		[gates.gateX, gates.gateH, gates.gateT],
		"simulate many",
		false
	),
	
	new Slide(
		"Now that we've seen a single qubit, let's try to do interesting things with two qubits. Before we explain anything, drag an H gate on the first, and drag the new CX gate on the second qubit. Then, click on the first qubit again. This CX gate will always require to drag it on a first qubit and then click on a second one.",
		2,
		[gates.gateX, gates.gateH, gates.gateT, gates.gateCNOT],
		"simulate many",
		true
	),

	new Slide(
		"Let's try to understand what we did by doing many observations. Do an observation on any of the qubits, and you will see that the histogram has two new entries, because there are four different outcomes to an observation. The qubits can either be both 0, both 1, 0 and 1 or 1 and 0, which we'll write 00, 01, 10, and 11.",
		2,
		[gates.gateX, gates.gateH, gates.gateT, gates.gateCNOT],
		"simulate many",
		false
	),

	new Slide(
		"If you look at what happens here, you see a very interesting behaviour. You will never see one qubit being 1 and the other one being 0 at the same time. Everytime you observe the state, if you observe the first qubit to be a 0, you will know for sure the second one is 0 too. We call that an entangled state.",
		2,
		[gates.gateX, gates.gateH, gates.gateT, gates.gateCNOT],
		"simulate many",
		false
	),

	new Slide(
		"Try to rebuild the entangled state (by dragging an H gate and then a CX gate). If you're lost, you can always use the reset button.",
		2,
		[gates.gateX, gates.gateH, gates.gateT, gates.gateCNOT],
		"simulate many",
		true
	),

	new Slide(
		"Entanglement has a very strange consequence. Instead of using the button to simulate many times, try to watch closely what happens when you click on only one of the qubit to observe it. The first qubit will collapse, but the second qubit will collapse too, even if we didn't observe it! Entanglement makes it so that observing a qubit can influence one or many other ones.",
		2,
		[gates.gateX, gates.gateH, gates.gateT, gates.gateCNOT],
		"undo-redo",
		false
	),

	new Slide(
		"Now let's try to understand why the combination of the H and CX gates makes and entangled state. To help you, we'll now show you at all time the histogram that you would obtain if you were to do many observations.",
		2,
		[gates.gateX, gates.gateH, gates.gateT, gates.gateCNOT],
		"histogram",
		true
	),

	new Slide(
		"We'll start with both qubits at 0 with 100% of certainty. Applying an H gate will put the first qubit in a superposition of 0 and 1. It will mean that 50% of the time, we'll observe the first qubit at 0 and the second at 0, which we'll write 00, and 50% of the the first one will bit at 1 but the second still at 0, which we'll write 10.",
		2,
		[gates.gateX, gates.gateH, gates.gateT, gates.gateCNOT],
		"histogram",
		true
	),

	new Slide(
		"Here is what the CX gate does: it's a <i>controlled</i> X gate. The X gate being the gate swapping 0 for 1 and 1 for 0 for a single qubit, this means that it will swap the state of the first selected qubit depending on (or controlled by) the state of the second qubit we click on.",
		2,
		[gates.gateX, gates.gateH, gates.gateT, gates.gateCNOT],
		"histogram",
		false
	),

	new Slide(
		"In our case, it means that it won't swap the second qubit in the case that the first one is 0, but it will swap the second qubit when the first one is 1. It means that we'll still measure 00 as often, but we won't measure 10 anymore. We'll measure 11 instead, because we'll have swapped the second qubit in that case. This could appear as a bit of a twisted idea, but by playing around you will be able to understand what it does.",
		2,
		[gates.gateX, gates.gateH, gates.gateT, gates.gateCNOT],
		"histogram",
		false
	),

	new Slide(
		"Another way of interpreting entanglement is to say that the measurements of both qubits have become correlated. Before entanglement, measuring the first qubit would have given us no information about the second one and vice versa. Now that that have become entangled, the measurement of one qubit will appear to be always the same as the measurement of the second qubit. In that case, they would be perfectly correlated.",
		2,
		[gates.gateX, gates.gateH, gates.gateT, gates.gateCNOT],
		"histogram",
		false
	),

	new Slide(
		"There could also be cases where the correlation would only be partial, which would mean that most of the time they would both be measured to the same value, but some rarer times they could be different. We'll leave you as a challenge to find a way to make a partially correlated set of qubits.",
		2,
		[gates.gateX, gates.gateH, gates.gateT, gates.gateCNOT],
		"histogram",
		false
	),

	new Slide(
		"You reached the end of this presentation. Feel free to play with these qubits and become a master of the quantum world.",
		3,
		[gates.gateX, gates.gateH, gates.gateT, gates.gateCNOT],
		"histogram",
		false
	),

	new Slide(
		"",
		4,
		[gates.gateX, gates.gateH, gates.gateT, gates.gateCNOT],
		"histogram",
		false
	),

	new Slide(
		"",
		5,
		[gates.gateX, gates.gateH, gates.gateT, gates.gateCNOT],
		"histogram",
		false
	)
];


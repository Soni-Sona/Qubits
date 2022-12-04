import { initializeLevel } from "./playground/playground.js";
import * as gates from "./gates.js"
import "./playground/interaction.js";

initializeLevel(4, [gates.gateX, gates.gateCNOT]);


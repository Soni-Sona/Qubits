import { initializeLevel } from "./playground/playground.js";
import * as gates from "./gates.js"

initializeLevel(4, [gates.gateX, gates.gateCNOT]);


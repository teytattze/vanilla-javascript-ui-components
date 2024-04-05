import { AnalogClock } from "./analog-clock.js";

const analogClock = new AnalogClock();

const rootEl = document.querySelector("#root");
rootEl.appendChild(analogClock.element);

export class AnalogClock {
  #element;

  constructor() {
    this.#render();
  }

  #render() {
    this.#performRender();
    this.#afterRender();
  }

  #performRender() {
    const analogClockEl = createAnalogClockHTMLElement();

    if (this.#element) {
      this.#element.replaceWith(analogClockEl);
    }

    this.#element = analogClockEl;
  }

  #afterRender() {}

  get element() {
    return this.#element;
  }
}

const createAnalogClockHTMLElement = () => {
  const hoursHandEl = document.createElement("div");
  hoursHandEl.setAttribute("data-hour", 0);

  const minutesHandEl = document.createElement("div");
  minutesHandEl.setAttribute("data-minute", 0);

  const secondsHandEl = document.createElement("div");
  secondsHandEl.setAttribute("data-second", 0);

  const numberEls = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((number) => {
    const numberEl = document.createElement("span");
    numberEl.appendChild(document.createTextNode(number));
    return numberEl;
  });
  const numberGroupEl = document.createElement("div");
  numberGroupEl.append(...numberEls);

  const analogClockEl = document.createElement("div");
  analogClockEl.appendChild(numberGroupEl);
  analogClockEl.appendChild(hoursHandEl);
  analogClockEl.appendChild(minutesHandEl);
  analogClockEl.appendChild(secondsHandEl);

  return analogClockEl;
};

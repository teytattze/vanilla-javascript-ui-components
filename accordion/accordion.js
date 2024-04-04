export class Accordion {
  #el;
  #id;
  #isExpanded;
  #title;
  #content;

  constructor({ id, isExpanded = false, title, content }) {
    this.#id = id;
    this.#isExpanded = isExpanded;
    this.#title = title;
    this.#content = content;

    this.#render();
  }

  collapse() {
    this.#isExpanded = false;
    this.#render();
  }

  expand() {
    this.#isExpanded = true;
    this.#render();
  }

  #render() {
    this.#processRender();
    this.#afterRender();
  }

  #processRender() {
    const accordionEl = createAccordionHTMLElement({
      id: this.#id,
      isExpanded: this.#isExpanded,
      title: this.#title,
      content: this.#content,
    });

    if (this.#el) {
      this.#el.replaceWith(accordionEl);
    }
    this.#el = accordionEl;
  }

  #afterRender() {
    const buttonEl = this.#el.querySelector(".accordion__trigger");
    buttonEl.addEventListener("click", () => {
      console.log("accordion click");
      if (this.#isExpanded) {
        this.collapse();
        return;
      }
      this.expand();
    });
  }

  get element() {
    return this.#el;
  }

  get isExpanded() {
    return this.#isExpanded;
  }
}

const createAccordionHTMLElement = ({ id, isExpanded, title, content }) => {
  const controlId = `accordion-content-${id}`;

  const accordianEl = document.createElement("div");
  accordianEl.setAttribute("class", "accordion");

  const buttonIconEl = document.createElement("span");
  buttonIconEl.setAttribute("aria-hidden", "true");
  buttonIconEl.setAttribute("class", "accordion__trigger-icon");

  const buttonEl = document.createElement("button");
  buttonEl.setAttribute("aria-controls", controlId);
  buttonEl.setAttribute("aria-expanded", isExpanded);
  buttonEl.setAttribute("class", "accordion__trigger");
  buttonEl.appendChild(document.createTextNode(title));
  buttonEl.appendChild(buttonIconEl);

  const contentEl = document.createElement("div");
  contentEl.setAttribute("class", "accordion__content");
  contentEl.setAttribute("id", controlId);
  contentEl.appendChild(document.createTextNode(content));

  accordianEl.appendChild(buttonEl);
  accordianEl.appendChild(contentEl);

  return accordianEl;
};

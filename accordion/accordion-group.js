export class AccordionGroup {
  #el;
  #accordions;
  #disableMultipleExpansion;

  constructor({ accordions, disableMultipleExpansion = false }) {
    this.#accordions = accordions;
    this.#disableMultipleExpansion = disableMultipleExpansion;

    this.#render();
  }

  #render() {
    this.#processRender();
    this.#afterRender();
  }

  #processRender() {
    const accordionEls = this.#accordions.map((accordion) => accordion.element);
    const accordionGroupEl = createAccordionGroupHTMLElement({
      accordionEls,
    });

    if (this.#el) {
      this.#el.replaceWith(accordionGroupEl);
    }
    this.#el = accordionGroupEl;
  }

  #afterRender() {
    if (this.#disableMultipleExpansion) {
      this.#setupDisableMultipleExpansion();
    }
  }

  #setupDisableMultipleExpansion() {
    this.#el.addEventListener(
      "click",
      (event) => {
        const targetNode = event.target.closest(".accordion");
        this.#accordions
          .filter(
            (accordion) =>
              accordion.isExpanded &&
              !targetNode.isEqualNode(accordion.element),
          )
          .forEach((accordion) => accordion.collapse());
      },
      { capture: true },
    );
  }

  get element() {
    return this.#el;
  }
}

const createAccordionGroupHTMLElement = ({ accordionEls }) => {
  const accordionGroupEl = document.createElement("div");
  accordionGroupEl.setAttribute("class", "accordion-group");
  accordionGroupEl.append(...accordionEls);
  return accordionGroupEl;
};

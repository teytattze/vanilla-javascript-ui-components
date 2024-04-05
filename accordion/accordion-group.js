export class AccordionGroup {
  #element;
  #accordions;
  #disableMultipleExpansion;

  constructor({ accordions, disableMultipleExpansion = false }) {
    this.#accordions = accordions;
    this.#disableMultipleExpansion = disableMultipleExpansion;
    this.#render();
  }

  #render() {
    this.#performRender();
    this.#afterRender();
  }

  #performRender() {
    const accordionEls = this.#accordions.map((accordion) => accordion.element);
    const accordionGroupEl = createAccordionGroupHTMLElement({
      accordionEls,
    });

    if (this.#element) {
      this.#element.replaceWith(accordionGroupEl);
    }

    // We need to update the element reference because `replaceWith` will find
    // the element's parent and replace the element via its parent. Hence,
    // this.#element reference will not be updated accordingly and it will
    // still point to the old element.
    this.#element = accordionGroupEl;
  }

  #afterRender() {
    if (this.#disableMultipleExpansion) {
      this.#setupDisableMultipleExpansion();
    }
  }

  #setupDisableMultipleExpansion() {
    this.#element.addEventListener(
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
    return this.#element;
  }
}

const createAccordionGroupHTMLElement = ({ accordionEls }) => {
  const accordionGroupEl = document.createElement("div");
  accordionGroupEl.setAttribute("class", "accordion-group");
  accordionGroupEl.append(...accordionEls);
  return accordionGroupEl;
};

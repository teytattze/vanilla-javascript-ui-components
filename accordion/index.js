"use strict";

import { Accordion } from "./accordion.js";
import { AccordionGroup } from "./accordion-group.js";

const data = [
  {
    id: "html",
    title: "HTML",
    content:
      "The HyperText Markup Language or HTML is the standard markuplanguage for documents designed to be displayed in a web browser.",
  },
  {
    id: "css",
    title: "CSS",
    content:
      "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML.",
  },
  {
    id: "javascript",
    title: "JavaScript",
    content:
      "JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification.",
  },
];

const accordions = data.map((accordionData) => new Accordion(accordionData));
const accordionGroup = new AccordionGroup({ accordions });

const rootEl = document.querySelector("#root");
rootEl.append(accordionGroup.element);

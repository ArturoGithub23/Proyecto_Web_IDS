import { LitElement, html } from "lit";

import style from "./footer-styles-component";

export class FooterComponent extends LitElement {
  static get styles() {
    return style;
  }

  static get properties() {
    return {
      autor: { type: String },
    };
  }

  constructor() {
    super();
    this.autor = "";
  }

  render() {
    return html`<footer>
      <p>Blog Elaborado por <span>${this.autor}</span></p>
    </footer>`;
  }
}

customElements.define("footer-component", FooterComponent);

import { LitElement, css, html } from "lit";
import "lit-toast/lit-toast.js";

import style from "./buscador-style-component";

export class BuscadorComponent extends LitElement {
  static get styles() {
    return style;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html`${this._btnBuscar()}`;
  }

  _btnBuscar() {
    return html`
      <section class="buscar">
        <div class="icono">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <circle
              cx="9"
              cy="9"
              r="8"
              stroke="#2B3F6C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              opacity="0.3"
              d="M14.5 14.958L19.5 19.958"
              stroke="#2B3F6C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <input
          @keypress="${this._buscarArticuloKey}"
          id="entrada_buscar"
          type="text"
          placeholder="Buscar artículo"
          minlength="6"
          maxlength="30"
        />
        <button @click="${this._buscarArticuloBtn}">Buscar</button>
      </section>
      <lit-toast></lit-toast>
    `;
  }
  _buscarArticuloKey(e) {
    const regex = /^[^$%&|<>#=]*$/;

    if (e.key === "Enter") {
      const entrada = e.target.value;
      if (entrada !== "") {
        e.target.value = "";
        if (regex.test(entrada)) {
          this.dispatchEvent(
            new CustomEvent("buscar", {
              detail: { entrada },
              bubbles: true,
              composed: true,
            })
          );
        } else {
          this._showToast("Búsqueda no válida");
        }
      } else {
        const entrada = "";

        this.dispatchEvent(
          new CustomEvent("buscar", {
            detail: { entrada },
            bubbles: true,
            composed: true,
          })
        );
      }
    }
  }
  _buscarArticuloBtn(e) {
    const regex = /^[^$%&|<>#=]*$/;

    const entrada = e.target.previousElementSibling.value;
    if (entrada !== "") {
      e.target.value = "";
      if (regex.test(entrada)) {
        this.dispatchEvent(
          new CustomEvent("buscar", {
            detail: { entrada },
            bubbles: true,
            composed: true,
          })
        );
      } else {
        this._showToast("Búsqueda no válida");
      }
    } else {
      const entrada = "";
      this.dispatchEvent(
        new CustomEvent("buscar", {
          detail: { entrada },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  _showToast(mensaje) {
    this.shadowRoot.querySelector("lit-toast").show(mensaje, 3500);
  }
}

customElements.define("buscador-component", BuscadorComponent);

import { LitElement, html, css } from "lit";
import "./components/login-component";
import "./components/administrador-blog";

class ProyectoWeb extends LitElement {
  static get styles() {
    return css`
      *,
      *::after,
      *::before {
        box-sizing: border-box;
      }
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      header {
        height: 5%;
        background: lightgray;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      header h1 {
        text-transform: uppercase;
        margin: 0;
      }
      h1 {
        text-align: center;
        font-size: large;
      }
      administrador-blog {
        height: 95%;
      }
    `;
  }

  static get properties() {
    return {
      login: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.login = true;
  }

  render() {
    return this._mostrarHtml();
  }

  _header() {
    return html`<header><h1>Administrador Blog Digital</h1></header>`;
  }

  _mostrarHtml() {
    return html` ${this._header()}
    ${!this.login
      ? html`<login-component
          @valido="${this._usuarioValido}"
        ></login-component>`
      : html`<administrador-blog></administrador-blog>`}`;
  }

  _usuarioValido(e) {
    this.login = e.detail.bool;
    e.detail.bool = false;
  }
}

customElements.define("proyecto-web", ProyectoWeb);

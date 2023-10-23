import { LitElement, html, css } from "lit";
import "./components/login-component";

class ProyectoWeb extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {
      login: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.login = false;
  }

  render() {
    return html`
      <p>Proyecto Web</p>
      ${!this.login
        ? html`<login-component
            @valido="${this._usuarioValido}"
          ></login-component>`
        : null}
    `;
  }

  _usuarioValido(e) {
    this.login = e.detail.bool;
    e.detail.bool = false;
  }
}

customElements.define("proyecto-web", ProyectoWeb);

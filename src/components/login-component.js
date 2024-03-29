import { LitElement, css, html } from "lit";

import style from "./css/styles-login";
export class LoginComponent extends LitElement {
  static get styles() {
    return [style];
  }

  static get properties() {
    return {
      error: { type: String },
      datos: { type: Array },
      google_id: { type: String },
    };
  }

  constructor() {
    super();
    this.addEventListener("datos", (e) => {
      this._obtenerDatos(e);
    });
    this.error = "";
    this.datos = [];
    this.google_id = "";
    this.addEventListener("google", (e) => this._validarGoogle(e));
  }

  firstUpdated() {
    this._obtenerDatos();
  }

  render() {
    return this._mostrarHtml();
  }

  _mostrarHtml() {
    return html`
      <section class="login">
        <form class="formulario" action="#">
          <legend class="titulo">Bienvenido</legend>
          ${this.error.length !== "" ? this.error : null}
          <label>Email</label>
          <input type="email" id="email" />
          <label>Password</label>
          <input type="password" maxlength="16" id="password" />
          <input
            class="btn"
            type="button"
            @click="${this._login}"
            value="Login"
          />
        </form>
        <br />
        <slot name="login" @click="${this._imprimir}"></slot>
      </section>
    `;
  }

  _login(e) {
    this.error = "";
    const regex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "gm"
    );

    const emailInput = this.shadowRoot.querySelector("#email");
    const passwordInput = this.shadowRoot.querySelector("#password");

    const email = emailInput.value.trim();
    const password = passwordInput.value.slice(0, 16).trim();

    if (
      email === "" ||
      (email === null && password === "") ||
      password === null
    ) {
      return (this.error = html` <p class="error">
        El email y password son necesarios
      </p>`);
    }

    if (!email.match(regex)) {
      return (this.error = html` <p class="error">El email es invalido</p>`);
    }

    this.datos.forEach((usuario) => {
      usuario.email === email && usuario.pass === password
        ? this._loginValido()
        : (this.error = html`<p>Usuario no encontrado</p>`);
    });
  }

  _loginValido() {
    let bool = true;
    this.dispatchEvent(
      new CustomEvent("valido", {
        detail: { bool },
        bubbles: true,
        composed: true,
      })
    );
    bool = false;
  }

  _obtenerDatos() {
    let url = "http://localhost:8000/assets/datos/usuarios.JSON";
    let metodo = "GET";

    fetch(url, { method: metodo })
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(response);
      })
      .then((data) => {
        this.datos = data.usuarios;
      })
      .catch((error) => {
        console.warn("Error al consular datos", error);
      });
  }

  _imprimir(e) {
    console.log(e);
  }

  _validarGoogle(e) {
    console.log(e.detail.datos);
    let credencial = e.detail.datos;

    console.log(atob(credencial));
  }
}

customElements.define("login-component", LoginComponent);

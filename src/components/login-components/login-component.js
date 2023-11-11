import { LitElement, css, html } from "lit";
import * as JWT from "jose";

import style from "./login-style-component";
export class LoginComponent extends LitElement {
  static get styles() {
    return [style];
  }

  static get properties() {
    return {
      error: { type: String },
      datos: { type: Array },
      usuario: { type: Object },
    };
  }

  constructor() {
    super();
    this.usuario = {};
    this.addEventListener("datos", (e) => {
      this._obtenerDatos(e);
    });
    this.error = "";
    this.datos = [];
    this.addEventListener("google", (e) => this._validarGoogle(e));
  }

  firstUpdated() {
    this._obtenerDatos();
  }

  render() {
    return this._mostrarHtml();
  }

  _mostrarHtml() {
    console.log(this.usuario);
    return html`
      <section class="login">
        ${Object.keys(this.usuario).length > 0
          ? html`<section class="usuario-true">
              <p>
                Sesión iniciada con el usuario
                <span>${this.usuario.email}</span> redireccionando al Blog.
              </p>
              ${this._cuentaRegresiva()}
            </section>`
          : html` <form class="formulario" action="#">
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
              <slot name="login" @click="${this._imprimir}"></slot>`}
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
        ? this._loginValido(usuario)
        : (this.error = html`<p>Usuario no encontrado</p>`);
    });
  }

  _loginValido(usuario) {
    usuario = { email: usuario.email, imagen: usuario.picture };

    this.usuario = usuario;

    this.dispatchEvent(
      new CustomEvent("login", {
        detail: { usuario },
        bubbles: true,
        composed: true,
      })
    );

    let view = "/dashboard";
    this.dispatchEvent(
      new CustomEvent("ruta", {
        detail: { view },
        bubbles: true,
        composed: true,
      })
    );
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

  _validarGoogle(e) {
    let respuesta = JWT.decodeJwt(e.detail.datos.credential);
    console.log(respuesta.picture);

    let usuario = {
      email: respuesta.email,
      imagen: respuesta.picture,
    };

    this.usuario = usuario;

    this.dispatchEvent(
      new CustomEvent("login", {
        detail: { usuario },
        bubbles: true,
        composed: true,
      })
    );

    let view = "/dashboard";
    this.dispatchEvent(
      new CustomEvent("ruta", {
        detail: { view },
        bubbles: true,
        composed: true,
      })
    );
  }

  _cuentaRegresiva() {
    let setInter = setInterval(() => {
      clearInterval(setInter);
      let view = "/inicio";
      this.dispatchEvent(
        new CustomEvent("ruta", {
          detail: { view },
          bubbles: true,
          composed: true,
        })
      );
    }, 5000);
  }
}

customElements.define("login-component", LoginComponent);

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
    window.fbAsyncInit = function () {
      FB.init({
        appId: "693000662808036",
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });
      FB.AppEvents.logPageView();
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  firstUpdated() {
    this._obtenerDatos();
  }

  render() {
    return this._mostrarHtml();
  }

  _mostrarHtml() {
    if (this.usuario === null) this.usuario = {};
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
          : html`
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
              <slot name="login"></slot>
              <button @click="${this._loginFacebook}" class="btn_facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    fill="url(#paint0_linear_53_168)"
                  />
                  <path
                    d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_53_168"
                      x1="16"
                      y1="2"
                      x2="16"
                      y2="29.917"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#18ACFE" />
                      <stop offset="1" stop-color="#0163E0" />
                    </linearGradient>
                  </defs>
                </svg>
                Iniciar Sesión con Facebook
              </button>
            `}
      </section>
    `;
  }

  /*
  v18.0
  */

  _login(e) {
    console.log("_login");
    this.error = "";
    const regex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "gm"
    );

    const emailInput = this.shadowRoot.querySelector("#email");
    const passwordInput = this.shadowRoot.querySelector("#password");

    const email = emailInput.value.trim();
    const password = passwordInput.value.slice(0, 16).trim();

    console.log(email);
    console.log(password);

    if (
      email === "" ||
      (email === null && password === "") ||
      password === null
    ) {
      console.log("El email y password son necesarios");
      return (this.error = html` <p class="error">
        El email y password son necesarios
      </p>`);
    }

    if (!email.match(regex)) {
      console.log("if email");
      return (this.error = html` <p class="error">El email es invalido</p>`);
    }

    this.datos.forEach((usuario) => {
      console.log(usuario);
      usuario.email === email && usuario.pass === password
        ? this._loginValido(usuario)
        : (this.error = html`<p>Usuario no encontrado</p>`);
    });
  }

  _loginValido(usuario) {
    console.log("login");
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
    let url =
      "https://e42f-2806-2f0-92c0-8d42-b5a4-a2be-f334-67ef.ngrok-free.app/assets/datos/usuarios.JSON";
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

  _loginFacebook() {
    FB.login((respuesta) => {
      let usuario;
      if (respuesta.status === "connected") {
        FB.api("/me?fields=email, name, picture", (response) => {
          console.log(response);
          usuario = {
            email:
              response.email === undefined ? response.name : response.email,
            imagen: response.picture.data.url,
          };
        });

        setTimeout(() => {
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
        }, 1000);
      }
    });
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

import { LitElement, html } from "lit";

import style from "./header-styles-components";

export class HeaderComponent extends LitElement {
  static get styles() {
    return style;
  }

  static get properties() {
    return {
      titulo: { type: String },
      usuario: { type: Object },
      login: { type: Boolean },
      modo: { type: String },
      enlaces: { state: true },
    };
  }

  constructor() {
    super();
    this.titulo = "";
    window.sessionStorage.length === 0
      ? (this.usuario = [])
      : (this.usuario = JSON.parse(window.sessionStorage.getItem("usuario")));
  }

  firstUpdated() {
    this._obtenerEnlaces();
  }

  render() {
    return this._mostrarHtml();
  }

  _mostrarHtml() {
    return html` <header>
      <section class="cabecera">
        <h1>${this.titulo}</h1>
      </section>
      ${Object.keys(this.usuario).length > 0
        ? html`<section class="usuario">
            <section class="imagen">
              ${this.usuario.imagen !== undefined
                ? html`<img src="" alt="imagen-usuario" />`
                : html` <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm-4,21.164v-.164c0-2.206,1.794-4,4-4s4,1.794,4,4v.164c-1.226.537-2.578.836-4,.836s-2.774-.299-4-.836Zm9.925-1.113c-.456-2.859-2.939-5.051-5.925-5.051s-5.468,2.192-5.925,5.051c-2.47-1.823-4.075-4.753-4.075-8.051C2,6.486,6.486,2,12,2s10,4.486,10,10c0,3.298-1.605,6.228-4.075,8.051Zm-5.925-15.051c-2.206,0-4,1.794-4,4s1.794,4,4,4,4-1.794,4-4-1.794-4-4-4Zm0,6c-1.103,0-2-.897-2-2s.897-2,2-2,2,.897,2,2-.897,2-2,2Z"
                    />
                  </svg>`}
            </section>
            <section class="nombre-usuario">
              <span class="redireccionar" @click="${this._cambioRuta}"
                >${this.usuario.nombre + " " + this.usuario.apellido}</span
              >
            </section>
            <section>
              <a href="" @click="${this._cerrarSesion}">Cerrar Sesión</a>
            </section>
          </section>`
        : html`${this._btnBuscar()} ${this._iniciarSesión()}`}
    </header>`;
  }

  //Funciones para buscar un artículo
  _btnBuscar() {
    return html`
      <section class="buscar">
        <input
          @keypress="${this._buscarArticuloKey}"
          id="entrada_buscar"
          type="text"
          placeholder="Buscar artículo"
          minlength="6"
          maxlength="15"
        />
        <button @click="${this._buscarArticuloBtn}">Buscar</button>
      </section>
    `;
  }
  _buscarArticuloKey(e) {
    if (e.key === "Enter") {
      console.log("enter");
    }
  }
  _buscarArticuloBtn(e) {
    console.log(e.target.previousElementSibling.value);
  }

  _cambioRuta() {
    let view;
    this.titulo === "Mi Blog Digital" ? (view = "admin") : (view = "inicio");
    this.dispatchEvent(
      new CustomEvent("ruta", {
        detail: { view },
        bubbles: true,
        composed: true,
      })
    );
  }

  _iniciarSesión() {
    return html` <section class="iniciar-sesion">
      <a href="/login" class="btn-sesion" @click="${this._event}">Iniciar Seción</a href="/login">
    </section>`;
  }

  _cerrarSesion() {
    window.sessionStorage.clear();
    let view = "inicio";
    this.usuario = [];
    this.dispatchEvent(
      new CustomEvent("ruta", {
        detail: { view },
        bubbles: true,
        composed: true,
      })
    );
  }

  _event() {
    let view = "login";
    this.dispatchEvent(
      new CustomEvent("ruta", {
        detail: { view },
        bubbles: true,
        composed: true,
      })
    );
  }

  //enlaces
  _obtenerEnlaces() {
    this.enlaces = this.shadowRoot.querySelectorAll("a");
    this.enlaces.forEach((enlace) => {
      enlace.addEventListener("click", this._prevenirDefault);
    });
  }
  _prevenirDefault(e) {
    e.preventDefault();
  }
}

customElements.define("header-component", HeaderComponent);

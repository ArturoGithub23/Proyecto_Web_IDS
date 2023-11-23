import { LitElement, html } from "lit";
import "./components/blog-components/blog-component";
import "./components/login-components/login-component";
import "./components/administrador-components/consultar-components/consultar-component";
import "./components/administrador-components/dashboard-component.js";

export class RutasComponent extends LitElement {
  static get propierties() {
    return {
      ruta: { type: String },
      usuario: { type: Object },
    };
  }

  constructor() {
    super();
    this.ruta = "/inicio";
    window.localStorage.getItem("usuario") !== null ||
    window.localStorage.getItem("usuario") !== undefined
      ? (this.usuario = JSON.parse(window.localStorage.getItem("usuario")))
      : (this.usuario = {});
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("ruta", (e) => this._cambiarVista(e));
    window.addEventListener("popstate", (e) => {
      this.ruta = e.target.location.pathname;
      this.requestUpdate();
    });
    this.addEventListener("dashboard", (e) => this._urlDashboard(e));
  }

  render() {
    return html`${this._rutas()}`;
  }

  _rutas() {
    switch (this.ruta) {
      case "/inicio":
        window.history.pushState({}, "", this.ruta);
        return html`<blog-component
          .usuario="${this.usuario}"
          @cerrar="${this._cerrar}"
        ></blog-component>`;
      case "/login":
        window.history.pushState({}, "", this.ruta);
        return html`<login-component
          @login="${this._login}"
          .usuario="${this.usuario}"
        >
          <slot name="login" slot="login"></slot>
        </login-component> `;
      case "/dashboard":
        window.history.pushState({}, "", this.ruta);
        return html`<dashboard-component
          .usuario="${this.usuario}"
          @cerrar="${this._cerrar}"
        ></dashboard-component>`;
    }
  }

  _cerrar() {
    this.usuario = {};
    FB.logout(function (response) {
      console.log("Cerrando cesión FaceBook");
    });
  }

  _cambiarVista(e) {
    this.ruta = e.detail.view;
    this.requestUpdate();
  }

  _login(e) {
    this.usuario = e.detail.usuario;
    window.localStorage.setItem("usuario", JSON.stringify(this.usuario));
  }
}

customElements.define("rutas-component", RutasComponent);

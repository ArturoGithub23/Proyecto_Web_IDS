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
    window.sessionStorage.length === 1
      ? (this.usuario = JSON.parse(window.sessionStorage.getItem("usuario")))
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
    console.log(this.usuario);
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
          @login="${this._loginGoogle}"
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
    console.log(this.usuario);
  }

  _cambiarVista(e) {
    this.ruta = e.detail.view;
    this.requestUpdate();
  }

  _loginGoogle(e) {
    this.usuario = e.detail.usuario;
    window.sessionStorage.setItem("usuario", JSON.stringify(this.usuario));
  }
}

customElements.define("rutas-component", RutasComponent);

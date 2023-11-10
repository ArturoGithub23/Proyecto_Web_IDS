import { LitElement, html } from "lit";
import "./components/blog-components/blog-component";
import "./components/login-components/login-component";
import "./components/administrador-components/consultar-components/consultar-component";
import "./components/administrador-components/dashboard-component.js";

export class RutasComponent extends LitElement {
  static get propierties() {
    return {
      paths: { type: Array },
      path: { type: String },
      href: { type: String },
      usuario: { type: Object },
    };
  }

  constructor() {
    super();
    this.paths = [
      {
        nombre: "inicio",
        path: "/inicio",
        template: html`<blog-component></blog-component>`,
      },
      {
        nombre: "login",
        path: "/login",
        template: html`<login-component>
          <slot name="login" slot="login"></slot>
        </login-component> `,
      },
      {
        nombre: "admin",
        path: "/dashboard",
        template: html`<dashboard-component></dashboard-component>`,
      },
      {
        nombre: "consultar",
        path: "/consultar-articulo",
        template: html`<consultar-component></consultar-component>`,
      },
    ];
    this.path = "/";
    window.sessionStorage.length === 0
      ? (this.usuario = {})
      : (this.usuario = JSON.parse(window.sessionStorage.getItem("usuario")));
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("ruta", (e) => this._cambiarVista(e));
    window.addEventListener("popstate", (e) => this._cambioUrl(e));
    this.addEventListener("dashboard", (e) => this._urlDashboard(e));
  }

  render() {
    return html`${this._mostrarHtml()}`;
  }

  _mostrarHtml() {
    if (this.path === "/" || this.path === "/inicio") {
      this.path = "inicio";
    }

    if (Object.keys(this.usuario).length > 0 && this.path === "login") {
      this.path = "admin";
    }
    let path = this.paths.find((ruta) => ruta.nombre === this.path);
    window.history.pushState({}, "", path.path);
    return path.template;
  }
  _cambiarVista(e) {
    this.path = e.detail.view;
    this.update();
  }
  _cambioUrl(e) {
    if (Object.keys(this.usuario).length > 0) {
      this.path = e.target.location.pathname.substr(1);
      this.update();
    } else {
      this.path = "inicio";
      this.update();
    }
  }
}

customElements.define("rutas-component", RutasComponent);

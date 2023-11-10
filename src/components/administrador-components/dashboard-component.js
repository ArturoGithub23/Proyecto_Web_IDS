import { LitElement, html, css } from "lit";

import style from "./dashboard-style-component";
import "../compartidos/header-components/header-component";
import "./consultar-components/consultar-component";
import "./agregar-components/agregar-component";
import "./editar-components/editar-component";

export class DashboardComponent extends LitElement {
  static get styles() {
    return style;
  }

  static get properties() {
    return {
      articulos: { type: Array },
      seleccion: { type: String },
    };
  }

  constructor() {
    super();
    this.seleccion = "consultar";
    window.localStorage.length === 0
      ? (this.articulos = [])
      : (this.articulos = [
          ...JSON.parse(window.localStorage.getItem("articulos")),
        ]);
  }

  firstUpdated() {
    this._obtenerEnlaces();
  }

  render() {
    return this._mostrarHtml();
  }

  _mostrarHtml() {
    return html`
      <header-component titulo="Administrador Blog Digital"></header-component>
      <section class="contenedor">
        ${this._aside()} ${this._contenidoPrincipal()}
      </section>
      <footer-component autor="Arturo Contreras"></footer-component>
    `;
  }

  _aside() {
    return html`<aside>
      <a
        class="button"
        @click="${() => (this.seleccion = "consultar")}"
        href=""
      >
        Consular artículos
      </a>
      <a class="button" @click="${() => (this.seleccion = "agregar")}" href="">
        Agregar artículo
      </a>
      <a
        class="button"
        @click="${() => {
          window.localStorage.clear();
          this.articulos = [];
          this.articulo = {};
          this.seleccion = "";
        }}"
        href=""
      >
        Vaciar LS
      </a>
    </aside> `;
  }

  _contenidoPrincipal() {
    return html`
      <main class="contenido-principal">${this._menu(this.seleccion)}</main>
    `;
  }

  _menu(valor) {
    let id, articulo;
    if (valor.includes("editar_")) {
      id = valor.slice(7);
      valor = valor.slice(0, 6);
      articulo = this.articulos.find((elemento) => elemento.id === Number(id));
    }

    switch (valor) {
      case "consultar":
        return html`<consultar-component
          .articulos="${this.articulos}"
          @editar="${(e) => (this.seleccion = e.detail.seleccion)}"
          @eliminar="${this._eliminar}"
        ></consultar-component>`;
        break;
      case "agregar":
        return html`<agregar-component
          @agregar="${this._agregar}"
        ></agregar-component>`;
        break;
      case "editar":
        return html`<editar-component
          id="${id}"
          .articulo="${articulo}"
          @editar="${this._editar}"
        ></editar-component>`;
        break;
    }
  }

  _agregar(e) {
    let articulo = e.detail.articulo;
    this.articulos = [...this.articulos, articulo];

    window.localStorage.setItem("articulos", JSON.stringify(this.articulos));
    this.seleccion = e.detail.seleccion;
  }

  _editar(e) {
    let articulo = e.detail.articulo;
    let indice = this.articulos.findIndex(
      (registro) => registro.id === articulo.id
    );

    this.articulos[indice] = articulo;
    window.localStorage.setItem("articulos", JSON.stringify(this.articulos));
    this.seleccion = e.detail.seleccion;
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

customElements.define("dashboard-component", DashboardComponent);

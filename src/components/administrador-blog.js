import { LitElement, html, css } from "lit";

import style from "./css/styles-blog";
import "./consultar-articulos.js";
import "./editar-articulo.js";
import "./agregar-articulo.js";

export class AdministradorBlog extends LitElement {
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
    this.seleccion = "";
    window.localStorage.length === 0
      ? (this.articulos = [])
      : (this.articulos = [
          ...JSON.parse(window.localStorage.getItem("articulos")),
        ]);
  }

  render() {
    return this._mostrarHtml();
  }

  _mostrarHtml() {
    return html`<main>${this._aside()} ${this._contenedor()}</main>`;
  }

  _aside() {
    return html`<aside>
      <a
        class="button"
        @click="${() => (this.seleccion = "consultar")}"
        href="#"
      >
        Consular artículos
      </a>
      <a class="button" @click="${() => (this.seleccion = "agregar")}" href="#">
        Agregar artículo
      </a>
      <a
        class="button"
        @click="${() => {
          window.localStorage.clear();
          console.log(window.localStorage);
          this.articulos = [];
          this.articulo = {};
          this.seleccion = "";
        }}"
        href="#"
      >
        Vaciar LS </a
      ><a class="button" @click="${this._cerrarSesion}" href="#">
        Cerrar Sesión
      </a>
    </aside> `;
  }

  _contenedor() {
    return html`<section class="contenido-principal">
      ${this._menu(this.seleccion)}
    </section>`;
  }

  _menu(valor) {
    let id, articulo;
    if (valor.includes("editar_")) {
      id = valor.slice(7);
      valor = valor.slice(0, 6);
      articulo = this.articulos.find((elemento) => elemento.id === id);
    }

    switch (valor) {
      case "consultar":
        return html`<consultar-articulos .articulos="${
          this.articulos
        }" @editar="${(e) =>
          (this.seleccion = e.detail.seleccion)}" @eliminar="${
          this._eliminar
        }"></consultar-asticulos>`;
        break;
      case "agregar":
        return html`<agregar-articulo
          @agregar="${this._agregar}"
        ></agregar-articulo>`;
        break;
      case "editar":
        return html`<editar-articulo
          id="${id}"
          .articulo="${articulo}"
          @editar="${this._editar}"
        ></editar-articulo>`;
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

  _cerrarSesion() {
    let login = false;
    this.dispatchEvent(new CustomEvent("cerrar"));
  }
}

customElements.define("administrador-blog", AdministradorBlog);

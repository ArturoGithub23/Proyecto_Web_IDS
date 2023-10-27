import { LitElement, html, css } from "lit";

import style from "./css/styles-blog";
import "./consultar-articulos.js";
import "./editar-articulo.js";

export class AdministradorBlog extends LitElement {
  static get styles() {
    return style;
  }

  static get properties() {
    return {
      articulos: { type: Array },
      seleccion: { type: String, Reflect: true },
      localStorage: { type: String },
    };
  }

  constructor() {
    super();
    this.seleccion = "";
    window.localStorage.setItem(
      "articulos",
      '[{"id":"1","titulo":"Prueba","autor":"Arturo Contreras","contenido":{"tema":"prueba","texto":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptatum error debitis? Sed consectetur vitae perspiciatis tenetur laboriosam aliquam ipsam magnam veritatis? Molestias, ipsum quisquam! Maxime ipsam repellendus dicta odit.","imagen":"","imagenActualizada":"","palabrasClave":["hola","hola2"]},"fecha":"2023-01-01","fechaActualizacion":""},{"id":"2","titulo":"Prueba 2","autor":"arturo 2","contenido":{"tema":"","texto":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptatum error debitis? Sed consectetur vitae perspiciatis tenetur laboriosam aliquam ipsam magnam veritatis? Molestias, ipsum quisquam! Maxime ipsam repellendus dicta odit.","imagen":"","imagenActualizada":"","palabrasClave":[]},"fecha":"2023-02-01","fechaActualizacion":""}]'
    );
    this.articulos = JSON.parse(window.localStorage.getItem("articulos"));
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
      <a class="button" @click="${this._agregarArticulo}" href="#">
        Agregar artículo
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
        return this._agregarArticulo();
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

  _agregarArticulo() {
    console.log(this.localStorage);
    this.seleccion = "agregar";
    return html`<p>Hola</p>`;
  }

  _editar(e) {
    let articulo = e.detail.articulo;
    let indice = this.articulos.findIndex(
      (registro) => registro.id === articulo.id
    );

    this.articulos[indice] = articulo;
    window.localStorage.setItem("articulo", JSON.stringify(this.articulos));
    this.seleccion = e.detail.seleccion;
  }
}

customElements.define("administrador-blog", AdministradorBlog);

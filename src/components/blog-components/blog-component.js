import { LitElement, css, html } from "lit";

import style from "./blog-style-component";

export class BlogComponent extends LitElement {
  static get styles() {
    return style;
  }

  static get properties() {
    return {
      articulos: { type: Array },
    };
  }

  constructor() {
    super();
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
    return html`<header-component titulo="Mi Blog Digital"></header-component>
      ${this._barra()}
      ${window.localStorage.length === 0
        ? html`<section class="vacio"><h2>Sin artículos</h2></section>`
        : this._contenidoPrincipal()}
      <footer-component autor="Arturo Contreras"></footer-component>`;
  }

  _barra() {
    return html`
      <section class="barra">
        <h1 class="logo__nombre no-margen centrar-texto">
          <span class="logo__bold"> Arturo Contreras</span>
        </h1>
      </section>
    `;
  }
  _contenidoPrincipal() {
    return html`<section class="contenedor">
      <main class="contenedor-principal">
        ${this.articulos.map((articulo) => {
          return html`<article class="entrada">
            <section class="titulo">
              <h3 class="no-margen">Titulo: ${articulo.titulo}</h3>
            </section>
            <section class="fecha">
              ${
                articulo.fechaActualizacion !== ""
                  ? html`<p>
                      <span>Última actualización:</span
                      >${articulo.fechaActualizacion}
                    </p>`
                  : html`<p>
                      <span>Fecha de publicación:</span> ${articulo.fecha}
                    </p>`
              }
            </section>
          <section class="entrada-imagen">
            <img src="${articulo.contenido.imagen}" alt="${articulo.titulo}" />
          </section>
          <section class="entrada-contenido">
            <p><span>Autor:</span> ${articulo.autor} </p></p>
            <p><span>Tema:</span> ${articulo.contenido.tema} </p>
          <a class="btn" data-id="${articulo.id}">Leer Artículo</a>
          <section class="tags">${articulo.contenido.palabrasClave.map(
            (tag) => {
              return html`<span class="tag">${tag}</span>`;
            }
          )}</section>
          </section>
        </article>`;
        })}
      </main>
      ${this._asideContenido()}
    </section>`;
  }

  _asideContenido() {
    return html`<aside>
      <section>
        ${this.articulos.map((articulo) => {
          return html`
            <article class="articulo-aside">
              <h4 class="encabezado-aside">${articulo.titulo}</h4>
              <section class="aside-imagen" wi>
                <img src="${articulo.contenido.imagen}" />
              </section>
              <section class="aside-contenido"></section>
              <a class="btn btn-aside" data-id="${articulo.id}"
                >Leer Artículo</a
              >
            </article>
          `;
        })}
      </section>
    </aside>`;
  }
}

customElements.define("blog-component", BlogComponent);

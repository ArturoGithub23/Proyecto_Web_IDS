import { LitElement, html, css } from "lit";

import style from "./css/styles-blog";

export class AdministradorBlog extends LitElement {
  static get styles() {
    return style;
  }

  static get properties() {
    return {
      articulos: { type: Array },
      seleccion: { type: String },
      localStorage: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.articulos = [
      {
        id: "1",
        titulo: "Prueba",
        autor: "Arturo Contreras",
        contenido: {
          tema: "",
          texto:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptatum error debitis? Sed consectetur vitae perspiciatis tenetur laboriosam aliquam ipsam magnam veritatis? Molestias, ipsum quisquam! Maxime ipsam repellendus dicta odit.",
          imagen: "",
          palabrasClave: "",
        },
        fecha: "2023-01-01",
      },
      {
        id: "2",
        titulo: "Prueba 2",
        autor: "arturo 2",
        contenido: {
          tema: "",
          texto:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptatum error debitis? Sed consectetur vitae perspiciatis tenetur laboriosam aliquam ipsam magnam veritatis? Molestias, ipsum quisquam! Maxime ipsam repellendus dicta odit.",
          imagen: "",
          palabrasClave: "",
        },
        fecha: "2023-02-01",
      },
    ];
    this.seleccion = "consultar";
    this.localStorage = window.localStorage;
    this.localStorage.setItem("articulos", JSON.stringify(this.articulos));
  }

  render() {
    return this._mostrarHtml();
  }

  _mostrarHtml() {
    return html`<main>${this._aside()} ${this._contenedor()}</main>`;
  }

  _aside() {
    return html`<aside>
      <a class="button" @click="${this._consultarArticulos}" href="#">
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
    switch (valor) {
      case "consultar":
        return this._consultarArticulos();
        break;
      case "agregar":
        return this._agregarArticulo();
        break;
    }
  }

  _consultarArticulos() {
    this.seleccion = "consultar";
    let consultaArticulos = JSON.parse(this.localStorage.getItem("articulos"));
    return html`
      <section class="contenedor-tabla">
        <table>
          <caption>
            Artículos Publicados
          </caption>
          <thead>
            <tr>
              <th class="w-10p">Título</th>
              <th class="w-10p">Autor</th>
              <th class="w-60p">Artículo</th>
              <th class="w-10p">Fecha publicación</th>
              <th class="w-10p">Opciones</th>
            </tr>
          </thead>
          <tbody class="tbody">
            ${consultaArticulos.map((articulo) => {
              return html`
                <tr
                  data-id="${articulo.id}"
                  data-contenido="${articulo.titulo.replace(" ", "_") +
                  "_" +
                  articulo.id}"
                  class="fila"
                >
                  <td>${articulo.titulo}</td>
                  <td>${articulo.autor}</td>
                  <td class="articulo">
                    <a
                      href="#"
                      title="Click para mostrar contenido"
                      @click="${this._mostrarContenido}"
                    >
                      ${articulo.contenido.texto.slice(0, 50) + "..."}</a
                    >
                  </td>
                  <td>${articulo.fecha}</td>
                  <td class="opciones">
                    <a href="#" @click="${this._editarArticulo}" id="edit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 1"
                        viewBox="0 0 24 24"
                        id="edit"
                      >
                        <path
                          d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z"
                        ></path>
                        <path
                          d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z"
                        ></path>
                      </svg>
                    </a>
                    <a href="#" @click="${this._eliminarArticulo}">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        id="trash"
                      >
                        <path
                          d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"
                        ></path>
                      </svg>
                    </a>
                  </td>
                </tr>
                <tr
                  class="ocultar fila-contenido"
                  id="${articulo.titulo.replace(" ", "_") + "_" + articulo.id}"
                >
                  <td colspan="5">${this._renderizarContenido(articulo)}</td>
                </tr>
              `;
            })}
          </tbody>
        </table>
      </section>
    `;
  }
  _mostrarContenido(e) {
    const articuloContenido = e.target.parentNode.parentNode.dataset.contenido;
    const contenido = this.shadowRoot.querySelector(`#${articuloContenido}`);
    let clases = [...contenido.classList];
    if (clases.includes("ocultar")) {
      contenido.classList.remove("ocultar");
    } else {
      contenido.classList.add("ocultar");
    }
  }

  _renderizarContenido(articulo) {
    return html`
      <article>
        <section class="contenido-articulo">
          <h4>
            Tema:
            ${articulo.contenido.tema === ""
              ? "Agregar un tema"
              : articulo.contenido.tema}
          </h4>
          <p>${articulo.contenido.texto}</p>
          <p>
            Palabras clave:
            ${articulo.contenido.palabrasClave === ""
              ? "Agregar palabras clave"
              : articulo.contenido.palabrasClave}
          </p>
        </section>
        <section class="contenido-imagen">
          <img src="${articulo.contenido.imagen}" alt="Imagen del artículo" />
        </section>
      </article>
    `;
  }

  _agregarArticulo() {
    this.seleccion = "agregar";
    console.log("Desde agregar articulos");
    return html`<p>Hola</p>`;
    // <svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" id="cross">
    //   <path d="M70.7 64.3c1.8 1.8 1.8 4.6 0 6.4-.9.9-2 1.3-3.2 1.3-1.2 0-2.3-.4-3.2-1.3L46 52.4 27.7 70.7c-.9.9-2 1.3-3.2 1.3s-2.3-.4-3.2-1.3c-1.8-1.8-1.8-4.6 0-6.4L39.6 46 21.3 27.7c-1.8-1.8-1.8-4.6 0-6.4 1.8-1.8 4.6-1.8 6.4 0L46 39.6l18.3-18.3c1.8-1.8 4.6-1.8 6.4 0 1.8 1.8 1.8 4.6 0 6.4L52.4 46l18.3 18.3z"></path>
    // </svg>;
  }
  _editarArticulo(e) {
    let articulo;
    if (
      e.target.parentNode.parentNode.parentNode.parentNode.className === "tbody"
    ) {
      articulo = e.target.parentNode.parentNode.parentNode;
    } else if (e.target.tagName === "A") {
      articulo = e.target.parentNode.parentNode;
    } else {
      articulo = e.target.parentNode.parentNode.parentNode.parentNode;
    }

    let articuloObt = this.articulos.find(
      (registro) => registro.id === articulo.dataset.id
    );

    console.log(articuloObt);
  }
  _eliminarArticulo(e) {
    let articulo;
    if (e.target.parentNode.parentNode.parentNode.className === "opciones") {
      articulo = e.target.parentNode.parentNode.parentNode.parentNode;
    } else if (e.target.tagName === "A") {
      articulo = e.target.parentNode.parentNode;
    } else {
      articulo = e.target.parentNode.parentNode.parentNode;
    }

    let indice = this.articulos.findIndex(
      (registro) => registro.id === articulo.dataset.id
    );

    console.log(indice);
    this.articulos.splice(indice, 1);
    this.localStorage.setItem("articulos", JSON.stringify(this.articulos));
    this.update();
  }
}

customElements.define("administrador-blog", AdministradorBlog);

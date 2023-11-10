import { LitElement, css, html } from "lit";
import "lit-toast/lit-toast.js";

import style from "./editar-style-component";

export class EditarComponent extends LitElement {
  static get styles() {
    return [style];
  }

  static get properties() {
    return {
      articulo: { type: Object },
      enlaces: { type: Array },
    };
  }

  constructor() {
    super();
    this.articulo = {
      id: "",
      titulo: "",
      autor: "",
      contenido: {
        tema: "",
        texto: "",
        imagen: "",
        imagenActualizada: "",
        palabrasClave: [],
      },
      fecha: "",
      fechaActualizacion: "",
    };
    this.enlaces = [];
  }

  render() {
    return html`${this._mostrarAgregar()}`;
  }

  firstUpdated() {
    this._obtenerEnlaces();
  }

  _mostrarAgregar() {
    return html`
      <section class="encabezado">
        <h2>Editando Artículo</h2>
        <lit-toast></lit-toast>
      </section>
      <section class="contenedor">
        <form>
          <section class="info-articulo">
            <label for="titulo">Título:</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value="${this.articulo.titulo}"
              required
            />
            <label for="autor">Autor:</label>
            <input
              type="text"
              id="autor"
              name="autor"
              value="${this.articulo.autor}"
              required
            />
            <label for="tema">Tema:</label>
            <input
              type="text"
              id="tema"
              name="tema"
              value="${this.articulo.contenido.tema}"
              required
            />
            <label for="texto">Texto:</label>
            <textarea
              name="texto"
              id="texto"
              .value="${this.articulo.contenido.texto}"
            ></textarea>
          </section>
          <section class="adds-articulo">
            <section class="contenedor-etiquetas">
              <label class="etiqueta-label">Insertar etiqueta:</label>
              <input
                id="input-tag"
                title="Click enter para agregar"
                type="text"
                @keydown="${this._nuevoTag}"
              />
              <section class="tags">
                ${this.articulo.contenido.palabrasClave.map((tag, index) => {
                  return html`<span class="tag"
                    >${tag}
                    <a href="" @click=${this._eliminarTag} data-index=${index}>
                      <svg
                        xmlns="http:www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        id="cross"
                      >
                        <path
                          d="M32,2A30,30,0,1,0,62,32,30.034,30.034,0,0,0,32,2Zm12.02,40.6064a1,1,0,1,1-1.4141,1.4141L32,33.4141,21.3936,44.0205A1,1,0,1,1,19.98,42.6064L30.5859,32,19.98,21.3936A1,1,0,0,1,21.3936,19.98L32,30.5859,42.6064,19.98a1,1,0,1,1,1.4141,1.4141L33.4141,32Z"
                        ></path>
                      </svg> </a
                  ></span>`;
                })}
              </section>
            </section>
            <section class="contenedor-imagen">
              <label class="label-imagen" for="imagen"
                >Seleccione una imagen</label
              >
              <input
                name="imagen"
                type="file"
                accept=".jpg, .jepg, .png"
                id="imagen"
                @change="${this._procesarImagen}"
              />
              <section class="imagen">
                <img
                  src="${this.articulo.contenido.imagenActualizada !== ""
                    ? this.articulo.contenido.imagenActualizada
                    : this.articulo.contenido.imagen}"
                />
              </section>
            </section>

            <input
              class="btn actualizar"
              type="button"
              @click="${this._actualizar}"
              value="Actualizar"
            />
          </section>
        </form>
      </section>
    `;
  }

  _nuevoTag(e) {
    //e.target.value,
    if (e.key === "Enter") {
      if (e.target.value.trim() === "") {
        return console.log("No ingresó una etiqueta");
      }
      this.articulo.contenido.palabrasClave.push(e.target.value);
      e.target.value = "";
      this.update();
      this._obtenerEnlaces();
    }
  }

  _eliminarTag(e) {
    let indiceTag;
    if (e.target.tagName === "path") {
      indiceTag = e.target.parentNode.parentNode.dataset.index;
    }
    if (e.target.tagName === "svg") {
      indicetag = e.target.parentNode.dataset.index;
    }
    if (e.target.tagName === "A") {
      indiceTag = e.target.dataset.index;
    }

    this.articulo.contenido.palabrasClave.splice(indiceTag, 1);
    this.articulo.contenido.palabrasClave = [
      ...this.articulo.contenido.palabrasClave,
    ];
    this.update();
  }

  _procesarImagen(e) {
    let imagen = e.target.files[0];
    let reader;

    if (imagen.type.match(/image.*/i)) {
      reader = new FileReader();
      reader.addEventListener("load", (evt) => {
        this.articulo.contenido.imagen = evt.target.result;
        this.update();
      });
      reader.readAsDataURL(imagen);
    }
  }

  _actualizar(e) {
    let errores = [];
    const inputs = [...this.shadowRoot.querySelectorAll("input")];

    const textArea = this.shadowRoot.querySelector("textarea");
    //  /^       : Empieza con
    //  [^       : Que no sea uno de los caracteres
    //  $%&|<>#  : Caracteres a excluir
    //  ]
    //  *        : 0 o mas caracteres
    //  $/       : Termina en
    const regex = /^[^$%&|<>#=]*$/;
    const regex2 = /[/()]/gi;

    if (regex.test(textArea.value)) {
      this.articulo.contenido.texto = textArea.value;
    } else {
      errores.push(`El elemento texto tienen caracteres no válidos`);
    }

    inputs.forEach((elemento) => {
      if (elemento.name !== "") {
        if (elemento.value !== "") {
          if (regex.test(elemento.value)) {
            switch (elemento.name) {
              case "titulo":
                this.articulo.titulo = elemento.value.replaceAll(regex2, "");
                break;
              case "autor":
                this.articulo.autor = elemento.value;
                break;
              case "tema":
                this.articulo.contenido.tema = elemento.value;
                break;
              default:
            }
          } else {
            errores.push(`${elemento.name} tiene caracteres no válidos`);
            elemento.value = "";
          }
        } else {
          if (elemento.name !== "imagen") {
            errores.push(`${elemento.name} está vacío`);
          }
        }
      }
    });

    let error = errores.toString().replaceAll(",", ", ").toUpperCase();

    if (errores.length > 0) {
      this._showToast(error);
    } else {
      let id;
      if (window.localStorage.length === 0) {
        id = Math.floor(Math.random() * 100);
      } else {
        let articulos = [
          ...JSON.parse(window.localStorage.getItem("articulos")),
        ];
        if (articulos.some((articulo) => articulo.id === id)) {
          while (articulos.some((articulo) => articulo.id === id)) {
            id = Math.floor(Math.random() * 100);
          }
        } else {
          id = Math.floor(Math.random() * 100);
        }
      }
      if (errores.length === 0) {
        let articulo = this.articulo;
        let seleccion = "consultar";
        this.articulo.fechaActualizacion = new Date()
          .toISOString()
          .slice(0, 10);
        this.dispatchEvent(
          new CustomEvent("editar", {
            detail: { articulo, seleccion },
            boobles: true,
            composed: true,
          })
        );
      }
    }
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
  _showToast(mensaje) {
    this.shadowRoot.querySelector("lit-toast").show(mensaje, 4500);
  }
}

customElements.define("editar-component", EditarComponent);

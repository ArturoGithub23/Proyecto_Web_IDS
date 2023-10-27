import { LitElement, css, html } from "lit";

import style from "./css/styles-blog";

export class EditarArticulo extends LitElement {
  static get styles() {
    return [
      style,
      css`
        :host {
          width: 100%;
          height 100%;
        }
        textarea{

        }
      `,
    ];
  }

  static get properties() {
    return {
      id: { type: String },
      articulo: { type: Object },
    };
  }

  constructor() {
    super();
    this.id = "";
    this.articulo = {};
  }

  render() {
    return html`${this._mostrarEditar()}`;
  }

  _mostrarEditar() {
    return html`
      <section class="contenedor-editar">
        <form class="formulario-editar">
          <fieldset class="fieldset-contenedor">
            <legend><h4>Editar Artículo</h4></legend>
            <fieldset class="informacion-articulo">
              <legend>Información del artículo</legend>
              <label>Título:</label>
              <input
                name="titulo"
                type="text"
                value="${this.articulo.titulo}"
              />
              <label>Autor:</label>
              <input
                name="autor"
                type="text"
                value="${this.articulo.autor}"
                disabled
              />
              <label class="fecha">Fecha publicación:</label>
              <input
                class="fecha"
                type="text"
                value="${this.articulo.fecha}"
                name="fecha"
                disabled
              />
              <label class="fecha">Fecha Actualizacion:</label>
              <input
                name="fechaActualizacion"
                class="fecha"
                type="text"
                value="${this.articulo.fechaActualizacion}"
                disabled
              />
            </fieldset>
            <fieldset class="contenido-articulo">
              <legend>Contenido del artículo</legend>
              <label>Tema:</label>
              <input
                name="tema"
                type="text"
                value="${this.articulo.contenido.tema}"
              />
              <label>Texto:</label>
              <textarea .value="${this.articulo.contenido.texto}"></textarea>
            </fieldset>
            <section class="etiquetas-contenedor">
              <section class="entrada">
                <label>Etiquetas:</label>
                <input
                  title="Click enter para agregar"
                  type="text"
                  @keydown="${this._nuevoTag}"
                />
              </section>
              <section class="etiquetas">
                <div class="scroll">
                  ${this.articulo.contenido.palabrasClave.map(
                    (palabra, index) => html`
                      <p>${palabra}</p>
                      <a
                        href="#"
                        @click=${this._eliminarTag}
                        data-index=${index}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 64 64"
                          id="cross"
                        >
                          <path
                            d="M32,2A30,30,0,1,0,62,32,30.034,30.034,0,0,0,32,2Zm12.02,40.6064a1,1,0,1,1-1.4141,1.4141L32,33.4141,21.3936,44.0205A1,1,0,1,1,19.98,42.6064L30.5859,32,19.98,21.3936A1,1,0,0,1,21.3936,19.98L32,30.5859,42.6064,19.98a1,1,0,1,1,1.4141,1.4141L33.4141,32Z"
                          ></path>
                        </svg>
                      </a>
                    `
                  )}
                </div>
              </section>
            </section>
            <section class="imagen">
              <label for="imagen">Seleccionar imagen:</label>
              <input
                data-id="${this.articulo.id}"
                name="imagen"
                type="file"
                accept=".jpg, .jepg, .png"
                id="entradaImagen"
                @change="${this._procesarImagen}"
              />
              <img
                src="${this.articulo.contenido.imagenActualizada !== ""
                  ? this.articulo.contenido.imagenActualizada
                  : this.articulo.contenido.imagen}"
              />
              <input
                class="btn actualizar"
                type="button"
                @click="${this._actualizar}"
                value="Actualizar"
              />
            </section>
          </fieldset>
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
    }
  }

  _eliminarTag(e) {
    let indiceTag;
    if (e.target.tagName === "path") {
      indiceTag = e.target.parentNode.parentNode.dataset.index;
      console.log(indiceTag);
    }
    if (e.target.tagName === "svg") {
      indicetag = e.target.parentNode.dataset.index;
      console.log(e.target.parentNode.dataset.index);
    }
    if (e.target.tagName === "A") {
      indiceTag = e.target.dataset.index;
      console.log(indiceTag);
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
        this.articulo.contenido.imagenActualizada = evt.target.result;
        this.update();
      });
      reader.readAsDataURL(imagen);
    } else {
      console.log("No ha seleccionado una imagen");
    }
  }

  _actualizar(e) {
    this._validarEntradas();
  }

  _validarEntradas() {
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

    if (regex.test(textArea.value)) {
      this.articulo.contenido.texto = textArea.value;
    } else {
      errores.push(html`El elemento texto no tienen caracteres no válidos`);
    }
    inputs.forEach((elemento) => {
      if (elemento.name !== "") {
        if (regex.test(elemento.value)) {
          switch (elemento.name) {
            case "titulo":
              this.articulo.titulo = elemento.value;
              break;
            case "autor":
              this.articulo.autor = elemento.value;
              break;
            case "fecha":
              this.articulo.fecha = elemento.value;
              break;
            case "fechaActualizacion":
              this.articulo.fechaActualizacion = elemento.value;
              break;
            case "tema":
              this.articulo.contenido.tema = elemento.value;
              break;
            default:
          }
        } else {
          errores.push(
            html`<p>
              El elemento ${elemento.name} no tienen caracteres no válidos
            </p>`
          );
        }
      }
    });

    if (errores.length === 0) {
      let articulo = this.articulo;
      let seleccion = "consultar";
      this.articulo.fechaActualizacion = new Date().toISOString().slice(0, 10);
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

customElements.define("editar-articulo", EditarArticulo);

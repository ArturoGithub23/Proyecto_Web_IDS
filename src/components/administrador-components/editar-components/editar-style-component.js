import { css } from "lit";

export default css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    background-color: white;
  }
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  h2,
  h3,
  h4 {
    margin: 0;
  }
  .encabezado {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8%;
  }
  .contenedor {
    width: 100%;
    height: 91%;
    padding: 0px 8px;
    display: flex;
    flex-direction: column;
  }

  form {
    width: 100%;
    max-width: 100%;
    padding: 16px;
    border-radius: 10px;
    overflow-y: scroll;
    background-color: rgb(186, 174, 174);
  }

  form label {
    width: 72px;
    font-weight: bold;
    display: inline-block;
  }

  form input[type="text"] {
    width: 40%;
    padding: 3px 10px;
    border: 1px solid #f6f6f6;
    border-radius: 3px;
    background-color: #f6f6f6;
    margin: 8px 0;
    display: inline-block;
  }

  form input[type="button"] {
    width: 100%;
    padding: 8px 16px;
    margin-top: 32px;
    border: 1px solid #000;
    border-radius: 5px;
    display: block;
    color: #fff;
    background-color: #000;
  }

  form input[type="submit"]:hover {
    cursor: pointer;
  }

  textarea {
    width: 100%;
    height: 150px;
    border: 1px solid #f6f6f6;
    border-radius: 3px;
    background-color: #f6f6f6;
    margin: 8px 0;
    resize: none;
    display: block;
  }

  .contenedor-etiquetas {
    height: 55px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .tags {
    display: inline-block;
    margin-left: 20px;
    overflow-x: scroll;
    width: 45%;
    height: 60%;
    padding-top: 7px;
    background-color: white;
  }
  .tag {
    font-size: 12px;
    border-radius: 10px;
    padding: 6px;
    background-color: white;
    border: thin solid black;
  }
  .tags .tag:not(:last-child) {
    margin-right: 5px;
  }

  .label-imagen {
    width: 150px;
    margin-bottom: 10px;
  }

  svg {
    height: 12px;
  }

  .imagen {
    width: 100%;
    max-width: 720px;
    height: 400px;
  }

  .imagen img {
    object-fit: content;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 720px) {
    :host {
      height: 100%;
    }
    form input,
    form label {
      width: 100% !important;
    }
    .contenedor {
      overflow: scroll;
      height: 91%;
    }
    .contenedor-etiquetas {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      height: 80px;
    }
    #input-tag {
      width: 40% !important;
    }
    .etiqueta-label {
      width: 180px !important;
    }
    .tags {
      width: 100%;
      height: 40px;
      padding-top: 7px;
      margin-left: 0;
    }
  }

  @media (min-width: 720px) and (max-width: 1010px) {
    form label {
      width: 13%;
    }
    .etiqueta-label {
      width: 150px !important;
    }

    #input-tag {
      width: 28%;
    }

    form input[type="text"] {
      width: 35%;
    }
    #tema {
      width: 84.5%;
    }
  }

  @media (min-width: 1010px) {
    form {
      display: flex;
      gap: 10px;
      height: 99%;
    }

    .info-articulo {
      width: 45%;
      display: flex;
      flex-direction: column;
    }

    form input,
    form label {
      width: 100% !important;
    }

    textarea {
      height: 100%;
    }

    .adds-articulo {
      width: 54%;
    }

    .contenedor-etiquetas {
      height: 22%;
      display: flex;
      flex-wrap: wrap;
    }

    .etiqueta-label {
      width: 30% !important;
    }

    .input-tag {
      width: 70% !important;
    }
    .tags {
      height: 55%;
      width: 100%;
      margin-left: 0;
    }

    .contenedor-imagen {
      height: 62%;
    }

    .imagen {
      height: 92%;
      margin-top: 10px;
    }

    .imagen img {
      width: 100%;
      height: 98%;
      object-fit: content;
    }

    lit-toast {
      --lt-border: 2px solid red;
    }
  }
`;

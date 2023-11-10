import { css } from "lit";

export default css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
  }
  .null {
    display: block;
    font-size: 30px;
    text-align: center;
    margin: 30px;
    font-weight: bold;
  }
  a {
    color: black;
  }
  .contenedor-tabla {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  table caption {
    margin: 15px;
    font-weight: bold;
    font-size: 30px;
  }
  thead tr {
    border-bottom: thick solid black;
  }
  th {
    text-transform: uppercase;
    color: #2915a8;
    font-size: smaller;
  }
  .w-10p {
    width: 12.5%;
    min-width: 12.5%;
  }
  .w-60p {
    width: 50%;
    max-width: 50%;
  }
  tbody tr {
    border-bottom: thin solid black;
    border-top: thin solid black;
  }
  td:not(:last-child) {
    padding: 5px;
    border-right: 1px solid black;
  }
  td:not(.articulo) {
    text-align: center;
  }
  svg {
    width: 20px;
  }
  .ocultar {
    display: none;
  }

  .no-margen {
    margin: 0;
  }

  .articulo-consultar {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    padding: 15px;
    height: 350px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .articulo-imagen {
    width: 50%;
    height: 330px;
  }
  .articulo-imagen img {
    object-fit: unset;
    width: 100%;
    height: 100%;
  }
  .articulo-contenido {
    width: 50%;
    height: 350px;
    text-align: left;
    background-color: #3d3d3d;
    color: #e2e0e0;
    padding: 10px;
  }
  .articulo-contenido p {
    margin: 8px auto 10px;
  }
  .articulo-contenido .titulo {
    height: 60px;
  }
  .scroll {
    height: 160px;
    padding: 2px 5px;
    overflow-y: scroll;
    background-color: #e2e0e0;
    color: black;
  }
  .scroll p {
    margin: 2px;
  }
  .tags {
    display: inline-block;
    margin-left: 20px;
  }
  .tag {
    font-size: 12px;
    border-radius: 10px;
    padding: 6px;
    background-color: #1c1c1c;
    color: white;
  }
  .tags .tag:not(:last-child) {
    margin-right: 5px;
  }
  @media (max-width: 720px) {
    :host {
      height: 100%;
    }
    .articulo-consultar {
      flex-direction: column;
      overflow-y: scroll;
    }
    .articulo-imagen {
      width: 100%;
    }
    .articulo-contenido {
      width: 100%;
    }
    .articulo-contenido .titulo {
      height: 20px;
    }
    .articulo-consultar {
      height: 372px;
    }
  }

  @media (min-width: 1200px) {
    .articulo-imagen {
      width: 30%;
    }
    .articulo-contenido {
      width: 70%;
    }
    th {
      font-size: initial;
    }
  }
`;

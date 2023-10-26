import { css } from "lit";

export default css`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  :host {
    display: block;
    width: 100vw;
    height: 100%;
  }
  h1,
  h2,
  h3,
  h4 {
    margin: 0;
  }
  .contenido-principal {
    width: 100%;
  }
  main {
    height: 100%;
    width: 100vw;
    display: flex;
  }
  aside {
    display: flex;
    width: 20%;
    flex-direction: column;
    background-color: #318ce7;
    gap: 10px;
    padding: 10px 0;
  }
  .button {
    padding: 10px;
    text-decoration: none;
    color: white;
  }
  .button:hover {
    font-weight: bold;
  }
  .contenedor-tabla {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 10px 5px 0 0;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  table caption {
    font-weight: bold;
    font-size: 30px;
  }
  thead tr {
    border-bottom: thick solid black;
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
    height: 10%;
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
  .contenido-articulo {
    text-align: left;
    padding: 5px;
  }
  .contenido-imagen {
    margin: 0 auto 20px;
    width: 50%;
    height: 300px;
    border: 1px solid black;
  }

  @media (max-width: 420px) {
    main {
      display: flex;
      flex-direction: column;
    }

    aside {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }
  }

  @media (min-width: 420px) and (max-width: 1200px) {
    aside {
      width: 20%;
    }
    .contenido-principal {
      width: 80%;
    }
  }

  @media (min-width: 1200px) {
    aside {
      width: 12%;
    }
  }
`;

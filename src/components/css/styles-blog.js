import { css } from "lit";

export default css`
  :host {
    display: block;
    width: 100vw;
    height: 100%;
  }
  *,
  *::after,
  *::before {
    box-sizing: border-box;
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
  svg{
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

  .contenedor-editar {
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: #aeb6bf;
  }

  .contenedor-editar .fieldset-contenedor {
    width: 100%;
    height: 100%;
  }

  .contenedor-editar fieldset {
    margin: 0;
    padding: 10px;
    border: none;
    height: 300px;
  }

  .formulario-editar {
    width: 100%;
    height: 100%;
  }

  .contenedor-editar input,
  label,
  textarea {
    width: 100%;
    display: block;
    margin-bottom: 5px;
  }

  .contenedor-editar input {
    margin-bottom: 15px;
    border: none;
  }

  .contenedor-editar .fecha {
    display: inline-block;
    width: 48%;
  }

  .contenedor-editar fieldset legend {
    width: 100%;
    text-align: center;
  }
  .contenedor-editar section {
    padding: 10px;
  }

  .informacion-articulo label:first-of-type {
    margin-top: 20px;
  }

  textarea {
    height: 150px;
    resize:none;
  }
  #cross {
    width: 15px;
  }

  .etiquetas-contenedor{
    display:flex;
    width:100%;
    height:100%;
  }

  .etiquetas-contenedor .entrada {
    width:35%;
  }

  .etiquetas-contenedor label, .etiquetas-contenedor input {
    display: inline-block;
    width: 100%;
  }
  .etiquetas {
    display: block;
    padding: 10px;
    border: thin solid black;
    border-radius: 10px;
    width:70%;
    height:270px;

  }
  .etiquetas .scroll {
    height: 100%;
    overflow: scroll;
  }

  .etiquetas p {
    display: inline-block;
    margin: 5px 0;
    width: 80%;
  }

  .imagen img {
    display: inline-block;
    width: 150px;
    height: 200px;border
  }
  .imagen .actualizar {
    display: inline-block; 
    width: 100px; 
    margin-left: 60px;
  }
  
  @media (max-width: 560px) {
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

  @media (min-width: 560px) and (max-width: 1200px) {
    aside {
      width: 19%;
    }
    .contenido-principal {
      width: 100%;
    }
    .formulario-editar .fieldset-contenedor {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    º}
    .informacion-articulo,
    .contenido-articulo {
      width: 100%;
    }
  }

  @media (min-width: 1200px) {
    aside {
      width: 17%;
    }

   .formulario-editar .fieldset-contenedor {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    º}
    .informacion-articulo,
    .contenido-articulo {
      width: 100%;
    }
    .contenedor-editar .fecha {
      display: inline-block;
      width: 49.5%;
    }
  }
`;

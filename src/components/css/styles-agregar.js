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
  .button {
    padding: 10px;
    text-decoration: none;
    color: white;
  }
  .button:hover {
    font-weight: bold;
  }
  
  svg{
    width: 20px;
  }
  .contenedor-agregar {
    width: 100%;
    height: 100%;
    padding: 10px;
  }

  .contenedor-agregar .fieldset-contenedor {
    width: 100%;
    height: 100%;
  }

  .contenedor-agregar fieldset {
    margin: 0;
    padding: 10px;
    border: none;
    height: 300px;
  }

  .formulario-agregar {
    width: 100%;
    height: 100%;
  }

  .contenedor-agregar input,
  label,
  textarea {
    width: 100%;
    display: block;
    margin-bottom: 5px;
  }

  .contenedor-agregar input {
    margin-bottom: 15px;
    border: none;
  }

  .contenedor-agregar .fecha {
    display: inline-block;
    width: 48%;
  }

  .contenedor-agregar fieldset legend {
    width: 100%;
    text-align: center;
  }
  .contenedor-agregar section {
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
    .formulario-agregar .fieldset-contenedor {
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

   .formulario-agregar .fieldset-contenedor {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    º}
    .informacion-articulo,
    .contenido-articulo {
      width: 100%;
    }
    .contenedor-agregar .fecha {
      display: inline-block;
      width: 49.5%;
    }
  }
`;

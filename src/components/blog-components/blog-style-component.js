import { css } from "lit";

export default css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
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
    line-height: 1.2;
    margin: 0;
  }

  p {
    margin: 13px auto;
  }

  h1 {
    font-size: 40px;
  }
  h2 {
    font-size: 35px;
  }
  h3 {
    font-size: 30px;
  }
  h4 {
    font-size: 20px;
  }
  img {
    width: 100%;
  }
  .no-margen {
    margin: 0;
  }
  .no-padding {
    padding: 0;
  }
  .centrar-texto {
    text-align: center;
  }
  .barra {
    background-image: url(../../assets/img/fondoBlog.webp);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
  .contenedor {
    display: flex;
    flex-direction: row;
    gap: 20px;
    max-width: 900px;
    margin: auto;
  }
  .contenedor-principal {
    margin: 20px auto;
    flex-shrink: 2;
    width: 70%;
  }
  .entrada {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    padding: 15px;
  }
  .entrada:last-of-type {
    border: none;
    margin-bottom: 0;
  }
  .entrada-imagen {
    width: 100%;
    height: 400px;
  }
  .entrada img,
  .aside-imagen img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .entrada-contenido {
    width: 100%;
  }
  .entrada-contenido p span,
  .fecha span {
    font-weight: bold;
  }
  .fecha {
    color: #c2c1c1;
  }
  .btn {
    background-color: #4c8693;
    border: none;
    border-radius: 5px;
    display: inline-block;
    text-align: center;
    font-family: "PT Sans", sans-serif;
    color: white;
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 600;
    padding: 8px;
    cursor: pointer;
  }
  .tags {
    display: inline-block;
    margin-left: 20px;
  }
  .tag {
    font-size: 8px;
    border-radius: 10px;
    padding: 4px;
    background-color: #1c1c1c;
    color: white;
  }
  .tags .tag:not(:last-child) {
    margin-right: 5px;
  }

  aside {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    width: 30%;
    margin: 20px auto;
    margin-bottom: 5px;
    padding: 15px;
  }
  .articulo-aside {
    border-bottom: 1px solid gray;
    margin-bottom: 10px;
  }
  .aside-imagen {
    height: 200px;
    width: 100%;
  }
  .btn-aside {
    margin: 20px auto;
  }
  .vacio {
    height: 28%;
    margin: 10px auto;
    width: 900px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

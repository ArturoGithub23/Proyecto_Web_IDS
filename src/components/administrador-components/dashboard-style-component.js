import { css } from "lit";

export default css`
  :host {
    display: block;
    width: 100vw;
    height: 100vh;
  }
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  .contenedor {
    height: 85%;
    width: 100vw;
    display: flex;
  }
  .contenido-principal {
    background-color: #cccaca;
    width: 100%;
    height: 100%;
  }

  aside {
    display: flex;
    width: 21%;
    flex-direction: column;
    background-color: #3e3d3d;
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

  @media (max-width: 560px) {
    .contenedor {
      display: flex;
      flex-direction: column;
    }

    aside {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }

    .contenido-principal {
      height: 91%;
    }
  }

  @media (min-width: 560px) and (max-width: 1200px) {
    aside {
      width: 21%;
      font-size: medium;
    }
    .contenido-principal {
      width: 100%;
    }
  }

  @media (min-width: 1200px) {
    aside {
      width: 17%;
    }
  }
`;

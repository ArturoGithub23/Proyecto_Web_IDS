import { css } from "lit";

export default css`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  :host {
    display: block;
    width: 80%;
    margin: 20px auto;
  }
  .buscar {
    display: flex;
    align-items: center;
    width: 100%;
    height: 57px;
    padding: 10px;
    border-radius: 7px;
    border: 0px solid #000;
    background: #fff;
    box-shadow: 0px 4px 14px 0px #e5e5e5;
  }
  .icono {
    display: flex;
    width: 24px;
    height: 24px;
    padding: 3px 2.5px 2.042px 3px;
    justify-content: center;
    align-items: center;
    margin-right: 5%;
  }

  input {
    border: none;
    color: #c4c4c4;
    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    width: 65%;
    margin-right: 5%;
  }

  button {
    width: 20%;
    height: 37px;
    border-radius: 4px;
    background: #68c5cc;
    border: none;
    color: #fff;
    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
  }

  button:hover {
    cursor: pointer;
    background: #245f63;
  }
  @media (max-width: 500px) {
    :host {
      width: 98%;
    }
    .buscar {
      padding: 5px;
    }
    .icono {
      margin-right: 2%;
    }
    input {
      margin-right: 2%;
    }
    button {
      width: 25%;
    }
  }
`;

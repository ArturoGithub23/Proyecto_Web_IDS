import { css } from "lit";

export default css`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  :host {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 50px;
  }
  .usuario-true {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .usuario-true p {
    font-size: 20px;
    margin: 0 0 8px 0;
    text-align: center;
    background-color: red;
    padding: 10px;
    color: white;
  }
  .login {
    display: block;
    width: 330px;
    height: 400px;
    margin: 50px auto;
    border: 1px solid white;
    border-radius: 10px;
    padding: 50px 40px;
    background-color: cadetblue;
  }
  .formulario {
    display: flex;
    flex-direction: column;
  }
  legend,
  label {
    color: white;
  }
  legend {
    margin-bottom: 25px;
    font-size: 35px;
    text-align: center;
    font-weight: bold;
  }
  label {
    margin-bottom: 5px;
  }
  input:not(input[type="button"]) {
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid white;
    padding: 5px;
    caret-color: white;
    margin-bottom: 20px;
  }
  .btn {
    border-radius: 20px;
    margin-top: 10px;
    padding: 10px;
    border: none;
    font-weight: bold;
  }
`;

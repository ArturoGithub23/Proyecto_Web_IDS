import { css } from "lit";

export default css`
  :host {
    display: block;
    width: 100%;
    background-color: #4f4c4c;
    height: 10%;
  }
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  a {
    color: white;
  }
  h1 {
    margin: 0;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    color: white;
    margin: 0 30px;
  }
  .usuario {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .imagen {
    border: thin solid black;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  .imagen img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .redireccionar:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

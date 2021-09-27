import { Fragment } from "react";
import Dashboard from "./Components/Dashboard";
import { Header } from "./Components/Header";
import { GlobalStyle } from "./styles/global"

export function App() {
  return (
    <Fragment>
      <Header />
      <Dashboard />
      <GlobalStyle />
    </Fragment>
  );
}
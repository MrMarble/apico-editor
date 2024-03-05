import { hydrate } from "preact";
import { App } from "./app.jsx";
import "unfonts.css";
import "./index.css";
hydrate(<App />, document.getElementById("app"));

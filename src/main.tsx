import { hydrate } from "preact";
import { App } from "./app";
// eslint-disable-next-line import/no-unresolved
import "unfonts.css";
import "./index.css";

hydrate(<App />, document.getElementById("app")!);

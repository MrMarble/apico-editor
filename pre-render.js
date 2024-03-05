import { readFileSync, rmSync } from "fs";
import { render } from "./dist/server/server.js";
import { generate } from "critical";

const document = readFileSync("./dist/index.html", "utf8");
const dom = render();

const ssr = document.replace("<!--ssr-outlet-->", dom.html);

generate({
  inline: true,
  base: "./dist/",
  html: ssr,
  width: 1300,
  height: 900,
  extract: false,
  target: "index.html",
  rebase: (asset) => asset.url,
  css: ["./dist/assets/*.css"],
  strict: true,
});

// Delete "server" folder
rmSync("./dist/server", { recursive: true, force: true });

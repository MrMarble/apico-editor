#!/bin/node

import path from "path";
import getColors from "get-image-colors";
import { readdir, writeFile } from "fs/promises";

const ignoreColors = [
  "#344c64",
  "#243444",
  "#141c34",
  "#ece4e4",
  "#bcccd4",
  "#d7d9dd",
  "#dcccd4",
  "#182238",
  "#192339",
  "#192439",
];

(async () => {
  const bees = (await readdir("./public/bees")).filter(
    (file) => !file.includes("_hd"),
  );

  const beeColors = {};
  for (const bee of bees) {
    const colors = await getColors(path.join("./public/bees", bee));

    beeColors[bee.replace(".png", "")] = colors
      .filter((color) => !ignoreColors.includes(color.hex()))
      .map((color) => color.hex())
      .pop();
  }

  await writeFile(
    "./src/assets/beeColors.json",
    JSON.stringify(beeColors, null, 2),
  );
})();

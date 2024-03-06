#!/bin/node
import { JSDOM } from "jsdom";
import { createWriteStream } from "fs";
import { finished } from "stream/promises";
import { Readable } from "stream";

const url = "https://wiki.apico.buzz/wiki/Bees";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const response = await (await fetch(url)).text();
  const dom = new JSDOM(response);
  const bees = dom.window.document.querySelectorAll(".aw .aw-icon a");

  for (let index = 0; index < bees.length; index++) {
    const bee = bees[index];
    await sleep(100);
    console.log(`Downloading ${bee.getAttribute("title")}...`);
    const response = await (
      await fetch("https://wiki.apico.buzz" + bee.getAttribute("href"))
    ).text();

    const dom = new JSDOM(response);
    const hd = dom.window.document.querySelector(
      '.aw-info a[title="Anatomy"] img',
    );
    const normal = dom.window.document.querySelector(
      '.aw-info a[title="Normal Sprite"] img',
    );

    const filename = bee
      .getAttribute("title")
      .replace(/\s/g, "")
      .toLowerCase()
      .replace("bee", "");
    const file = createWriteStream(`./public/bees/${filename}.png`, {
      flags: "wx",
      autoClose: true,
    });
    const file_hd = createWriteStream(`./public/bees/${filename}_hd.png`, {
      flags: "wx",
      autoClose: true,
    });

    let img = await fetch("https:" + normal.getAttribute("src"));
    if (img.ok) {
      await finished(Readable.fromWeb(img.body).pipe(file));
    } else {
      console.log("Error downloading normal sprite for " + filename);
    }

    img = await fetch("https:" + hd.getAttribute("src"));
    if (img.ok) {
      await finished(Readable.fromWeb(img.body).pipe(file_hd));
    } else {
      console.log("Error downloading HD sprite for " + filename);
    }
  }
})();

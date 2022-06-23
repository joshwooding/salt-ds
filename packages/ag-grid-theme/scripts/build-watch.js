const watch = require("watch");
const path = require("path");
const fs = require("fs");
const { pathToFileURL } = require("url");
const del = require("del");
const sass = require("sass");

const buildFolder = path.join(
  __dirname,
  "../../../dist/jpmorganchase-uitk-ag-grid-theme"
);

const entry = path.resolve(__dirname, "../css/styles.scss");
const pgkNodeModules = path.resolve(__dirname, "../../../node_modules/");

function buildStyles() {
  console.log(`Rebuilding stylesheet`);

  del.sync([buildFolder], { force: true });

  const result = sass.compile(entry, {
    // https://sass-lang.com/documentation/js-api/interfaces/FileImporter
    importers: [
      {
        // An importer that redirects relative URLs starting with "~" to
        // `node_modules`.
        findFileUrl(url) {
          if (!url.startsWith("~")) return null;
          const fileUrl = pathToFileURL(
            path.join(pgkNodeModules, url.substring(1))
          );
          return fileUrl;
        },
      },
    ],
  });

  const resultCSS =
    `/**** Auto generated by packages/ag-grid-theme/scripts/build.js ****/\n\n` +
    result.css;

  fs.mkdirSync(buildFolder, { recursive: true });
  // TODO: How to make sure `index.css` exist in current folder so the playground test app can resolve
  fs.writeFileSync(path.join(__dirname, "../index.css"), resultCSS);
  fs.writeFileSync(path.join(buildFolder, "index.css"), resultCSS);

  fs.copyFileSync(
    path.resolve(__dirname, "../package.json"),
    path.join(buildFolder, "package.json")
  );
}

watch.createMonitor(path.resolve(__dirname, "../css/"), function (monitor) {
  monitor.on("changed", function (f, curr, prev) {
    try {
      buildStyles();
    } catch (exc) {
      console.error(exc);
    }
  });
});

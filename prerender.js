import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROUTES = [
  "/",
  "/contact",
  "/portfolio",
  "/free-quote",
  "/service-areas",
  "/services/cctv",
  "/services/dstv",
  "/services/tv-mounting",
  "/services/repairs",
  "/404",
];

const distDir = path.join(__dirname, "dist");
const ssrEntry = path.join(__dirname, ".ssr-tmp", "entry-server.js");

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");
const { render } = await import(pathToFileURL(ssrEntry).href);

for (const url of ROUTES) {
  const { html, head } = render(url);

  // Function replacers (not strings) so literal "$" sequences in rendered content
  // (e.g. JSON-LD priceRange) aren't reinterpreted as String.replace's special patterns.
  const page = template
    .replace("<!--app-head-->", () => head)
    .replace("<!--app-html-->", () => html);

  // "/404" is special-cased to dist/404.html (not dist/404/index.html) — that's the
  // exact filename Vercel's static hosting serves, with a real 404 status, for any
  // request that doesn't match a route or another static file.
  const outPath = url === "/"
    ? path.join(distDir, "index.html")
    : url === "/404"
    ? path.join(distDir, "404.html")
    : path.join(distDir, url, "index.html");

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, page);
  console.log(`Prerendered ${url} -> ${path.relative(distDir, outPath)}`);
}

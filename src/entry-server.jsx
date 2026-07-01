import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";

const HEAD_MARKER_ID = "ssr-head-marker";
const headBlockPattern = new RegExp(`<head id="${HEAD_MARKER_ID}">([\\s\\S]*?)</head>`);

export function render(url) {
  // React 19 hoists <title>/<meta>/<link> rendered anywhere in the tree (e.g. deep inside
  // a page's <SEO> component) into the nearest real <head> element in the same render pass.
  // This empty marker head exists purely to give those tags somewhere to land, so we can
  // split the result into a head fragment and a body fragment below.
  const rendered = renderToString(
    <StrictMode>
      <head id={HEAD_MARKER_ID} />
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );

  const match = rendered.match(headBlockPattern);
  const head = match ? match[1] : "";
  const html = rendered.replace(headBlockPattern, "");

  return { html, head };
}

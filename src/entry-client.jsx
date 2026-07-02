import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

const root = document.getElementById("root");

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// .children (Element nodes only) rather than .hasChildNodes() (which also counts
// comment nodes) — the unbuilt dev index.html still has the literal <!--app-html-->
// placeholder comment inside #root, which would otherwise look like real prerendered
// content and trigger a hydration mismatch against nothing.
if (root.children.length > 0) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}

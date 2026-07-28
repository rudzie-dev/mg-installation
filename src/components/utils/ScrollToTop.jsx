import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Real <a href="/#services"> links (used for crawlability) land here as a hash
    // change rather than a route change, so scroll-to-anchor has to be handled globally.
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    }
    // Force browser window scroll coordinate matrix to absolute top-left on pathname transition
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force browser window scroll coordinate matrix to absolute top-left on pathname transition
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
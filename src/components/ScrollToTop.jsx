import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // On attend un tout petit temps pour éviter de perturber l’animation d’entrée
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 10); // Tu peux jouer avec ce timing

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
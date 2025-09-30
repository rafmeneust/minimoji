import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Login from "@/app/Login.jsx";
import Tarifs from "@/pages/Tarifs.jsx";

// (si tu n'as pas encore de Home, crée un placeholder rapide)
import Home from "@/pages/Home.jsx";

// ROUTES
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,        // ← layout racine (Header/Menu)
    children: [
      { index: true, element: <Home /> },    // page d’accueil
      { path: "tarifs", element: <Tarifs /> }
      // ajoute ici tes autres pages publiques: creer, contact, etc.
    ],
  },
  { path: "/login", element: <Login /> },    // page sans header (si tu veux)
]);
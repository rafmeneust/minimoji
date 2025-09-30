// src/components/auth/require-auth.jsx
import { useEffect, useState, cloneElement, isValidElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

export default function RequireAuth({ children }) {
  // undefined = loading, null = déconnecté, objet = connecté
  const [user, setUser] = useState(undefined);
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  if (user === undefined) {
    return <div className="p-8 text-sm text-muted-foreground">Chargement…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Injecte `user` si l’enfant est un élément React (ex: <Dashboard />)
  return isValidElement(children) ? cloneElement(children, { user }) : children;
}
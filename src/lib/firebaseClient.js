// src/lib/firebaseClient.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Lis les variables d'env exposées par Vite (préfixe VITE_)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,          // optionnel
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, // optionnel
  appId: import.meta.env.VITE_FIREBASE_APP_ID,                          // optionnel
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,          // optionnel
};

// Petit helper pour masquer la clé dans les logs de dev
const mask = (s) => (typeof s === "string" && s.length > 10 ? `${s.slice(0, 6)}…${s.slice(-4)}` : s);

// Garde-fous en dev : on veut au minimum ces 3 champs
if (import.meta.env.DEV) {
  const missing = [];
  if (!firebaseConfig.apiKey) missing.push("VITE_FIREBASE_API_KEY");
  if (!firebaseConfig.authDomain) missing.push("VITE_FIREBASE_AUTH_DOMAIN");
  if (!firebaseConfig.projectId) missing.push("VITE_FIREBASE_PROJECT_ID");

  if (missing.length) {
    console.error(
      `[firebase] Variables manquantes: ${missing.join(", ")}.
Vérifie ton .env, les noms (préfixe VITE_), et **redémarre** le serveur Vite.`
    );
  } else {
    console.info(
      `[firebase] Config OK (dev): apiKey=${mask(firebaseConfig.apiKey)}, authDomain=${firebaseConfig.authDomain}, projectId=${firebaseConfig.projectId}`
    );
  }
}

// Initialise l’app une seule fois
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Exports (utiliser `app` **après** son initialisation)
export const auth = getAuth(app);
auth.useDeviceLanguage();
export const provider = new GoogleAuthProvider();

let firestoreModulePromise;
let firestoreInstancePromise;

export function loadFirestore() {
  if (!firestoreModulePromise) {
    firestoreModulePromise = import("firebase/firestore");
  }
  return firestoreModulePromise;
}

export async function getDb() {
  if (!firestoreInstancePromise) {
    firestoreInstancePromise = loadFirestore().then(({ getFirestore, setLogLevel }) => {
      const instance = getFirestore(app);
      if (import.meta.env.DEV) setLogLevel("error");
      return instance;
    });
  }
  return firestoreInstancePromise;
}

// Expose pour debug console en dev
if (import.meta.env.DEV) window.__auth = auth;

export default app;

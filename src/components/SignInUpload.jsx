import { useState, useEffect } from 'react';
import { auth, provider } from '../lib/firebaseClient';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// --- Config côté client ---
const MAX_FILE_MB = 5; // limite raisonnable
const ACCEPT_PREFIX = 'image/';

export default function SignInUpload() {
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadInfo, setUploadInfo] = useState(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));
    return () => unsub();
  }, []);

  // Utilitaire pour POST JSON + remonter proprement l'erreur serveur
  const postJSON = async (url, body) => {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body ?? {})
    });
    let data = null;
    try {
      data = await resp.json();
    } catch (_) {
      /* ignore json parse error */
    }
    if (!resp.ok) {
      const msg = data?.error || data?.message || `${url} ${resp.status}`;
      throw new Error(msg);
    }
    return data;
  };

  const signIn = async () => {
    setError('');
    try {
      const cred = await signInWithPopup(auth, provider);
      setUser(cred.user);
      console.log('[auth] user', cred.user?.uid);
    } catch (e) {
      console.error('[auth] error', e);
      setError(e.message || 'Erreur connexion Google');
    }
  };

  const handleFile = async (file) => {
    setError('');
    setUploadInfo(null);

    try {
      if (!file) throw new Error('Aucun fichier.');
      if (!file.type?.startsWith(ACCEPT_PREFIX)) {
        throw new Error('Seules les images sont acceptées.');
      }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        throw new Error(`Image trop lourde (> ${MAX_FILE_MB} Mo).`);
      }
      if (!auth.currentUser) {
        throw new Error('Connecte-toi d’abord.');
      }

      setUploading(true);
      console.log('[upload] start', file?.name, file?.size);

      // 1) Récupérer une signature côté serveur (auth requise)
      const idToken = await auth.currentUser.getIdToken();
      const res = await fetch('/api/cloudinary-sign', {
        method: 'POST',
        headers: { Authorization: `Bearer ${idToken}` }
        // pas de Content-Type: on n'envoie pas de JSON ici
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(txt || `/api/cloudinary-sign ${res.status}`);
      }

      // sig = { signature, timestamp, apiKey, cloudName, folder, type, context, publicId? }
      const sig = await res.json();
      if (!sig?.signature || !sig?.timestamp || !sig?.apiKey || !sig?.cloudName || !sig?.folder) {
        throw new Error('Réponse de signature invalide.');
      }
      console.log('[upload] signature OK', { cloud: sig.cloudName });

      // 2) Upload signé directement chez Cloudinary
      const form = new FormData();
      form.append('file', file);
      form.append('api_key', sig.apiKey);
      form.append('timestamp', String(sig.timestamp));
      form.append('signature', sig.signature);
      // Utiliser EXACTEMENT les paramètres signés par le serveur
      form.append('folder', sig.folder);
      form.append('type', sig.type);         // "private"
      form.append('context', sig.context);   // "owner=<uid>"
      if (sig.publicId) form.append('public_id', sig.publicId);

      const url = `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`;
      const upResp = await fetch(url, { method: 'POST', body: form });
      const body = await upResp.json().catch(() => null);
      if (!upResp.ok) {
        const msg = body?.error?.message || `Upload Cloudinary échoué (${upResp.status})`;
        console.error('[upload] cloudinary error body =', body);
        throw new Error(msg);
      }

      console.log('[upload] done', body);
      setUploadInfo({ public_id: body.public_id, secure_url: body.secure_url });
      // mémorise l'upload pour la page /creer et redirige
      try { localStorage.setItem('lastUploadPublicId', body.public_id); } catch (_) {}
      navigate('/creer', { replace: true, state: { publicId: body.public_id } });
    } catch (e) {
      console.error('[upload] error', e);
      setError(e.message || 'Erreur upload');
    } finally {
      setUploading(false);
    }
  };

  const createJob = async () => {
    setError('');
    setCreating(true);
    try {
      if (!auth.currentUser) throw new Error('Connecte-toi d’abord.');
      if (!uploadInfo?.public_id) throw new Error('Upload une image avant.');

      const idToken = await auth.currentUser.getIdToken();
      const resp = await fetch('/api/create-job', {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ uploadId: uploadInfo.public_id, prompt: '' }),
      });
      const data = await resp.json().catch(() => null);
      if (!resp.ok) throw new Error(data?.error || `create-job ${resp.status}`);
      console.log('[job] created', data);
      alert(`Job créé: ${data.jobId}`);
    } catch (e) {
      console.error('[job] error', e);
      setError(e.message || 'Erreur création du job');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-12 rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/70">
      <h4 className="text-center font-display text-brand dark:text-brand mb-6">
        Créer mon Minimoji
      </h4>

      {!user ? (
        <button
          onClick={signIn}
          className="px-4 py-2 rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-indigo-500 text-white hover:bg-indigo-800 block mx-auto"
        >
          Se connecter avec Google
        </button>
      ) : (
        <p className="p-3 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
          Connecté : <strong>{user.displayName || user.email}</strong>
        </p>
      )}

      <label
        htmlFor="file-upload"
        className="block mx-auto cursor-pointer rounded-xl border-2 border-dashed border-zinc-300 p-6 text-center hover:border-violet-400 hover:bg-violet-50/40 dark:border-zinc-600 dark:hover:bg-violet-500/10 mt-4"
      >
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Choisir un dessin à uploader</p>
        <p className="mt-1 text-xs text-zinc-500">{uploading ? 'Upload en cours…' : 'Formats acceptés : JPG, PNG (≤ 5 Mo)'}
        </p>
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        className="hidden"
        disabled={!user || uploading}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {uploadInfo && (
        <>
          <img
            src={uploadInfo.secure_url}
            alt="Aperçu du dessin téléchargé"
            className="mt-4 h-24 w-24 rounded-lg border object-cover"
            loading="lazy"
            decoding="async"
            width="96"
            height="96"
            style={{ aspectRatio: "1 / 1" }}
          />
          <p className="text-xs text-zinc-500">ID : {uploadInfo.public_id}</p>
        </>
      )}

      <button
        onClick={createJob}
        disabled={!user || !uploadInfo || creating}
        className="mt-6 px-4 py-2 rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-emerald-500 text-white hover:bg-emerald-400 block mx-auto"
      >
        {creating ? 'Création…' : 'Générer un Minimoji'}
      </button>

      {error && (
        <p className="mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm dark:bg-red-900/20 dark:text-red-300">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

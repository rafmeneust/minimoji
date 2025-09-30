// src/app/Login.jsx
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/login-form";
import { auth } from "@/lib/firebaseClient";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();

  const handleEmail = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    if (cred?.user) navigate("/app");
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    if (cred?.user) navigate("/app");
  };

  const handleReset = async (email) => {
    if (!email) {
      const err = new Error("Saisis ton e-mail pour recevoir le lien.");
      err.code = "ui/missing-email";
      throw err;
    }

    const actionCodeSettings = {
      url: `${window.location.origin}/login`,
      handleCodeInApp: false,
    };

    await sendPasswordResetEmail(auth, email, actionCodeSettings);
  };

  const handleSignup = async (email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (cred?.user) navigate("/app");
  };

  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <div className="w-full max-w-sm">
        <LoginForm
          onSubmitEmail={handleEmail}
          onGoogle={handleGoogle}
          onReset={handleReset}
          onSignup={handleSignup}
        />
      </div>
    </main>
  );
}

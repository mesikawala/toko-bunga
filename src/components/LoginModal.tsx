import { useEffect, useState } from "react";
import type { FormEvent } from "react";

type LoginModalProps = {
  onClose: () => void;
  onSubmit: (credentials: { email: string; password: string }) => Promise<{
    success: boolean;
    message?: string;
  }>;
};

export const LoginModal = ({ onClose, onSubmit }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Masukkan email terdaftar.");
      return;
    }

    if (!password.trim()) {
      setError("Masukkan kata sandi admin.");
      return;
    }

    setIsSubmitting(true);
    const result = await onSubmit({ email, password });
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message || "Gagal masuk, periksa kembali data Anda.");
      return;
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-login-title"
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Tutup login"
        >
          ×
        </button>
        <h3 id="admin-login-title">Login Admin</h3>
        <p>Masukkan kata sandi untuk mengelola produk Fleurélle.</p>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Email Admin</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@fleurelle.id"
              autoFocus
            />
          </label>
          <label className="form-field">
            <span>Kata Sandi</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
            />
          </label>
          {error && <p className="modal-error">{error}</p>}
          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
};

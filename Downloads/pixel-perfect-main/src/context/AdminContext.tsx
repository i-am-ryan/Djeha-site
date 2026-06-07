import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const ADMIN_PASSWORD = "djay2024admin";
const STORAGE_KEY = "djay_admin_mode";

type AdminContextType = {
  isAdmin: boolean;
  enterAdmin: () => void;
  exitAdmin: () => void;
};

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  enterAdmin: () => {},
  exitAdmin: () => {},
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  });
  const [showPrompt, setShowPrompt] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  // Secret key combo: Shift + Ctrl + A
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.shiftKey && e.ctrlKey && e.key === "A") setShowPrompt(true);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function enterAdmin() { setShowPrompt(true); }

  function exitAdmin() {
    setIsAdmin(false);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  function submitPassword() {
    if (pw === ADMIN_PASSWORD) {
      setIsAdmin(true);
      sessionStorage.setItem(STORAGE_KEY, "true");
      setShowPrompt(false);
      setPw("");
      setError(false);
    } else {
      setError(true);
      setPw("");
    }
  }

  return (
    <AdminContext.Provider value={{ isAdmin, enterAdmin, exitAdmin }}>
      {children}

      {/* Admin exit banner */}
      {isAdmin && (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] flex items-center justify-between bg-dj-ink px-6 py-3">
          <p className="font-inter text-[11px] uppercase text-dj-bg" style={{ letterSpacing: "0.2em" }}>
            ✦ Admin Mode — Drag any image to replace it
          </p>
          <button
            onClick={exitAdmin}
            className="font-inter text-[11px] uppercase text-dj-warm transition-colors hover:text-dj-bg"
            style={{ letterSpacing: "0.15em" }}
          >
            Exit Admin
          </button>
        </div>
      )}

      {/* Password modal */}
      {showPrompt && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-dj-bg px-10 py-12">
            <p className="font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.25em" }}>
              Admin Access
            </p>
            <h2 className="mt-3 font-playfair text-[28px] text-dj-ink">Enter Password</h2>
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              onKeyDown={(e) => e.key === "Enter" && submitPassword()}
              autoFocus
              className="mt-6 w-full border border-dj-border bg-transparent px-4 py-3 font-inter text-[14px] text-dj-ink placeholder:text-dj-warm/50 focus:border-dj-charcoal focus:outline-none"
              placeholder="Password"
            />
            {error && (
              <p className="mt-2 font-inter text-[12px] text-red-500">Incorrect password.</p>
            )}
            <div className="mt-6 flex gap-3">
              <button
                onClick={submitPassword}
                className="flex-1 bg-dj-ink py-3 font-inter text-[11px] uppercase text-dj-bg transition-colors hover:bg-dj-charcoal"
                style={{ letterSpacing: "0.15em" }}
              >
                Enter
              </button>
              <button
                onClick={() => { setShowPrompt(false); setPw(""); setError(false); }}
                className="flex-1 border border-dj-border py-3 font-inter text-[11px] uppercase text-dj-charcoal"
                style={{ letterSpacing: "0.15em" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
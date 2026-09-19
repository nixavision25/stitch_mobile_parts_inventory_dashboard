import { createContext, useCallback, useContext, useRef, useState } from "react";
import Icon from "./Icon";

const ToastContext = createContext(null);

/**
 * App-wide toast notifications, replacing the per-page showToast() functions
 * from the Stitch export (which had colliding signatures across screens).
 */
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = useCallback((title, message) => {
    clearTimeout(timerRef.current);
    setToast({ title, message });
    timerRef.current = setTimeout(() => setToast(null), 4000);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div
        className={`fixed bottom-6 right-4 left-4 sm:left-auto sm:right-6 bg-ink text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 z-[100] ${
          toast ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        <Icon name="check_circle" className="text-primary-soft text-2xl shrink-0" />
        <div className="flex flex-col min-w-0">
          <span className="text-label-lg">{toast?.title}</span>
          {toast?.message && <span className="text-body-sm text-white/75 truncate">{toast.message}</span>}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

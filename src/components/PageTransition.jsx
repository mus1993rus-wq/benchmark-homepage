import { createContext, useContext, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TransitionCtx = createContext({ transitionTo: () => {} });

export function useTransitionTo() {
  return useContext(TransitionCtx).transitionTo;
}

// Фази: idle → coverIn → covered → coverOut → idle
function useTransitionState() {
  const [phase, setPhase] = useState("idle");
  const navigate = useNavigate();
  const pendingRef = useRef(null);

  const transitionTo = useCallback((to) => {
    if (phase !== "idle") return;
    pendingRef.current = to;
    setPhase("coverIn");
  }, [phase]);

  useEffect(() => {
    let t;
    if (phase === "coverIn") {
      // Завіса накрила екран → navigateємо
      t = setTimeout(() => {
        navigate(pendingRef.current);
        window.scrollTo(0, 0);
        setPhase("covered");
      }, 480);
    } else if (phase === "covered") {
      // Новий контент завантажено → відкриваємо
      t = setTimeout(() => setPhase("coverOut"), 60);
    } else if (phase === "coverOut") {
      t = setTimeout(() => setPhase("idle"), 520);
    }
    return () => clearTimeout(t);
  }, [phase, navigate]);

  return { phase, transitionTo };
}

// Overlay — темна завіса що заїжджає/виїжджає
function Overlay({ phase }) {
  if (phase === "idle") return null;

  const entering = phase === "coverIn";
  const covering = phase === "covered";
  const exiting  = phase === "coverOut";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0f1010",
        // Вхід: заїжджає справа наліво (translateX 100% → 0%)
        // Вихід: виїжджає вліво (translateX 0% → -100%)
        transform: entering
          ? "translateX(0%)"
          : covering
          ? "translateX(0%)"
          : "translateX(-100%)",
        transition: entering || exiting
          ? "transform 0.52s cubic-bezier(0.87, 0, 0.13, 1)"
          : "none",
        // Початкова позиція для entering — справа
        ...(entering && { transform: "translateX(0%)" }),
      }}
    />
  );
}

// Провайдер — перехоплює всі кліки по внутрішніх посиланнях
export function PageTransitionProvider({ children }) {
  const { phase, transitionTo } = useTransitionState();

  // Глобальний перехват кліків через capture phase —
  // спрацьовує ДО React Router's onClick, блокуємо миттєву навігацію
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Ігноруємо зовнішні, якірні посилання та target="_blank"
      if (
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("#") ||
        href.startsWith("mailto") ||
        link.hasAttribute("target")
      ) return;

      // Не перехоплюємо, якщо вже йде анімація
      if (phase !== "idle") {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      e.preventDefault();
      e.stopPropagation(); // блокуємо React Router від миттєвої навігації

      transitionTo(href);
    };

    // capture: true — перехоплюємо до React event system
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [phase, transitionTo]);

  return (
    <TransitionCtx.Provider value={{ transitionTo }}>
      {children}
      <Overlay phase={phase} />
    </TransitionCtx.Provider>
  );
}

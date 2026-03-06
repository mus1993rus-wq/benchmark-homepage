import { createContext, useContext, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const TransitionCtx = createContext({ transitionTo: () => {} });

export function useTransitionTo() {
  return useContext(TransitionCtx).transitionTo;
}

// Фази: idle → coverIn → covered → coverOut → idle
//   coverIn  (480ms): overlay заїжджає справа наліво (translateX 100% → 0%)
//   covered   (60ms): навігація + scrollTo(0,0)
//   coverOut (520ms): overlay виїжджає вліво (translateX 0% → -100%)
function useTransitionState() {
  const [phase, setPhase] = useState("idle");
  const navigate = useNavigate();
  const pendingRef = useRef(null);

  const transitionTo = useCallback(
    (to) => {
      if (phase !== "idle") return;
      pendingRef.current = to;
      setPhase("coverIn");
    },
    [phase]
  );

  useEffect(() => {
    let t;
    if (phase === "coverIn") {
      t = setTimeout(() => {
        navigate(pendingRef.current);
        window.scrollTo(0, 0);
        setPhase("covered");
      }, 480);
    } else if (phase === "covered") {
      t = setTimeout(() => setPhase("coverOut"), 60);
    } else if (phase === "coverOut") {
      t = setTimeout(() => setPhase("idle"), 520);
    }
    return () => clearTimeout(t);
  }, [phase, navigate]);

  return { phase, transitionTo };
}

// Overlay — темна завіса
//
// Проблема попередньої версії: overlay монтувався вже на translateX(0%),
// тому CSS transition не мав "з чого" анімувати → завіса просто з'являлась.
//
// Рішення (патерн як у Header dropdown):
//   1. Монтуємо елемент у стартовій позиції translateX(100%) — поза екраном справа
//   2. Через 10ms ставимо animIn=true → transform → translateX(0%)
//      CSS transition бачить зміну і програє slide-in анімацію
//   3. На фазі coverOut: animIn=false → translateX(-100%) → slide-out вліво
function Overlay({ phase }) {
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    if (phase === "coverIn") {
      const t = setTimeout(() => setAnimIn(true), 10);
      return () => clearTimeout(t);
    }
    if (phase === "covered") {
      setAnimIn(true);
    }
    if (phase === "idle") {
      setAnimIn(false);
    }
  }, [phase]);

  if (phase === "idle") return null;

  const translateX =
    phase === "coverOut"
      ? "-100%"
      : animIn
      ? "0%"
      : "100%";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0f1010",
        transform: `translateX(${translateX})`,
        transition: "transform 0.52s cubic-bezier(0.87, 0, 0.13, 1)",
        willChange: "transform",
      }}
    />
  );
}

// Провайдер — перехоплює всі кліки по внутрішніх посиланнях
export function PageTransitionProvider({ children }) {
  const { phase, transitionTo } = useTransitionState();

  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("#") ||
        href.startsWith("mailto") ||
        link.hasAttribute("target")
      )
        return;

      if (phase !== "idle") {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      transitionTo(href);
    };

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

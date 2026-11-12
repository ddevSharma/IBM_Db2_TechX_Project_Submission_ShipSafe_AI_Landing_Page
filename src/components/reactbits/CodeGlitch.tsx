import { useEffect, useRef } from "react";

/**
 * A field of monospace glyphs drawn from SQL and code tokens, flickering slowly.
 * Inspired by React Bits' LetterGlitch. Canvas only, pauses when off-screen,
 * and renders a single still frame for reduced-motion users.
 */
const GLYPHS = "SELECT?VECTOR(384)WHERE=;{}[]#$01DB2SAFE<>/*+".split("");
const COLORS = ["#1b2a4a", "#22396b", "#2f55c9", "#3b6cff", "#0f1a30"];
const HOT = "#f2c94c";

export default function CodeGlitch({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const size = 16;
    let cols = 0, rows = 0, raf = 0, last = 0, visible = true;
    let cells: { ch: string; color: string }[] = [];

    const pick = () => ({
      ch: GLYPHS[(Math.random() * GLYPHS.length) | 0],
      color: Math.random() < 0.012 ? HOT : COLORS[(Math.random() * COLORS.length) | 0],
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / (size * 0.75));
      rows = Math.ceil(height / size);
      cells = Array.from({ length: cols * rows }, pick);
      draw();
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${size - 3}px "IBM Plex Mono", monospace`;
      ctx.textBaseline = "top";
      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        ctx.fillStyle = c.color;
        ctx.fillText(c.ch, (i % cols) * size * 0.75, Math.floor(i / cols) * size);
      }
    };

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || t - last < 70) return;
      last = t;
      const n = Math.max(1, (cells.length * 0.02) | 0);
      for (let k = 0; k < n; k++) cells[(Math.random() * cells.length) | 0] = pick();
      draw();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    if (!reduce) raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}

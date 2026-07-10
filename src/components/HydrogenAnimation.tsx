"use client";

import { useEffect, useRef } from "react";

interface Molecule {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  va: number;
  scale: number;
  bondPhase: number;
  electronPhase: number;
  opacity: number;
}

function createMolecule(w: number, h: number, spawnAtBottom = false): Molecule {
  return {
    x: Math.random() * w,
    y: spawnAtBottom ? h + Math.random() * 100 : Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -(0.2 + Math.random() * 0.45),
    angle: Math.random() * Math.PI * 2,
    va: (Math.random() - 0.5) * 0.008,
    scale: 0.6 + Math.random() * 0.9,
    bondPhase: Math.random() * Math.PI * 2,
    electronPhase: Math.random() * Math.PI * 2,
    opacity: spawnAtBottom ? 0 : 0.4 + Math.random() * 0.6,
  };
}

function getThemeColors() {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  return {
    atom: isLight ? "rgba(9, 9, 11, 0.55)" : "rgba(250, 250, 249, 0.7)",
    atomGlow: isLight ? "rgba(22, 163, 74, 0.25)" : "rgba(34, 197, 94, 0.35)",
    bond: isLight ? "rgba(22, 163, 74, 0.35)" : "rgba(34, 197, 94, 0.5)",
    electron: isLight ? "rgba(22, 163, 74, 0.6)" : "rgba(74, 222, 128, 0.8)",
    label: isLight ? "rgba(22, 163, 74, 0.45)" : "rgba(34, 197, 94, 0.5)",
    particle: isLight ? "rgba(22, 163, 74, 0.12)" : "rgba(34, 197, 94, 0.15)",
  };
}

function drawH2(
  ctx: CanvasRenderingContext2D,
  mol: Molecule,
  t: number,
  colors: ReturnType<typeof getThemeColors>
) {
  const { x, y, angle, scale, bondPhase, electronPhase, opacity } = mol;
  const bondLen = 28 * scale + Math.sin(t * 0.003 + bondPhase) * 3;
  const atomR = 10 * scale;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = opacity;

  ctx.beginPath();
  ctx.moveTo(-bondLen / 2, 0);
  ctx.lineTo(bondLen / 2, 0);
  ctx.strokeStyle = colors.bond;
  ctx.lineWidth = 2 * scale;
  ctx.stroke();

  const glow = ctx.createLinearGradient(-bondLen / 2, 0, bondLen / 2, 0);
  glow.addColorStop(0, "transparent");
  glow.addColorStop(0.5, colors.bond);
  glow.addColorStop(1, "transparent");
  ctx.beginPath();
  ctx.moveTo(-bondLen / 2, 0);
  ctx.lineTo(bondLen / 2, 0);
  ctx.strokeStyle = glow;
  ctx.lineWidth = 6 * scale;
  ctx.globalAlpha = opacity * (0.3 + Math.sin(t * 0.004 + bondPhase) * 0.15);
  ctx.stroke();
  ctx.globalAlpha = opacity;

  [-1, 1].forEach((side) => {
    const ax = side * (bondLen / 2);
    const grd = ctx.createRadialGradient(ax, 0, 0, ax, 0, atomR * 1.8);
    grd.addColorStop(0, colors.atomGlow);
    grd.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(ax, 0, atomR * 1.8, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(ax, 0, atomR, 0, Math.PI * 2);
    ctx.fillStyle = colors.atom;
    ctx.fill();

    ctx.fillStyle = colors.label;
    ctx.font = `bold ${9 * scale}px IBM Plex Mono, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("H", ax, 1);
  });

  const eAngle = t * 0.005 + electronPhase;
  const eR = bondLen * 0.55;
  ctx.beginPath();
  ctx.arc(Math.cos(eAngle) * eR, Math.sin(eAngle) * eR * 0.4, 2.5 * scale, 0, Math.PI * 2);
  ctx.fillStyle = colors.electron;
  ctx.fill();

  ctx.restore();
}

export default function HydrogenAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const moleculesRef = useRef<Molecule[]>([]);
  const particlesRef = useRef<{ x: number; y: number; speed: number; size: number }[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      const count = Math.floor((canvas.width * canvas.height) / 45000);
      const molCount = Math.min(Math.max(count, 10), 24);

      moleculesRef.current = Array.from({ length: molCount }, (_, i) =>
        createMolecule(canvas.width, canvas.height, i > molCount * 0.4)
      );

      particlesRef.current = Array.from({ length: 35 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.3 + Math.random() * 0.6,
        size: 1 + Math.random() * 1.5,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = (t: number) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const colors = getThemeColors();

      particlesRef.current.forEach((p) => {
        p.y -= p.speed;
        p.x += Math.sin(t * 0.001 + p.y * 0.01) * 0.15;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = colors.particle;
        ctx.fill();
      });

      moleculesRef.current.forEach((mol) => {
        mol.x += mol.vx;
        mol.y += mol.vy;
        mol.angle += mol.va;

        if (mol.opacity < 1) mol.opacity = Math.min(1, mol.opacity + 0.008);

        if (mol.y < -80) {
          mol.x = Math.random() * width;
          mol.y = height + 20 + Math.random() * 80;
          mol.vx = (Math.random() - 0.5) * 0.3;
          mol.vy = -(0.2 + Math.random() * 0.45);
          mol.opacity = 0.3 + Math.random() * 0.3;
        }

        if (mol.x < -60) mol.x = width + 30;
        if (mol.x > width + 60) mol.x = -30;

        drawH2(ctx, mol, t, colors);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

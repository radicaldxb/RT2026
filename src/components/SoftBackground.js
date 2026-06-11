"use client";
import { useEffect, useRef } from "react";

const SoftBackground = () => {
  const b1 = useRef(null);
  const b2 = useRef(null);
  const b3 = useRef(null);
  const b4 = useRef(null);
  const raf = useRef(null);

  useEffect(() => {
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const t = (ts - start) / 1000;
      if (b1.current) b1.current.style.transform = `translate(${Math.sin(t * 0.38) * 6}vw,${Math.cos(t * 0.29) * 5}vw)`;
      if (b2.current) b2.current.style.transform = `translate(${Math.cos(t * 0.33) * 5}vw,${Math.sin(t * 0.41) * 7}vw)`;
      if (b3.current) b3.current.style.transform = `translate(${Math.sin(t * 0.47 + 1) * -6}vw,${Math.cos(t * 0.37 + 1) * 5}vw)`;
      if (b4.current) b4.current.style.transform = `translate(${Math.cos(t * 0.28 + 2) * 5}vw,${Math.sin(t * 0.33 + 2) * -6}vw)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div ref={b1} className="absolute rounded-full" style={{ width:"55vw",height:"55vw",top:"-15vw",left:"-15vw",background:"rgba(26,205,235,0.2)",filter:"blur(90px)",willChange:"transform" }} />
      <div ref={b2} className="absolute rounded-full" style={{ width:"45vw",height:"45vw",top:"-8vw",right:"-12vw",background:"rgba(107,23,218,0.14)",filter:"blur(90px)",willChange:"transform" }} />
      <div ref={b3} className="absolute rounded-full" style={{ width:"50vw",height:"50vw",bottom:"-12vw",right:"-8vw",background:"rgba(225,137,73,0.18)",filter:"blur(90px)",willChange:"transform" }} />
      <div ref={b4} className="absolute rounded-full" style={{ width:"40vw",height:"40vw",bottom:"-10vw",left:"-8vw",background:"rgba(26,205,235,0.12)",filter:"blur(90px)",willChange:"transform" }} />
      <div className="absolute rounded-full" style={{ width:"60vw",height:"60vw",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"rgba(255,255,255,0.8)",filter:"blur(80px)" }} />
    </div>
  );
};

export default SoftBackground;

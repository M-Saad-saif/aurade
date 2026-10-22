"use client";

import { useEffect, useState } from "react";
import MaskedHeading from "@/components/MaskedHeading";

export default function WelcomeIntro() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const hideTimer = window.setTimeout(() => setVisible(false), 2000);
    const removeTimer = window.setTimeout(() => setMounted(false), 2500);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-label="Welcome to Aurade"
      aria-hidden={!visible}
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#000000] px-6 transition-opacity duration-500 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <MaskedHeading
        text="Welcome To A.U.R.A.D.E"
        mediaType="video"
        src="/images/reel.mp4"
        poster="/images/logo.png"
        fillScale={1.55}
        parallax={35}
        reveal="blur"
        trigger="view"
        spotlight={false}
        spotlightRadius={180}
        outline={false}
        duration={0.75}
        stagger={0.09}
        drift={0}
        hoverZoom={0.2}
        align="center"
        brightness={1.1}
        saturation={2}
        grayscale={false}
        outlineWidth={1}
        weight={700}
        tracking={-0.05}
        lineHeight={0.95}
        textScale={0.10}
        tint="white"
      />
    </div>
  );
}

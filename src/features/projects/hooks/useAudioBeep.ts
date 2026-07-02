"use client";

import { useCallback } from "react";

export function useAudioBeep() {
  const playBeep = useCallback(() => {
    try {
      // Trigger tiny haptic feedback for touch devices
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(15);
      }

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = "sine";
      // Rapid upward pitch sweep to sound like a bubbly Pop/Plop tick!
      oscillator.frequency.setValueAtTime(550, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1100, audioCtx.currentTime + 0.06);

      gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
      // Fast attack
      gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.01);
      // Fast decay
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.09);
    } catch (e) {
      console.warn("Web Audio API not supported or user gesture needed.", e);
    }
  }, []);

  return { playBeep };
}

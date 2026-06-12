import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MusicPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
    // Try autoplay (muted) on mount
    a.muted = true;
    setMuted(true);
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="fixed bottom-5 right-5 z-40"
    >
      <audio ref={audioRef} src={src} loop />
      <motion.div
        layout
        className="glass rounded-full shadow-luxury flex items-center gap-3 px-3 py-3"
      >
        <motion.button
          onClick={toggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="w-12 h-12 rounded-full flex items-center justify-center text-background"
          style={{ background: "var(--gradient-gold)" }}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          )}
        </motion.button>

        {/* Visualizer */}
        <div className="flex items-end gap-[3px] h-6 w-10" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-pearl/80"
              animate={playing && !muted ? { height: ["20%", "100%", "40%", "80%", "30%"] } : { height: "20%" }}
              transition={{ duration: 0.9 + i * 0.15, repeat: Infinity, repeatType: "mirror" }}
            />
          ))}
        </div>

        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-pearl/70 hover:text-pearl text-xs uppercase tracking-widest px-2"
          aria-label="Toggle volume controls"
        >
          {expanded ? "−" : "+"}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex items-center gap-2 overflow-hidden"
            >
              <button onClick={() => setMuted((m) => !m)} className="text-pearl/80" aria-label="Mute">
                {muted ? "🔇" : "🔊"}
              </button>
              <input
                type="range"
                min={0} max={1} step={0.01}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 accent-[color:var(--rose-gold)]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

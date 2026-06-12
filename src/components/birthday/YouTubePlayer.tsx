import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function YouTubePlayer({ videoId }: { videoId: string }) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const post = (func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*",
    );
  };

  useEffect(() => {
    // Ensure unmuted playback after the iframe loads (user gesture already happened on gift open)
    const t = setTimeout(() => {
      post("unMute");
      post("setVolume", [60]);
      post("playVideo");
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const toggle = () => {
    if (playing) post("pauseVideo");
    else post("playVideo");
    setPlaying((p) => !p);
  };

  const toggleMute = () => {
    if (muted) post("unMute");
    else post("mute");
    setMuted((m) => !m);
  };

  const src =
    `https://www.youtube.com/embed/${videoId}` +
    `?autoplay=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1` +
    `&playsinline=1&enablejsapi=1&rel=0`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="fixed bottom-5 right-5 z-40"
    >
      {/* Hidden but present iframe — required for YouTube playback */}
      <iframe
        ref={iframeRef}
        src={src}
        allow="autoplay; encrypted-media"
        title="Birthday music"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
      />

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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.button>

        <div className="flex items-end gap-[3px] h-6 w-10" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-pearl/80"
              animate={
                playing && !muted
                  ? { height: ["20%", "100%", "40%", "80%", "30%"] }
                  : { height: "20%" }
              }
              transition={{
                duration: 0.9 + i * 0.15,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-pearl/70 hover:text-pearl text-xs uppercase tracking-widest px-2"
          aria-label="Toggle controls"
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
              <button
                onClick={toggleMute}
                className="text-pearl/80"
                aria-label="Mute"
              >
                {muted ? "🔇" : "🔊"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

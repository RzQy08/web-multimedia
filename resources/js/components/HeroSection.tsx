import { useState } from "react";
import { motion } from "motion/react";
import { Play, ArrowRight, ChevronDown, Pause, Globe2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  isDark: boolean;
}

const previewVideos = [
  {
    id: 1,
    title: "Into the Deep",
    duration: "24:38",
    thumbnail: "https://images.unsplash.com/photo-1545605114-7b82dad7b990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxvY2VhbiUyMHVuZGVyd2F0ZXIlMjBjb3JhbCUyMHJlZWZ8ZW58MXx8fHwxNzgxNDA1OTYxfDA&ixlib=rb-4.1.0&q=80&w=400",
    category: "Ocean",
  },
  {
    id: 2,
    title: "Serengeti 4K",
    duration: "18:14",
    thumbnail: "https://images.unsplash.com/photo-1549366021-9f761d450615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBkb2N1bWVudGFyeSUyMHdpbGRsaWZlJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzgxNDA1OTU3fDA&ixlib=rb-4.1.0&q=80&w=400",
    category: "Wildlife",
  },
  {
    id: 3,
    title: "Hubble's Cosmos",
    duration: "31:05",
    thumbnail: "https://images.unsplash.com/photo-1447433553548-2fc162393482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzcGFjZSUyMGNvc21vcyUyMGdhbGF4eSUyMG5lYnVsYXxlbnwxfHx8fDE3ODE0MDU5NjJ8MA&ixlib=rb-4.1.0&q=80&w=400",
    category: "Space",
  },
];

export function HeroSection({ isDark }: HeroProps) {
  const [playingId, setPlayingId] = useState<number | null>(null);

  return (
    <section id="top" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1502134249126-9f3755a50d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGNvc21vcyUyMGdhbGF4eSUyMG5lYnVsYXxlbnwxfHx8fDE3ODE0MDU5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Galaxy cosmos background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      </div>

      {/* Tiny badge — top-left corner */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute top-20 left-6 sm:left-10 lg:left-16 z-10"
      >
        <div className="flex items-center gap-1.5">
          <Globe2 size={12} className="text-cyan-400" />
          <span className="text-[10px] text-white/40 tracking-[0.18em] uppercase font-medium">
            Multimedia Storytelling
          </span>
        </div>
      </motion.div>

      {/* Main layout — flex column, fills height */}
      <div className="relative flex-1 flex flex-col justify-between px-6 sm:px-10 lg:px-16 pt-28 pb-20">

        {/* TOP HALF — left text + right video cards */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* LEFT — headline + subtitle only */}
            <div className="flex flex-col">
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.15 }}
                className="text-white leading-[1.08] mb-5"
                style={{
                  fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
                  fontWeight: 750,
                  letterSpacing: "-0.03em",
                }}
              >
                Explore the
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  Universe
                </span>
                <br />
                One Story at a Time
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.28 }}
                className="text-white/50 leading-relaxed max-w-sm"
                style={{ fontSize: "0.93rem", fontWeight: 400 }}
              >
                Stunning visuals and interactive stories spanning science, nature, history, and culture.
              </motion.p>
            </div>

            {/* RIGHT — video preview cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.35 }}
              className="hidden lg:flex flex-col gap-3"
            >
              {previewVideos.map((video, i) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.45 + i * 0.1 }}
                  className="group relative flex items-center gap-3 p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                  onClick={() => setPlayingId(playingId === video.id ? null : video.id)}
                >
                  {/* Thumbnail */}
                  <div className="relative flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden">
                    <ImageWithFallback
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-white/25 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                        {playingId === video.id ? (
                          <Pause size={10} className="text-white" />
                        ) : (
                          <Play size={10} className="text-white fill-current ml-0.5" />
                        )}
                      </div>
                    </div>
                    <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded text-white bg-black/60 text-[9px]">
                      {video.duration}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-white/80 font-semibold truncate mb-0.5">{video.title}</div>
                    <div className="text-[10px] text-white/40 tracking-wide">{video.category}</div>
                  </div>

                  {/* Playing bars */}
                  {playingId === video.id && (
                    <div className="flex items-end gap-0.5 h-4 flex-shrink-0">
                      {[1, 2, 3].map((bar) => (
                        <motion.div
                          key={bar}
                          className="w-0.5 bg-cyan-400 rounded-full"
                          animate={{ height: ["30%", "100%", "30%"] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: bar * 0.15 }}
                          style={{ height: "30%" }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              <a
                href="#videos"
                onClick={(e) => { e.preventDefault(); document.querySelector("#videos")?.scrollIntoView({ behavior: "smooth" }); }}
                className="text-center text-xs text-white/25 hover:text-white/55 transition-colors duration-200 mt-1 tracking-wide"
              >
                View all documentaries →
              </a>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM — CTA buttons + stats, full width, centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8 pt-10"
        >
          {/* Divider line */}
          <div className="w-full h-px bg-white/10" />

          {/* Buttons + Stats row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16 w-full">
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="#explore"
                onClick={(e) => { e.preventDefault(); document.querySelector("#explore")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5"
                style={{ fontWeight: 600, fontSize: "0.875rem" }}
              >
                Start Exploring
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a
                href="#videos"
                onClick={(e) => { e.preventDefault(); document.querySelector("#videos")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white/80 border border-white/20 hover:border-white/40 hover:text-white hover:bg-white/5 backdrop-blur-sm transition-all duration-300"
                style={{ fontWeight: 600, fontSize: "0.875rem" }}
              >
                <Play size={13} className="fill-current" />
                Watch Now
              </a>
            </div>

            {/* Separator dot — hide on mobile */}
            <div className="hidden sm:block w-px h-8 bg-white/15" />

            {/* Stats */}
            <div className="flex items-center gap-8 sm:gap-10">
              {[
                { value: "500K+", label: "Stories Published" },
                { value: "12M+", label: "Monthly Readers" },
                { value: "150+", label: "Countries Reached" },
              ].map(({ value, label }, i) => (
                <div key={label} className="flex flex-col items-center text-center">
                  <span
                    className="text-white"
                    style={{ fontSize: "1.45rem", fontWeight: 800, letterSpacing: "-0.04em" }}
                  >
                    {value}
                  </span>
                  <span className="text-white/35 mt-0.5" style={{ fontSize: "0.68rem", letterSpacing: "0.04em" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/20 cursor-pointer hover:text-white/40 transition-colors"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        onClick={() => document.querySelector("#explore")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown size={14} />
      </motion.div>
    </section>
  );
}
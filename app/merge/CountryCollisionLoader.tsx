"use client";

import { useEffect, useState, useRef } from "react"; // Import useRef
import { motion, useAnimationControls } from "framer-motion";
import Loader from "@/components/Loader";

// -----------------------------
// Helpers
// -----------------------------
async function fetchSvgPath(url: string): Promise<string | null> {
  const res = await fetch(url);
  if (!res.ok) return null;
  const text = await res.text();
  try {
    const doc = new DOMParser().parseFromString(text, "image/svg+xml");
    const el = doc.querySelector("path");
    if (el && el.getAttribute("d")) return el.getAttribute("d");
    const paths = Array.from(doc.querySelectorAll("path"));
    if (paths.length) return paths.map((p) => p.getAttribute("d") || "").join(" ");
  } catch (_) {}
  return null;
}

function sanitizeName(s: string) {
  return s.trim();
}

// -----------------------------
// Component Props
// -----------------------------
interface CountryCollisionLoaderProps {
  countryA: string;
  countryB: string;
  width?: number;
  height?: number;
}

// -----------------------------
// Component
// -----------------------------
export default function CountryCollisionLoader({
  countryA,
  countryB,
  width = 800,
  height = 520,
}: CountryCollisionLoaderProps) {
  const [pathA, setPathA] = useState<string | null>(null);
  const [pathB, setPathB] = useState<string | null>(null);
  const [pathMerged, setPathMerged] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [animationStarted, setAnimationStarted] = useState(false);

  // Use a ref to track if the component is mounted
  const isMounted = useRef(true);

  // Framer Motion controls
  const aControls = useAnimationControls();
  const bControls = useAnimationControls();
  const mergedControls = useAnimationControls();

  // Set isMounted to false on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Load SVG paths
  useEffect(() => {
    async function loadAll() {
      setError("");
      setLoading(true);
      setPathA(null);
      setPathB(null);
      setPathMerged(null);
      setAnimationStarted(false); // Reset animation state on new load

      try {
        const [pa, pb, pm] = await Promise.all([
          fetchSvgPath(`/api/country_svg?a=${encodeURIComponent(sanitizeName(countryA))}`),
          fetchSvgPath(`/api/country_svg?a=${encodeURIComponent(sanitizeName(countryB))}`),
          fetchSvgPath(
            `/api/merge_countries?a=${encodeURIComponent(
              sanitizeName(countryA)
            )}&b=${encodeURIComponent(sanitizeName(countryB))}`
          ),
        ]);
        // Only update state if the component is still mounted
        if (isMounted.current) {
          setPathA(pa);
          setPathB(pb);
          setPathMerged(pm);
        }
      } catch (e: any) {
        if (isMounted.current) {
          setError(e?.message || "Failed to load SVGs");
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    }
    loadAll();
  }, [countryA, countryB]);

  // Play animation when paths are loaded and not already started
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null; // To store timeout ID for cleanup

    async function startAnimation() {
      // Ensure all paths are loaded, animation hasn't started, and component is mounted
      if (!loading && pathA && pathB && pathMerged && !animationStarted && isMounted.current) {
        setAnimationStarted(true); // Mark animation as started

        // 1) Reset
        await mergedControls.set({ opacity: 0, scale: 0.95 });
        await Promise.all([
          aControls.set({ x: -width * 0.35, opacity: 1, rotate: 0, scale: 1 }),
          bControls.set({ x: width * 0.35, opacity: 1, rotate: 0, scale: 1 }),
        ]);

        // If component unmounted during initial set, stop
        if (!isMounted.current) return;

        // 2) Approach
        await Promise.all([
          aControls.start({ x: -width * 0.12, transition: { type: "spring", stiffness: 140, damping: 18 } }),
          bControls.start({ x: width * 0.12, transition: { type: "spring", stiffness: 140, damping: 18 } }),
        ]);

        if (!isMounted.current) return;

        // 3) Impact wobble
        await Promise.all([
          aControls.start({ x: -10, rotate: -2, scale: 1.03, transition: { duration: 0.25 } }),
          bControls.start({ x: 10, rotate: 2, scale: 1.03, transition: { duration: 0.25 } }),
        ]);
        await Promise.all([
          aControls.start({ x: -4, rotate: 0, scale: 1.0, transition: { duration: 0.25 } }),
          bControls.start({ x: 4, rotate: 0, scale: 1.0, transition: { duration: 0.25 } }),
        ]);

        if (!isMounted.current) return;

        // 4) Fade to merged
        await Promise.all([
          aControls.start({ opacity: 0, transition: { duration: 0.35 } }),
          bControls.start({ opacity: 0, transition: { duration: 0.35 } }),
        ]);
        await mergedControls.start({ opacity: 1, scale: 1, transition: { duration: 0.5 } });

        if (!isMounted.current) return;

        // 5) Loop: Schedule next iteration using setTimeout
        timeoutId = setTimeout(() => {
          if (isMounted.current) { // Only loop if still mounted
            void startAnimation(); // Continue the loop
          }
        }, 1200);
      }
    }

    startAnimation();

    // Cleanup function: clear any pending timeout if the component unmounts
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loading, pathA, pathB, pathMerged, animationStarted, aControls, bControls, mergedControls, width, height]);


  const showSVG = pathA || pathB || pathMerged;

  return (
    <div className="w-full">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {loading ? `Loading ${countryA} & ${countryB}...` : <Loader/>}
          </h1>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-white/10 bg-rose-500/10 px-4 py-3 text-sm text-rose-200/90">
            {error}
          </div>
        )}

        {/* Card shell with the app’s glassy look */}
        <div className="relative rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm md:p-6">
          {/* soft sky glow */}
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-sky-500/20 via-sky-500/10 to-transparent blur-2xl" />

          {showSVG ? (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              className="h-auto w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Country A */}
              {pathA && (
                <motion.path
                  d={pathA}
                  fill="none"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth={1.6}
                  initial={{ x: -width * 0.35, opacity: 1 }}
                  animate={aControls}
                  key={`path-a-${countryA}`}
                />
              )}

              {/* Country B */}
              {pathB && (
                <motion.path
                  d={pathB}
                  fill="none"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth={1.6}
                  initial={{ x: width * 0.35, opacity: 1 }}
                  animate={bControls}
                  key={`path-b-${countryB}`}
                />
              )}

              {/* Merged outline */}
              {pathMerged && (
                <motion.path
                  d={pathMerged}
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.95)"
                  strokeWidth={2}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={mergedControls}
                  style={{ transformOrigin: `${width / 2}px ${height / 2}px` }}
                  key={`path-merged-${countryA}-${countryB}`}
                />
              )}
            </svg>
          ) : (
            <div
              style={{ width, height }}
              className="grid place-items-center text-sm text-white/60"
            >
              {loading ? "Fetching country data..." : "No SVG data available."}
            </div>
          )}
        </div>

        {/* tiny footnote */}
        <div className="mt-3 text-center text-xs text-white/50">
          Tip: deep link here with <code className="rounded bg-white/10 px-1.5 py-0.5">?a=France&b=Germany</code>
        </div>
      </div>
    </div>
  );
}

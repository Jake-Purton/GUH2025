"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import { useSearchParams } from 'next/navigation'
import * as d3 from "d3-geo";
import * as topojson from "topojson-client";
import polygonClipping from "polygon-clipping";

// -----------------------------
// Utility math helpers
// -----------------------------
function polygonArea(ring) {
  // signed area using shoelace (expects [ [x,y], ... ])
  let a = 0;
  for (let i = 0, n = ring.length - 1; i < n; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[i + 1];
    a += x1 * y2 - x2 * y1;
  }
  return a / 2; // signed
}

function multiPolyArea(mpoly) {
  // mpoly: [ polygon, ... ]; polygon: [ exterior, hole1, hole2, ... ]
  // Exterior positive, holes negative (by convention). We'll sum signed.
  let total = 0;
  for (const poly of mpoly) {
    for (const ring of poly) {
      total += polygonArea(ring);
    }
  }
  return Math.abs(total);
}

function ringCentroid(ring) {
  // centroid for a ring (weighted by area)
  let a = 0, cx = 0, cy = 0;
  for (let i = 0, n = ring.length - 1; i < n; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[i + 1];
    const cross = x1 * y2 - x2 * y1;
    a += cross;
    cx += (x1 + x2) * cross;
    cy += (y1 + y2) * cross;
  }
  a *= 0.5;
  if (a === 0) return [ring[0][0], ring[0][1]];
  cx /= 6 * a;
  cy /= 6 * a;
  return [cx, cy];
}

function multiPolyCentroid(mpoly) {
  // area-weighted centroid across polygons and rings (holes negative)
  let aTotal = 0, cxTotal = 0, cyTotal = 0;
  for (const poly of mpoly) {
    for (const ring of poly) {
      const a = polygonArea(ring);
      const [cx, cy] = ringCentroid(ring);
      aTotal += a;
      cxTotal += cx * a;
      cyTotal += cy * a;
    }
  }
  if (aTotal === 0) return mpoly[0][0][0];
  return [cxTotal / aTotal, cyTotal / aTotal];
}

function transformMultiPolygon(mpoly, transformFn) {
  return mpoly.map(poly => poly.map(ring => ring.map(([x, y]) => transformFn([x, y]))));
}

function closeRings(mpoly) {
  // Ensure each ring is closed (last equals first)
  return mpoly.map(poly => poly.map(ring => {
    const n = ring.length;
    if (n === 0) return ring;
    const first = ring[0];
    const last = ring[n - 1];
    if (first[0] === last[0] && first[1] === last[1]) return ring;
    return [...ring, first];
  }));
}

function geoFeatureToMultiPolygon(feature, project) {
  // Convert GeoJSON Polygon/MultiPolygon (lon/lat) into projected multipolygon
  // structure: [ [ [ [x,y],... (ring) ], ... (rings) ], ... (polygons) ]
  const type = feature.geometry.type;
  const coords = feature.geometry.coordinates;
  const toXY = (c) => project(c);

  if (type === "Polygon") {
    const rings = coords.map(ring => ring.map(([lon, lat]) => toXY([lon, lat])));
    return [rings];
  }
  if (type === "MultiPolygon") {
    return coords.map(poly => poly.map(ring => ring.map(([lon, lat]) => toXY([lon, lat]))));
  }
  return [];
}

function mpolyToSvgPath(mpoly) {
  // Convert to SVG path string
  const parts = [];
  for (const poly of mpoly) {
    for (const ring of poly) {
      if (!ring.length) continue;
      parts.push(`M${ring[0][0]},${ring[0][1]} ` + ring.slice(1).map(([x, y]) => `L${x},${y}`).join(" ") + " Z");
    }
  }
  return parts.join(" ");
}


// Net signed area of a single polygon (array of rings); holes subtract area.
function polyNetArea(poly: number[][][]): number {
  let a = 0;
  for (const ring of poly) a += polygonArea(ring); // you already have polygonArea()
  return Math.abs(a);
}

// Keep only the largest polygon from a multipolygon
function keepLargestPolygon(mpoly: number[][][][]): number[][][][] {
  if (!mpoly || !mpoly.length) return mpoly;
  let best = mpoly[0];
  let bestA = polyNetArea(best);
  for (let i = 1; i < mpoly.length; i++) {
    const a = polyNetArea(mpoly[i]);
    if (a > bestA) {
      best = mpoly[i];
      bestA = a;
    }
  }
  return [best]; // still a multipolygon with a single polygon
}

// Optional: drop tiny islands below a fraction of the largest polygon
function dropSmallIslands(mpoly: number[][][][], minRatio = 0.03): number[][][][] {
  if (!mpoly || !mpoly.length) return mpoly;
  const areas = mpoly.map(polyNetArea);
  const maxA = Math.max(...areas);
  return mpoly.filter((poly, i) => areas[i] / maxA >= minRatio);
}

// -----------------------------
// Data loading (world map)
// -----------------------------
async function fetchWorldCountries() {
  // Using world-atlas 110m topojson (lightweight).
  const url = "https://unpkg.com/world-atlas@2/countries-110m.json";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load world atlas");
  const topo = await res.json();
  const geo = topojson.feature(topo, topo.objects.countries);

  // Attach a human-readable name by joining with a minimal list from naturalearth (prebaked map)
  // The 110m topo lacks names directly; we fetch a simple mapping.
  const nameRes = await fetch("https://unpkg.com/world-atlas@2/countries-110m.json");
  // (Same file; keeping code simple. Some builds may ship a separate names map.)
  // We'll fallback to id for label if names are missing.

  // Build a map of id->feature; names often not present, so expose ISO_A3 if available
  const features = geo.features.map(f => ({
    ...f,
    properties: {
      name: f.properties?.name || f.id?.toString() || "Unknown",
      id: f.id,
    },
  }));
  return features;
}

// -----------------------------
// Main Component
// -----------------------------
export default function CountryOverlayUnionPage({ searchParams }) {
  // Accept countries via query params ?a=France&b=Germany (case-insensitive contains match)
  const params = useSearchParams();
  const initialA = (params.get("a") ?? "France");
  const initialB = (params.get("b") ?? "Germany");

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [aName, setAName] = useState(initialA);
  const [bName, setBName] = useState(initialB);

  // Visualization state
  const width = 800;
  const height = 520;
  const padding = 24;

  // Equal-earth projection for fair area behavior in screen space
  const projection = useMemo(() => d3.geoEqualEarth().translate([width / 2, height / 2]).scale(160), [width, height]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const feats = await fetchWorldCountries();
        setCountries(feats);
      } catch (e) {
        setError(e.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const countryOptions = useMemo(() => {
    return countries
      .map(f => f.properties?.name || f.id)
      .filter(Boolean)
      .sort((x, y) => x.localeCompare(y));
  }, [countries]);

  const countryByName = (name) => {
    if (!name) return null;
    const lc = name.toLowerCase();
    return countries.find(f => (f.properties?.name || "").toLowerCase() === lc) ||
           countries.find(f => (f.properties?.name || "").toLowerCase().includes(lc));
  };

  // Build projected multipolygons for the selected countries
  const { mpolyA, mpolyB, unionMP, scaledA, scaledB } = useMemo(() => {
    const fa = countryByName(aName);
    const fb = countryByName(bName);
    if (!fa || !fb) return { mpolyA: null, mpolyB: null, unionMP: null, scaledA: null, scaledB: null };

    let mA = closeRings(geoFeatureToMultiPolygon(fa, projection));
    let mB = closeRings(geoFeatureToMultiPolygon(fb, projection));
mA = keepLargestPolygon(mA);
mB = keepLargestPolygon(mB);
    // Compute areas and centroids
    const areaA = multiPolyArea(mA);
    const areaB = multiPolyArea(mB);
    const cA = multiPolyCentroid(mA);
    const cB = multiPolyCentroid(mB);

    // Scale both to same area: we choose targetArea = max(areaA, areaB)
    const targetArea = Math.max(areaA, areaB);
    const sA = Math.sqrt(targetArea / (areaA || 1));
    const sB = Math.sqrt(targetArea / (areaB || 1));

    const scaleAround = (mp, s, center) => transformMultiPolygon(mp, ([x, y]) => [center[0] + (x - center[0]) * s, center[1] + (y - center[1]) * s]);
    let mA2 = scaleAround(mA, sA, cA);
    let mB2 = scaleAround(mB, sB, cB);

    // Re-center so their centroids coincide (overlay)
    const cA2 = multiPolyCentroid(mA2);
    const cB2 = multiPolyCentroid(mB2);
    const center = [(cA2[0] + cB2[0]) / 2, (cA2[1] + cB2[1]) / 2];
    const tA = [center[0] - cA2[0], center[1] - cA2[1]];
    const tB = [center[0] - cB2[0], center[1] - cB2[1]];

    mA2 = transformMultiPolygon(mA2, ([x, y]) => [x + tA[0], y + tA[1]]);
    mB2 = transformMultiPolygon(mB2, ([x, y]) => [x + tB[0], y + tB[1]]);

    // Compute union outline (outside border) using polygon-clipping
    // polygon-clipping expects array-of-polygons; we pass as-is
    let union = null;
    try {
      union = polygonClipping.union(mA2, mB2);
    } catch (e) {
      // In rare cases, self-intersections may break things; fall back to drawing both without union
      console.warn("Union failed:", e);
    }

    return { mpolyA: mA, mpolyB: mB, unionMP: union, scaledA: mA2, scaledB: mB2 };
  }, [aName, bName, countries, projection]);

  function downloadSVG() {
    const svg = document.getElementById("result-svg");
    if (!svg) return;
    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `overlay-${aName}-${bName}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Head>
        <title>Country Overlay & Union SVG</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="mx-auto max-w-6xl p-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Country Overlay & Outside Border (SVG)</h1>
        <p className="text-sm text-gray-600 mt-2">
          Pass two country names via query (e.g. <code>?a=France&b=Germany</code>) or use the pickers below. Shapes are projected (Equal Earth),
          scaled to the same screen area, overlaid by centroid alignment, and unioned to get the outer border.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Country A</label>
            <input
              list="countries-list"
              value={aName}
              onChange={e => setAName(e.target.value)}
              className="rounded-2xl border border-gray-300 bg-white p-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="e.g., France"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Country B</label>
            <input
              list="countries-list"
              value={bName}
              onChange={e => setBName(e.target.value)}
              className="rounded-2xl border border-gray-300 bg-white p-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="e.g., Germany"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={downloadSVG}
              className="mt-6 inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-4 py-2 shadow-sm hover:shadow focus:outline-none"
            >
              Download SVG
            </button>
          </div>
        </div>

        <datalist id="countries-list">
          {countryOptions.map(name => (
            <option key={name} value={name} />
          ))}
        </datalist>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white p-4 shadow text-center block h-auto">
            <h2 className="font-medium mb-2">Projected (scaled & aligned) – A</h2>
            <svg width={width} height={height} className="w-full h-auto border border-gray-200 rounded-lg">
              {scaledA && (
                <path d={mpolyToSvgPath(scaledA)} fill="none" stroke="#111" strokeWidth={1.5} />
              )}
            </svg>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow">
            <h2 className="font-medium mb-2">Projected (scaled & aligned) – B</h2>
            <svg width={width} height={height} className="w-full h-auto border border-gray-200 rounded-lg">
              {scaledB && (
                <path d={mpolyToSvgPath(scaledB)} fill="none" stroke="#111" strokeWidth={1.5} />
              )}
            </svg>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow">
            <h2 className="font-medium mb-2">Outside Border (Union)</h2>
            <svg id="result-svg" width={width} height={height} className="w-full h-auto border border-gray-200 rounded-lg" xmlns="http://www.w3.org/2000/svg">
              <g>
                {/* Draw faint outlines of both for context */}
                {scaledA && <path d={mpolyToSvgPath(scaledA)} fill="none" stroke="#bbb" strokeWidth={1} />}
                {scaledB && <path d={mpolyToSvgPath(scaledB)} fill="none" stroke="#bbb" strokeWidth={1} />}
                {/* Draw union border */}
                {unionMP && (
                  <path d={mpolyToSvgPath(unionMP)} fill="white" stroke="#111" strokeWidth={2} />
                )}
              </g>
            </svg>
            {!unionMP && (
              <p className="text-xs text-amber-600 mt-2">
                Union failed or not ready — showing individual outlines only.
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
        )}
        {loading && (
          <div className="mt-4 text-sm text-gray-600">Loading country data…</div>
        )}

        <div className="mt-8 text-xs text-gray-500">
          <p>
            Projection: Equal Earth (screen-space area fairness). Union performed with <code>polygon-clipping</code>. Data source:
            <code> world-atlas@2 </code> (Natural Earth, simplified). This is a visualization; topological precision may vary.
          </p>
        </div>
      </div>
    </div>
  );
}

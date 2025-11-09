"use client";

import React, { useEffect, useState } from "react";
import { getCountryData } from "../api/country_api.js";

interface CountryStats {
    name: string;
    population?: number;
    gdpPerCapita?: number;
    landArea?: number;
    flagUrl?: string;
}

interface WorldComparePageProps {
    countryA: string;
    countryB: string;
}

export default function WorldComparePage({ countryA = "United States", countryB = "Japan" }: WorldComparePageProps) {
    const [countries, setCountries] = useState<Record<string, CountryStats>>({});

    useEffect(() => {
        getCountryData([countryA, countryB]).then(setCountries);
    }, [countryA, countryB]);

    const renderInfoBox = (title: string, content: React.ReactNode) => (
        <div style={{
            background: "rgba(30, 34, 63, 0.8)",
            borderRadius: 12,
            padding: 14,
            marginBottom: 16,
            boxShadow: "0 0 6px rgba(0,0,0,0.3)",
            backdropFilter: "blur(6px)"
        }}>
            <h3 style={{ fontSize: 14, fontWeight: "bold", marginBottom: 6 }}>{title}</h3>
            <div style={{ fontSize: 13 }}>{content}</div>
        </div>
    );

    const renderCountryCard = (name: string) => {
        const data = countries[name];
        return (
            <div style={{
                flex: 1,
                background: "#0d1226",
                color: "#eaeefb",
                borderRadius: 12,
                border: "1px solid #222",
                padding: 16,
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                height: "100%"
            }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                    {data?.flagUrl && (
                        <img src={data.flagUrl} alt={`${name} flag`} style={{ width: 50, height: 30, objectFit: "cover", borderRadius: 4, marginRight: 8 }} />
                    )}
                    <h2 style={{ fontSize: 18, fontWeight: "bold" }}>{name}</h2>
                </div>

                {renderInfoBox("Stats", (
                    <>
                        <div>Population: {data?.population?.toLocaleString() ?? "N/A"}</div>
                        <div>Land Area: {data?.landArea?.toLocaleString() ?? "N/A"} km²</div>
                        <div>GDP per Capita: {data?.gdpPerCapita?.toLocaleString() ?? "N/A"} USD</div>
                    </>
                ))}

                {renderInfoBox("Music", "Popular genres, artists, instruments...")}
                {renderInfoBox("Weather", "Average temp, climate type...")}
                {renderInfoBox("Culture", "Languages, traditions, festivals...")}
            </div>
        );
    };

    return (
        <>
            {/* Keyframes injected safely */}
            <style>{`
                @keyframes glowAnim {
                    0% { background-position: 0% 50%; box-shadow: 0 0 6px #ff00ff, 0 0 12px #00ffff, 0 0 18px #ff00ff; }
                    50% { background-position: 100% 50%; box-shadow: 0 0 12px #00ffff, 0 0 18px #ff00ff, 0 0 24px #00ffff; }
                    100% { background-position: 0% 50%; box-shadow: 0 0 6px #ff00ff, 0 0 12px #00ffff, 0 0 18px #ff00ff; }
                }
            `}</style>

            <div style={{ display: "flex", flexDirection: "row", gap: 16, padding: 16, height: "100vh" }}>
                {/* Left Sidebar */}
                {renderCountryCard(countryA)}

                {/* Center Column with Buttons */}
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 24,
                }}>
                    {["Music", "Culture", "Travel"].map((text, i) => (
                        <button key={i} style={glowBtnStyle}>{text}</button>
                    ))}
                </div>

                {/* Right Sidebar */}
                {renderCountryCard(countryB)}
            </div>
        </>
    );
}

const glowBtnStyle: React.CSSProperties = {
    width: "80%",
    padding: "16px 0",
    borderRadius: 16,
    border: "none",
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer",
    color: "#fff",
    background: "linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff)",
    backgroundSize: "200% 200%",
    animation: "glowAnim 3s ease infinite",
    boxShadow: "0 0 6px #ff00ff, 0 0 12px #00ffff, 0 0 18px #ff00ff",
    textShadow: "0 0 3px #fff, 0 0 6px #ff00ff",
};

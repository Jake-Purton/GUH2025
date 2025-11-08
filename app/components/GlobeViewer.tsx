"use client";

import { useEffect, useRef } from 'react';
import dynamic from "next/dynamic";

// Dynamically import Globe for client-side only
const Globe = dynamic(() => import("globe.gl"), { ssr: false });

interface GlobeViewerProps {
    selectedCountries: string[];
    onCountryClick: (countryName: string) => void;
}

export function GlobeViewer({ selectedCountries, onCountryClick }: GlobeViewerProps) {
    const globeEl = useRef<HTMLDivElement>(null);
    const globeInstance = useRef<any>(null);

    useEffect(() => {
        if (!globeEl.current) return;

        // Wait for dynamic import to resolve
        (async () => {
            const GlobeClass = (await import("globe.gl")).default;
            if (!GlobeClass) return;

            // Correct instantiation
            const globe = new GlobeClass()(globeEl.current);

            globe
                .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
                .backgroundColor('rgba(0,0,0,0)')
                .width(window.innerWidth)
                .height(window.innerHeight);

            globeInstance.current = globe;

            // Load country data
            const res = await fetch(
                'https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson'
            );
            const countries = await res.json();

            globe.polygonsData(countries.features);

            globe.polygonAltitude((d: any) =>
                selectedCountries.includes(d.properties.NAME) ? 0.02 : 0.01
            );

            globe.polygonCapColor((d: any) => {
                const name = d.properties.NAME;
                if (selectedCountries.includes(name)) {
                    return selectedCountries.indexOf(name) === 0 ? '#3b82f6' : '#f59e0b';
                }
                return 'rgba(100, 116, 139, 0.3)';
            });

            globe.polygonSideColor(() => 'rgba(30, 41, 59, 0.5)');
            globe.polygonStrokeColor(() => '#1e293b');

            globe.polygonLabel((d: any) => `
        <div style="background: rgba(15, 23, 42, 0.95); padding: 12px; border-radius: 8px; border: 1px solid rgba(100, 116, 139, 0.3);">
          <div style="color: white; font-weight: bold; margin-bottom: 4px;">${d.properties.NAME}</div>
          <div style="color: #94a3b8; font-size: 12px;">Click to ${selectedCountries.includes(d.properties.NAME) ? 'deselect' : 'select'}</div>
        </div>
      `);

            globe.onPolygonClick((polygon: any) => {
                onCountryClick(polygon.properties.NAME);
            });

            // Auto-rotate
            globe.controls().autoRotate = true;
            globe.controls().autoRotateSpeed = 0.5;

            // Handle window resize
            const handleResize = () => {
                if (globeInstance.current) {
                    globeInstance.current.width(window.innerWidth);
                    globeInstance.current.height(window.innerHeight);
                }
            };
            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
        })();
    }, []);

    // Update colors when selection changes
    useEffect(() => {
        if (globeInstance.current) {
            globeInstance.current.polygonAltitude((d: any) =>
                selectedCountries.includes(d.properties.NAME) ? 0.02 : 0.01
            );

            globeInstance.current.polygonCapColor((d: any) => {
                const name = d.properties.NAME;
                if (selectedCountries.includes(name)) {
                    return selectedCountries.indexOf(name) === 0 ? '#3b82f6' : '#f59e0b';
                }
                return 'rgba(100, 116, 139, 0.3)';
            });
        }
    }, [selectedCountries]);

    return <div ref={globeEl} className="absolute inset-0" />;
}

# Confirmed Table Time 3D presentation

The home hero now displays the confirmed Table Time camera-and-app GLB from the Mission 2 handoff. The former overhead dining-table SVG was replaced; other content and interactions remain. The full editable project stays in the private/local handoff folder; the site ships only the GLB, preview and presentation manifest.

Asset SHA-256: `365c6742b78adc11d3ddc1d318848333dfd10bfc7891b5e415d04183dc79e305`.
GLB is Y-up in meters. The manifest dimensions and camera are centimeters; framing uses its camera direction and actual mesh bounds. No geometry or materials were redesigned.

Three.js loads in separate chunks. Controls provide pointer/touch orbit, pinch/wheel zoom, labeled zoom buttons, Front/Side/Angle views, Reset and keyboard arrows/+/-; there is no automatic rotation. A short opacity entrance and control damping respect prefers-reduced-motion. Rendering pauses when offscreen or the tab is hidden. A confirmed-image fallback is clearly marked when WebGL/model loading fails or Static preview is selected. Context-loss handling also reveals the fallback.

The approved Dining Hall Pilot pricing page is linked from navigation, homepage and footer at #pricing. Its public source contains only the approved customer-facing export: $350 USD per dining hall per month, with proposed capabilities and exclusions stated. A hall-count calculator applies that exact rate. Full financial exports are not in this repository.

To update the model: revise in the Mission-2 studio, Confirm Model, download the ZIP, and validate its manifest/checksum before replacing the three files in public/product-3d. Run npm ci, npm test, npm run lint and npm run build. The existing GitHub Pages workflow publishes dist under /Creative-website/.

Backup branch: backup/before-3d-integration-2026-11-06 (original website before this integration).

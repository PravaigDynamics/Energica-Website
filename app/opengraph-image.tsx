import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Energica Motor Company — Italian Electric Superbikes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Red top border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#78BE20",
          }}
        />

        {/* Corner mark — top left */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 48,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ width: 24, height: 2, background: "#78BE20" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.3em", textTransform: "uppercase" }}>
            Energica Motor Company
          </span>
        </div>

        {/* Main wordmark */}
        <div
          style={{
            fontSize: 104,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "0.06em",
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          ENERGICA
        </div>

        {/* Red divider */}
        <div
          style={{
            width: 56,
            height: 2,
            background: "#78BE20",
            marginBottom: 20,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
          }}
        >
          ITALIAN ELECTRIC SUPERBIKES
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Born Electric. Born Italian.
          </span>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#78BE20" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Modena, Italy
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B0C0E",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F4F1EA",
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: -0.5,
        }}
      >
        EG
      </div>
    ),
    { ...size },
  );
}

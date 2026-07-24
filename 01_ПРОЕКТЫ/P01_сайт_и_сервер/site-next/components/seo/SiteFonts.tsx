export default function SiteFonts() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      {/* Oswald = free Cyrillic stand-in for BENZIN (display), Manrope = body.
          Swap to real Benzin/Grotesk by dropping .woff2 + @font-face later. */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Oswald:wght@500;600;700&display=swap"
      />
    </>
  );
}

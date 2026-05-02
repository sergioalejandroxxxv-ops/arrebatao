"use client";
import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);

  const flyers = [
    "event-01.jpeg",
    "event-02.jpeg",
    "event-03.jpeg",
    "event-04.jpeg",
    "event-05.jpeg",
    "event-06.jpeg",
    "event-07.jpeg",
    "event-08.jpeg",
    "event-09.jpeg",
  ];

  const dates = [
    "Sabato 30 Maggio 2026",
    "Sabato 06 Giugno 2026",
    "Sabato 13 Giugno 2026",
    "Sabato 20 Giugno 2026",
    "Sabato 27 Giugno 2026",
    "Sabato 04 Luglio 2026",
    "Sabato 11 Luglio 2026",
    "Sabato 18 Luglio 2026",
    "Sabato 25 Luglio 2026",
  ];

  return (
    <main
      style={{
        background: "black",
        color: "white",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >

      {/* NAV */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          display: "flex",
          gap: "18px",
          fontSize: "12px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontWeight: 300,
        }}
      >
        {["Events", "Venue", "Corporate", "Hotel", "Reserve", "Faqs"].map((item) => (
          <span key={item} style={{ cursor: "pointer", opacity: 0.8 }}>
            {item}
          </span>
        ))}
      </div>

      {/* HERO */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>

        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            top: "42%",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              letterSpacing: "18px",
              fontWeight: 200,
              textTransform: "uppercase",
            }}
          >
            ARREBATAO
          </h1>

          <p style={{ marginTop: "12px", fontSize: "16px", opacity: 0.8 }}>
            Milan • Luxury Night Experience
          </p>
        </div>

        {/* FADE HERO */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "200px",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
            zIndex: 3,
          }}
        />

      </section>

      {/* FLYERS SECTION (FIX SCROLLBAR) */}
      <section style={{ padding: "80px 0 80px 20px" }}>

        <div
          style={{
            display: "flex",
            gap: "18px",
            overflowX: "auto",
            paddingRight: "20px",
            paddingBottom: "18px", // 👈 QUESTO CREA DISTANZA DALLA SCROLLBAR
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",

            // 👇 NASCONDE SCROLLBAR (browser moderni)
            scrollbarWidth: "none",
          }}
        >

          {flyers.map((img, index) => (
            <div
              key={index}
              style={{
                minWidth: "260px",
                scrollSnapAlign: "start",
              }}
            >

              <div
                onClick={() => setSelected(img)}
                style={{
                  width: "100%",
                  aspectRatio: "9 / 16",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <img
                  src={`/flyers/${img}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <p
                style={{
                  marginTop: "12px",
                  fontSize: "13px",
                  opacity: 0.7,
                  textAlign: "center",
                  letterSpacing: "1px",
                }}
              >
                {dates[index]}
              </p>

            </div>
          ))}

        </div>
      </section>

      {/* MODAL */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "90%",
              maxWidth: "520px",
              aspectRatio: "9 / 16",
              borderRadius: "18px",
              overflow: "hidden",
            }}
          >
            <img
              src={`/flyers/${selected}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer
        style={{
          padding: "40px 20px",
          marginTop: "60px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          fontSize: "11px",
          opacity: 0.6,
          textAlign: "center",
          letterSpacing: "1px",
        }}
      >
        © 2026 ARREBATAO Nightclub - All Rights Reserved. {" "}
        PRIVACY • TERMS • ACCESSIBILITY • COOKIE SETTINGS • COOKIE PREFERENCES
      </footer>

    </main>
  );
}
"use client";

import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [index, setIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);

  const flyers = [
    "event-01.jpeg","event-02.jpeg","event-03.jpeg","event-04.jpeg",
    "event-05.jpeg","event-06.jpeg","event-07.jpeg","event-08.jpeg","event-09.jpeg",
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

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const next = () => index !== null && setIndex((index + 1) % flyers.length);
  const prev = () => index !== null && setIndex((index - 1 + flyers.length) % flyers.length);

  return (
    <main style={{
      background: "#000",
      color: "#fff",
      fontFamily: "system-ui, -apple-system, sans-serif",
      overflowX: "hidden"
    }}>

      {/* HERO */}
      <section style={{
        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>

        <video autoPlay muted loop playsInline style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: isMobile ? "scale(1.15)" : "scale(1)"
        }}>
          <source src="/video.mp4" type="video/mp4" />
        </video>

        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,.3), rgba(0,0,0,.95))"
        }} />

        <div style={{
          position: "relative",
          textAlign: "center",
          width: "100%",
          padding: isMobile ? "0 6px" : "0 40px"
        }}>

          <h1 style={{
            fontSize: isMobile
              ? "clamp(58px, 22vw, 92px)"
              : "84px",
            letterSpacing: isMobile ? "3px" : "12px",
            fontWeight: 200,
            textTransform: "uppercase",
            lineHeight: 0.95,
            margin: 0
          }}>
            ARREBATAO
          </h1>

          {/* 🔥 TESTO RIPRISTINATO + PIÙ COERENTE LUXURY */}
          <p style={{
            marginTop: 16,
            opacity: 0.7,
            fontSize: isMobile ? "13px" : "16px",
            letterSpacing: "1.5px",
            textTransform: "uppercase"
          }}>
            Milan • Luxury Night Experience • Exclusive Events
          </p>

        </div>

        <div style={{
          position: "absolute",
          bottom: 0,
          height: 220,
          width: "100%",
          background: "linear-gradient(to bottom, transparent, #000)"
        }} />
      </section>

      {/* FLYERS */}
      <section id="flyers" style={{
        padding: "80px 0 110px 22px"
      }}>

        <div style={{
          display: "flex",
          gap: 18,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch"
        }}>

          {flyers.map((img, i) => (
            <div key={img} style={{
              minWidth: isMobile ? 210 : 260,
              scrollSnapAlign: "start"
            }}>

              <div
                onClick={() => setIndex(i)}
                onPointerDown={(e) => {
                  dragStart.current = e.clientX;
                  setIsDragging(true);
                }}
                onPointerUp={(e) => {
                  setIsDragging(false);
                }}
                style={{
                  aspectRatio: "9/16",
                  borderRadius: 22,
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.75)",
                  transition: "transform .25s ease"
                }}
              >
                <img
                  src={`/flyers/${img}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>

              {/* 🔥 TESTO RIPRISTINATO SOTTO FLYER */}
              <p style={{
                marginTop: 10,
                fontSize: 12,
                opacity: 0.65,
                textAlign: "center",
                letterSpacing: "1px"
              }}>
                {dates[i]}
              </p>

            </div>
          ))}
        </div>
      </section>

      {/* VIEWER SWIPE LUXURY */}
      {index !== null && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.97)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>

          <div
            onClick={() => setIndex(null)}
            style={{
              position: "absolute",
              top: 22,
              right: 22,
              fontSize: 22,
              cursor: "pointer",
              opacity: 0.7
            }}
          >
            ✕
          </div>

          <div
            onClick={prev}
            style={{ position: "absolute", left: 18, fontSize: 44, cursor: "pointer", opacity: 0.6 }}
          >
            ‹
          </div>

          <div
            onClick={next}
            style={{ position: "absolute", right: 18, fontSize: 44, cursor: "pointer", opacity: 0.6 }}
          >
            ›
          </div>

          <div
            onMouseDown={(e) => {
              dragStart.current = e.clientX;
              setIsDragging(true);
            }}
            onMouseUp={(e) => {
              const diff = e.clientX - dragStart.current;
              setIsDragging(false);
              if (Math.abs(diff) > 60) diff > 0 ? prev() : next();
            }}
            style={{
              width: isMobile ? "92%" : "min(620px, 75%)",
              aspectRatio: "9/16",
              borderRadius: 26,
              overflow: "hidden",
              boxShadow: "0 60px 120px rgba(0,0,0,0.85)",
              cursor: "grab"
            }}
          >
            <img
              src={`/flyers/${flyers[index]}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </div>

        </div>
      )}

      {/* FOOTER (ripristino coerente branding) */}
      <footer style={{
        padding: "70px 20px",
        textAlign: "center",
        opacity: 0.6,
        fontSize: 12,
        letterSpacing: "1px"
      }}>
        © 2026 ARREBATAO • MILAN NIGHT EXPERIENCE • ALL RIGHTS RESERVED
      </footer>

    </main>
  );
}
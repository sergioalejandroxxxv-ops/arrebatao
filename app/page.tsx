"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const events = [
    { flyer: "event-01.jpeg", date: "Sabato 30 Maggio 2026" },
    { flyer: "event-02.jpeg", date: "Sabato 06 Giugno 2026" },
    { flyer: "event-03.jpeg", date: "Sabato 13 Giugno 2026" },
    { flyer: "event-04.jpeg", date: "Sabato 20 Giugno 2026" },
    { flyer: "event-05.jpeg", date: "Sabato 27 Giugno 2026" },
    { flyer: "event-06.jpeg", date: "Sabato 04 Luglio 2026" },
    { flyer: "event-07.jpeg", date: "Sabato 11 Luglio 2026" },
    { flyer: "event-08.jpeg", date: "Sabato 18 Luglio 2026" },
    { flyer: "event-09.jpeg", date: "Sabato 25 Luglio 2026" },
  ];

  const selected = selectedIndex !== null ? events[selectedIndex] : null;

  const next = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % events.length;
    });
  };

  const prev = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + events.length) % events.length;
    });
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = original;
    };
  }, [selectedIndex]);

  return (
    <main
      style={{
        background: "black",
        color: "white",
        minHeight: "100vh",
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
        {["Event", "Venue", "Corporate", "Hotel", "Reserve", "FAQs"].map(
          (item) => (
            <div key={item}>{item}</div>
          )
        )}
      </div>

      {/* HERO */}
      <section className="hero">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/video.mp4" type="video/mp4" />
        </video>

        <div className="hero-fade" />

        <div className="hero-content">
          <h1 className="hero-title">ARREBATAO</h1>
          <p className="hero-subtitle">
            Milan • Luxury Night Experience
          </p>
        </div>
      </section>

      {/* FLYERS */}
      <section style={{ padding: "60px 20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "18px",
          }}
        >
          {events.map((ev, i) => (
            <div
              key={i}
              onClick={() => setSelectedIndex(i)}
              style={{ cursor: "pointer", textAlign: "center" }}
            >
              <img
                src={`/flyers/${ev.flyer}`}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                }}
              />
              <p
                style={{
                  marginTop: "10px",
                  fontSize: "12px",
                  letterSpacing: "1px",
                  opacity: 0.8,
                }}
              >
                {ev.date}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {selected && selectedIndex !== null && (
        <div
          onClick={() => setSelectedIndex(null)}
          onTouchStart={(e) =>
            (touchStartX.current = e.touches[0].clientX)
          }
          onTouchEnd={(e) => {
            if (!touchStartX.current) return;

            const diff =
              e.changedTouches[0].clientX - touchStartX.current;

            if (diff > 50) prev();
            if (diff < -50) next();

            touchStartX.current = null;
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            zIndex: 2000,
          }}
        >
          <img
            src={`/flyers/${selected.flyer}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90%",
              maxHeight: "80%",
              borderRadius: "12px",
            }}
          />

          <p style={{ marginTop: 20, letterSpacing: 2 }}>
            {selected.date}
          </p>
        </div>
      )}

      {/* FOOTER (ripristinato completo) */}
      <footer
        style={{
          padding: "40px 20px",
          textAlign: "center",
          fontSize: "10px",
          letterSpacing: "2px",
          opacity: 0.6,
        }}
      >
        ©️ 2026 ARREBATAO Nightclub - All Rights Reserved • PRIVACY • TERMS • ACCESSIBILITY • COOKIE SETTINGS • COOKIE PREFERENCES
      </footer>

      <style jsx>{`
        .hero {
          height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .hero-video {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .hero-fade {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 30%;
          background: linear-gradient(
            to top,
            black 40%,
            transparent 100%
          );
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-size: 78px;
          letter-spacing: 12px;
          font-weight: 300;
        }

        .hero-subtitle {
          margin-top: 12px;
          font-size: 18px;
          letter-spacing: 5px;
          opacity: 0.75;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 46px;
            letter-spacing: 8px;
          }

          .hero-subtitle {
            font-size: 13px;
            letter-spacing: 3px;
          }
        }
      `}</style>
    </main>
  );
}
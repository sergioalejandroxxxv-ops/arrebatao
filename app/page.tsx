"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

  const touchStartX = useRef<number | null>(null);

  const selected = selectedIndex !== null ? events[selectedIndex] : null;

  // ESC + lock scroll
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
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {["Event", "Venue", "Corporate", "Hotel", "Reserve", "FAQs"].map(
          (item) => (
            <div key={item} style={{ whiteSpace: "nowrap", cursor: "pointer" }}>
              {item}
            </div>
          )
        )}
      </div>

      {/* HERO */}
      <section
        style={{
          height: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
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
            zIndex: 0,
          }}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* fade bottom video */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "40%",
            background:
              "linear-gradient(to top, black 10%, transparent 100%)",
            zIndex: 1,
          }}
        />

        <div style={{ zIndex: 2 }}>
          <h1
            style={{
              fontSize: "60px",
              letterSpacing: "6px",
              fontWeight: 300,
            }}
          >
            ARREBATAO
          </h1>
          <p
            style={{
              marginTop: "10px",
              fontSize: "14px",
              letterSpacing: "3px",
              opacity: 0.7,
            }}
          >
            Milan • Luxury Night Experience
          </p>
        </div>
      </section>

      {/* FLYERS */}
      <section style={{ padding: "60px 20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
          }}
        >
          {events.map((ev, i) => (
            <div
              key={i}
              onClick={() => setSelectedIndex(i)}
              style={{
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <img
                src={ev.flyer}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  transition: "0.3s",
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

      {/* MODAL GALLERY */}
      {selected && selectedIndex !== null && (
        <div
          onClick={() => setSelectedIndex(null)}
          onTouchStart={(e) =>
            (touchStartX.current = e.touches[0].clientX)
          }
          onTouchEnd={(e) => {
            if (!touchStartX.current) return;
            const diff = e.changedTouches[0].clientX - touchStartX.current;

            if (diff > 50) prev();
            if (diff < -50) next();
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            flexDirection: "column",
          }}
        >
          <img
            src={selected.flyer}
            style={{
              maxWidth: "90%",
              maxHeight: "80%",
              borderRadius: "12px",
            }}
          />

          <p
            style={{
              marginTop: "20px",
              fontSize: "14px",
              letterSpacing: "2px",
            }}
          >
            {selected.date}
          </p>

          <p style={{ fontSize: "10px", opacity: 0.5, marginTop: "5px" }}>
            Swipe or use arrows
          </p>
        </div>
      )}

      {/* FOOTER */}
      <footer
        style={{
          padding: "40px 20px",
          textAlign: "center",
          fontSize: "10px",
          letterSpacing: "2px",
          opacity: 0.6,
        }}
      >
        2026 ARREBATAO Nightclub - All Rights Reserved • PRIVACY • TERMS • ACCESSIBILITY
      </footer>
    </main>
  );
}
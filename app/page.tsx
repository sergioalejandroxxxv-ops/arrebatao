"use client";

import { useState, useEffect, useRef, useCallback } from "react";

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

  const next = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % events.length;
    });
  }, []);

  const prev = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + events.length) % events.length;
    });
  }, []);

  // Modal: ESC + Arrow keys + body scroll lock
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIndex, next, prev]);

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
          msOverflowStyle: "none",
          maxWidth: "calc(100vw - 40px)",
        }}
      >
        {["Events", "Venue", "Corporate", "Hotel", "Reserve", "Faqs"].map((item) => (
          <button
            key={item}
            onClick={() => {}}
            style={{
              cursor: "pointer",
              opacity: 0.8,
              background: "none",
              border: "none",
              color: "inherit",
              font: "inherit",
              padding: 0,
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
            aria-label={`Navigate to ${item}`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* HERO - CENTRAGGIO PERFETTO SU MOBILE E DESKTOP */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
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

        {/* TESTO CENTRATO PERFETTAMENTE */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 2,
            width: "100%",
            padding: "0 20px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(42px, 8vw, 72px)",
              letterSpacing: "clamp(10px, 2.5vw, 18px)",
              fontWeight: 200,
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            ARREBATAO
          </h1>

          <p
            style={{
              marginTop: "12px",
              fontSize: "clamp(14px, 3.5vw, 16px)",
              opacity: 0.8,
            }}
          >
            Milan • Luxury Night Experience
          </p>
        </div>

        {/* FADE IN BASSO */}
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

      {/* FLYERS - CAROSELLO ORIZZONTALE (estetica originale) */}
      <section style={{ padding: "80px 0 80px 20px" }}>
        <div
          style={{
            display: "flex",
            gap: "18px",
            overflowX: "auto",
            paddingRight: "20px",
            paddingBottom: "20px",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          role="region"
          aria-label="Event dates carousel"
        >
          {events.map((event, index) => (
            <div
              key={index}
              style={{
                minWidth: "260px",
                scrollSnapAlign: "start",
              }}
            >
              <div
                onClick={() => setSelectedIndex(index)}
                style={{
                  width: "100%",
                  aspectRatio: "9 / 16",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <img
                  src={`/flyers/${event.flyer}`}
                  alt={`ARREBATAO event flyer for ${event.date}`}
                  loading="lazy"
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
                {event.date}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL - con swipe corretto + frecce tastiera + data */}
      {selected && (
        <div
          onClick={() => setSelectedIndex(null)}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (!touchStartX.current) return;
            const diff = e.changedTouches[0].clientX - touchStartX.current;

            if (diff > 50) prev();   // swipe right → previous
            if (diff < -50) next();  // swipe left  → next

            touchStartX.current = null;
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(16px)",
            flexDirection: "column",
          }}
          role="dialog"
          aria-modal="true"
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
              src={`/flyers/${selected.flyer}`}
              alt={`Enlarged view of ARREBATAO event flyer - ${selected.date}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          <p
            style={{
              marginTop: "20px",
              fontSize: "14px",
              letterSpacing: "2px",
              opacity: 0.9,
            }}
          >
            {selected.date}
          </p>
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
        © 2026 ARREBATAO Nightclub - All Rights Reserved.{" "}
        PRIVACY • TERMS • ACCESSIBILITY • COOKIE SETTINGS • COOKIE PREFERENCES
      </footer>
    </main>
  );
}
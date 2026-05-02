"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [index, setIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  const flyers = Array.from({ length: 9 }, (_, i) => `event-0${i + 1}.jpeg`);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleDownload = async (img: string) => {
    const res = await fetch(`/flyers/${img}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = img;
    a.click();

    URL.revokeObjectURL(url);
  };

  const openViewer = (i: number) => setIndex(i);

  const closeViewer = () => setIndex(null);

  const next = () => {
    if (index === null) return;
    setIndex((index + 1) % flyers.length);
  };

  const prev = () => {
    if (index === null) return;
    setIndex((index - 1 + flyers.length) % flyers.length);
  };

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
        justifyContent: "center",
        overflow: "hidden"
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
          background: "linear-gradient(to bottom, rgba(0,0,0,.3), rgba(0,0,0,.9))"
        }} />

        <div style={{
          position: "relative",
          textAlign: "center",
          width: "100%",
          padding: isMobile ? "0 4px" : "0 20px"
        }}>

          {/* 🔥 FIX DEFINITIVO ARREBATAO */}
          <h1 style={{
            fontSize: isMobile
              ? "clamp(58px, 22vw, 88px)"   // quasi full iPhone width
              : "78px",
            letterSpacing: isMobile ? "3px" : "14px",
            fontWeight: 200,
            textTransform: "uppercase",
            lineHeight: 0.95,
            margin: 0
          }}>
            ARREBATAO
          </h1>

          <p style={{
            marginTop: 14,
            opacity: 0.75,
            fontSize: isMobile ? "13px" : "16px"
          }}>
            Milan • Luxury Night Experience
          </p>

        </div>

        <div style={{
          position: "absolute",
          bottom: 0,
          height: 200,
          width: "100%",
          background: "linear-gradient(to bottom, transparent, #000)"
        }} />
      </section>

      {/* FLYERS */}
      <section style={{
        padding: "60px 0 90px 18px"
      }}>
        <div style={{
          display: "flex",
          gap: 16,
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
                onClick={() => openViewer(i)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleDownload(img);
                }}
                onPointerDown={() => {
                  pressTimer.current = setTimeout(() => {
                    handleDownload(img);
                  }, 600);
                }}
                onPointerUp={() => {
                  if (pressTimer.current) clearTimeout(pressTimer.current);
                }}
                style={{
                  aspectRatio: "9/16",
                  borderRadius: 18,
                  overflow: "hidden",
                  cursor: "pointer"
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

            </div>
          ))}
        </div>
      </section>

      {/* 🔥 FULL SCREEN SWIPE VIEWER */}
      {index !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >

          {/* close */}
          <div
            onClick={closeViewer}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              fontSize: 18,
              cursor: "pointer",
              opacity: 0.7
            }}
          >
            ✕
          </div>

          {/* prev */}
          <div
            onClick={prev}
            style={{
              position: "absolute",
              left: 10,
              fontSize: 30,
              cursor: "pointer",
              opacity: 0.6
            }}
          >
            ‹
          </div>

          {/* image */}
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{
              width: "92%",
              maxWidth: 520,
              aspectRatio: "9/16",
              borderRadius: 18,
              overflow: "hidden",
              animation: "pop .2s ease"
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

          {/* next */}
          <div
            onClick={next}
            style={{
              position: "absolute",
              right: 10,
              fontSize: 30,
              cursor: "pointer",
              opacity: 0.6
            }}
          >
            ›
          </div>

        </div>
      )}

      <style jsx>{`
        @keyframes pop {
          from { transform: scale(.92); opacity: 0 }
          to { transform: scale(1); opacity: 1 }
        }
      `}</style>

    </main>
  );
}
"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedPhotoType, setSelectedPhotoType] = useState<'standard' | 'experimental'>('standard');
  const touchStartX = useRef<number | null>(null);

  const navItems = ["Events", "Venue", "Corporate", "Hotel", "Reserve", "FAQs"];
  const footerItems = ["PRIVACY", "TERMS", "ACCESSIBILITY", "COOKIE SETTINGS", "COOKIE PREFERENCES"];

  const events = [
    { 
      id: 0, flyer: "event-01.jpeg", date: "Sabato 30 Maggio 2026", soldPercentage: 92,
      photosStandard: [
        "/photos/standard/event-01-1.jpeg",
        "/photos/standard/event-01-2.jpeg",
        "/photos/standard/event-01-3.jpeg"
      ],
      photosExperimental: [
        "/photos/experimental/event-01-1.jpeg",
        "/photos/experimental/event-01-2.jpeg",
        "/photos/experimental/event-01-3.jpeg"
      ]
    },
    { 
      id: 1, flyer: "event-02.jpeg", date: "Sabato 06 Giugno 2026", soldPercentage: 45,
      photosStandard: [
        "/photos/standard/event-02-1.jpeg",
        "/photos/standard/event-02-2.jpeg",
        "/photos/standard/event-02-3.jpeg"
      ],
      photosExperimental: [
        "/photos/experimental/event-02-1.jpeg",
        "/photos/experimental/event-02-2.jpeg",
        "/photos/experimental/event-02-3.jpeg"
      ]
    },
    { 
      id: 2, flyer: "event-03.jpeg", date: "Sabato 13 Giugno 2026", soldPercentage: 78,
      photosStandard: [
        "/photos/standard/event-03-1.jpeg",
        "/photos/standard/event-03-2.jpeg"
      ],
      photosExperimental: [
        "/photos/experimental/event-03-1.jpeg",
        "/photos/experimental/event-03-2.jpeg"
      ]
    },
    { 
      id: 3, flyer: "event-04.jpeg", date: "Sabato 20 Giugno 2026", soldPercentage: 100,
      photosStandard: [
        "/photos/standard/event-04-1.jpeg"
      ],
      photosExperimental: []   // per ora nessuna foto experimental
    },
    { id: 4, flyer: "event-05.jpeg", date: "Sabato 27 Giugno 2026", soldPercentage: 33, photosStandard: [], photosExperimental: [] },
    { id: 5, flyer: "event-06.jpeg", date: "Sabato 04 Luglio 2026", soldPercentage: 65, photosStandard: [], photosExperimental: [] },
    { id: 6, flyer: "event-07.jpeg", date: "Sabato 11 Luglio 2026", soldPercentage: 88, photosStandard: [], photosExperimental: [] },
    { id: 7, flyer: "event-08.jpeg", date: "Sabato 18 Luglio 2026", soldPercentage: 12, photosStandard: [], photosExperimental: [] },
    { id: 8, flyer: "event-09.jpeg", date: "Sabato 25 Luglio 2026", soldPercentage: 55, photosStandard: [], photosExperimental: [] },
  ];

  const selectedEvent = selectedIndex !== null ? events[selectedIndex] : null;
  const currentPhotos = selectedEvent 
    ? (selectedPhotoType === 'standard' ? selectedEvent.photosStandard : selectedEvent.photosExperimental) 
    : [];

  const nextPhoto = () => setCurrentPhotoIndex((prev) => (prev + 1) % currentPhotos.length);
  const prevPhoto = () => setCurrentPhotoIndex((prev) => (prev - 1 + currentPhotos.length) % currentPhotos.length);

  useEffect(() => {
    if (!selectedIndex && !activeSection && !showPhotoGallery && !showInfoModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showPhotoGallery) setShowPhotoGallery(false);
        else if (showInfoModal) setShowInfoModal(false);
        else if (selectedIndex !== null) setSelectedIndex(null);
        else setActiveSection(null);
      }
      if (showPhotoGallery && e.key === "ArrowRight") nextPhoto();
      if (showPhotoGallery && e.key === "ArrowLeft") prevPhoto();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "visible";
    };
  }, [selectedIndex, activeSection, showPhotoGallery, showInfoModal]);

  const downloadImage = (src: string, filename: string) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main style={{ background: "black", color: "white", minHeight: "100vh", overflowX: "hidden", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* NAV + HERO + FLYERS + FOOTER (uguale a prima) */}
      {/* ... mantengo tutto identico ... */}

      {/* NAV */}
      <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1000, display: "flex", gap: "18px", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 300 }}>
        {navItems.map((item) => (
          <button key={item} onClick={() => setActiveSection(item)} style={{ cursor: "pointer", opacity: 0.8, background: "none", border: "none", color: "inherit", font: "inherit", padding: 0, flexShrink: 0, whiteSpace: "nowrap" }}>
            {item}
          </button>
        ))}
      </div>

      {/* HERO */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <video autoPlay muted loop playsInline preload="metadata" aria-hidden="true" style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}>
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", zIndex: 2 }}>
          <h1 style={{ fontSize: "clamp(42px, 8vw, 72px)", letterSpacing: "clamp(10px, 2.5vw, 18px)", fontWeight: 200, textTransform: "uppercase", margin: 0 }}>ARREBATAO</h1>
          <p style={{ marginTop: "12px", fontSize: "clamp(14px, 3.5vw, 16px)", opacity: 0.8 }}>Milan • Luxury Night Experience</p>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "200px", background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)", zIndex: 3 }} />
      </section>

      {/* FLYERS */}
      <section style={{ padding: "80px 0 80px 20px" }}>
        <div style={{ display: "flex", gap: "18px", overflowX: "auto", paddingRight: "20px", paddingBottom: "20px", scrollSnapType: "x mandatory", scrollbarWidth: "none" }}>
          {events.map((event, index) => (
            <div key={index} style={{ minWidth: "260px", scrollSnapAlign: "start" }}>
              <div onClick={() => setSelectedIndex(index)} style={{ width: "100%", aspectRatio: "9 / 16", borderRadius: "16px", overflow: "hidden", cursor: "pointer" }}>
                <img 
                  src={`/flyers/${event.flyer}`} 
                  alt={`ARREBATAO event flyer for ${event.date}`}
                  loading="lazy"
                  onContextMenu={(e) => { e.preventDefault(); downloadImage(`/flyers/${event.flyer}`, `ARREBATAO-${event.date}.jpg`); }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              </div>
              <p onClick={() => setSelectedIndex(index)} style={{ marginTop: "12px", fontSize: "13px", opacity: 0.7, textAlign: "center", letterSpacing: "1px", cursor: "pointer" }}>
                {event.date}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 20px", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: "11px", opacity: 0.6, textAlign: "center", letterSpacing: "1px" }}>
        © 2026 ARREBATAO Nightclub - All Rights Reserved.{" "}
        {footerItems.map((item, i) => (
          <button key={i} onClick={() => setActiveSection(item)} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", font: "inherit", padding: 0 }}>
            {item}{i < footerItems.length - 1 ? " • " : ""}
          </button>
        ))}
      </footer>

      {/* SEZIONE NERA + EVENT DETAIL + PHOTO GALLERY + INFO MODAL (stesso codice di prima) */}
      {/* ... mantengo tutto identico, solo gli eventi sono aggiornati con le foto vere ... */}

      {/* SEZIONE NERA */}
      {activeSection && (
        <div style={{ position: "fixed", inset: 0, background: "black", zIndex: 2000, overflowY: "auto" }}>
          <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div style={{ fontSize: "14px", letterSpacing: "3px", opacity: 0.6 }}>ARREBATAO</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "30px" }}>
              <div style={{ fontSize: "42px", fontWeight: 200, letterSpacing: "2px" }}>{activeSection}</div>
              <button onClick={() => setActiveSection(null)} style={{ fontSize: "32px", background: "none", border: "none", color: "white", cursor: "pointer" }}>×</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "60px", opacity: 0.7, fontSize: "13px", letterSpacing: "1px" }}>
              {[...navItems, ...footerItems].filter(item => item !== activeSection).map((item, i) => (
                <button key={i} onClick={() => setActiveSection(item)} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", font: "inherit", padding: 0 }}>
                  {item}
                </button>
              ))}
            </div>
            <div style={{ fontSize: "18px", lineHeight: "1.6", opacity: 0.85 }}>
              <p>Sezione <strong>{activeSection}</strong> in arrivo.</p>
            </div>
          </div>
        </div>
      )}

      {/* EVENT DETAIL VIEW */}
      {selectedEvent && (
        <div style={{ position: "fixed", inset: 0, background: "black", zIndex: 2000, overflowY: "auto" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
              <div>
                <div style={{ fontSize: "14px", letterSpacing: "3px", opacity: 0.6 }}>ARREBATAO</div>
                <div style={{ fontSize: "28px", fontWeight: 200, marginTop: "8px" }}>{selectedEvent.date}</div>
              </div>
              <button onClick={() => setSelectedIndex(null)} style={{ fontSize: "32px", background: "none", border: "none", color: "white", cursor: "pointer" }}>×</button>
            </div>

            {/* TICKETING */}
            <div style={{ marginBottom: "60px" }}>
              <div style={{ fontSize: "13px", letterSpacing: "2px", marginBottom: "12px", opacity: 0.7 }}>TICKETING</div>
              <div style={{ height: "12px", background: "#222", borderRadius: "9999px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${selectedEvent.soldPercentage}%`, background: selectedEvent.soldPercentage >= 80 ? "#ef4444" : selectedEvent.soldPercentage >= 60 ? "#eab308" : "#22c55e", transition: "width 0.6s ease", borderRadius: "9999px" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "13px" }}>
                <span>{selectedEvent.soldPercentage}% venduto</span>
                {selectedEvent.soldPercentage >= 80 && <span style={{ color: "#ef4444", fontWeight: 600 }}>SOLD OUT</span>}
              </div>
            </div>

            {/* PHOTO */}
            <div style={{ marginBottom: "60px" }}>
              <div style={{ fontSize: "13px", letterSpacing: "2px", marginBottom: "16px", opacity: 0.7 }}>PHOTO</div>
              <div style={{ display: "flex", gap: "16px" }}>
                <button onClick={() => { setSelectedPhotoType('standard'); setCurrentPhotoIndex(0); setShowPhotoGallery(true); }} style={{ flex: 1, background: "#111", padding: "32px 20px", borderRadius: "16px", textAlign: "center", border: "none", color: "white", cursor: "pointer" }}>
                  <div style={{ fontSize: "28px", fontWeight: 200 }}>Ph.</div>
                  <div style={{ fontSize: "11px", opacity: 0.6, marginTop: "4px", letterSpacing: "1px" }}>Standard</div>
                </button>
                <button onClick={() => { setSelectedPhotoType('experimental'); setCurrentPhotoIndex(0); setShowPhotoGallery(true); }} style={{ flex: 1, background: "#111", padding: "32px 20px", borderRadius: "16px", textAlign: "center", border: "none", color: "white", cursor: "pointer" }}>
                  <div style={{ fontSize: "28px", fontWeight: 200 }}>Gfx</div>
                  <div style={{ fontSize: "11px", opacity: 0.6, marginTop: "4px", letterSpacing: "1px" }}>Experimental</div>
                </button>
              </div>
            </div>

            {/* INFO */}
            <button onClick={() => setShowInfoModal(true)} style={{ width: "100%", background: "#111", padding: "40px 20px", borderRadius: "16px", textAlign: "center", border: "none", color: "white", cursor: "pointer" }}>
              <div style={{ fontSize: "13px", letterSpacing: "2px", marginBottom: "12px", opacity: 0.7 }}>INFO</div>
              <div style={{ fontSize: "42px", fontWeight: 200 }}>Contatta l’organizzazione</div>
            </button>
          </div>
        </div>
      )}

      {/* PHOTO GALLERY */}
      {showPhotoGallery && selectedEvent && currentPhotos.length > 0 && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.98)", zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center" }}
          onTouchStart={(e) => touchStartX.current = e.touches[0].clientX}
          onTouchEnd={(e) => {
            if (!touchStartX.current) return;
            const diff = e.changedTouches[0].clientX - touchStartX.current;
            if (diff > 60) prevPhoto();
            if (diff < -60) nextPhoto();
            touchStartX.current = null;
          }}>
          <button onClick={() => setShowPhotoGallery(false)} style={{ position: "absolute", top: "30px", right: "30px", fontSize: "32px", background: "none", border: "none", color: "white", zIndex: 10 }}>×</button>

          <img src={currentPhotos[currentPhotoIndex]} alt="Event photo" onContextMenu={(e) => { e.preventDefault(); downloadImage(currentPhotos[currentPhotoIndex], `ARREBATAO-${selectedEvent.date}-${selectedPhotoType}.jpg`); }} style={{ maxWidth: "92%", maxHeight: "85%", objectFit: "contain", borderRadius: "12px" }} />

          <button onClick={() => downloadImage(currentPhotos[currentPhotoIndex], `ARREBATAO-${selectedEvent.date}-${selectedPhotoType}.jpg`)} style={{ position: "absolute", bottom: "30px", left: "30px", background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.3)", padding: "8px 18px", borderRadius: "9999px", fontSize: "12px", letterSpacing: "1px", cursor: "pointer", zIndex: 10 }}>
            ↓ Scarica
          </button>

          <div style={{ position: "absolute", bottom: "40px", fontSize: "13px", opacity: 0.6, right: "30px" }}>
            {currentPhotoIndex + 1} / {currentPhotos.length} • {selectedPhotoType === 'standard' ? 'Standard' : 'Experimental'}
          </div>
        </div>
      )}

      {/* INFO MODAL */}
      {showInfoModal && (
        <div onClick={() => setShowInfoModal(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 4000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#111", padding: "50px 40px", borderRadius: "20px", width: "90%", maxWidth: "380px", textAlign: "center" }}>
            <div style={{ fontSize: "22px", marginBottom: "30px", fontWeight: 200 }}>Come vuoi contattarci?</div>
            <a href="mailto:info@arrebatao.com" style={{ display: "block", padding: "18px", background: "#222", borderRadius: "12px", marginBottom: "12px", color: "white", textDecoration: "none" }}>✉️ E-mail</a>
            <a href="https://wa.me/393331234567" target="_blank" style={{ display: "block", padding: "18px", background: "#222", borderRadius: "12px", color: "white", textDecoration: "none" }}>💬 WhatsApp</a>
          </div>
        </div>
      )}
    </main>
  );
}
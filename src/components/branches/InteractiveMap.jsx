import { useEffect, useRef, useState, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  IconSearch,
  IconDirections,
  IconPhone,
  IconMapPin,
} from "@tabler/icons-react";

// Real branch images bundled directly by Vite
import imgLxpro from "@/assets/branches/lxpro.jpg";
import imgLxFabrics from "@/assets/branches/lx-fabrics.jpg";
import imgLxFresh from "@/assets/branches/lx-fresh.jpg";
import imgLxNx from "@/assets/branches/lx-nx.jpg";
import imgLxGarments from "@/assets/branches/lx-garments.jpg";
import imgLxGhoddod from "@/assets/branches/lx-ghoddod.jpg";
import imgLxMillDepo from "@/assets/branches/lx-mill-depo.jpg";
import imgLxMillMt from "@/assets/branches/lx-mill-mt.jpg";

const BRANCH_IMAGES = {
  lxpro: imgLxpro,
  "lx-fabrics": imgLxFabrics,
  "lx-fresh": imgLxFresh,
  "lx-nx": imgLxNx,
  "lx-garments": imgLxGarments,
  "lx-ghoddod": imgLxGhoddod,
  "lx-mill-depo": imgLxMillDepo,
  "lx-mill-mt": imgLxMillMt,
};

// Surat center default coordinates
const SURAT_CENTER = [21.218, 72.862];

export default function InteractiveMap({ locations = [], selectedId, onSelectLocation }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const [activeStoreId, setActiveStoreId] = useState(selectedId || locations[0]?.id || "lxpro");
  const [searchQuery, setSearchQuery] = useState("");

  // Sync external selectedId if changed
  useEffect(() => {
    if (selectedId && selectedId !== activeStoreId) {
      setActiveStoreId(selectedId);
    }
  }, [selectedId]);

  // Filter stores by search query
  const filteredStores = useMemo(() => {
    if (!searchQuery.trim()) return locations;
    const q = searchQuery.toLowerCase().trim();
    return locations.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.area.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q)
    );
  }, [locations, searchQuery]);

  // Selected store object
  const activeStore = useMemo(() => {
    return locations.find((s) => s.id === activeStoreId) || locations[0] || null;
  }, [locations, activeStoreId]);

  // ── INITIALIZE LEAFLET WITH FREE GOOGLE MAPS TILES ──
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize map
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const map = L.map(mapContainerRef.current, {
      center: SURAT_CENTER,
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: false, // Never trap mouse wheel; allows smooth page scrolling
      dragging: !isMobile,    // On mobile, allow finger swipes to scroll past the section
      touchZoom: false,
      tap: false,
    });

    mapInstanceRef.current = map;

    // Free Google Maps Roadmap tiles directly from Google (Zero API key required)
    L.tileLayer("https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      subdomains: ["0", "1", "2", "3"],
      maxZoom: 20,
      attribution: '&copy; <a href="https://maps.google.com/">Google Maps</a>',
    }).addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // ── RENDER PINS & ATTACHED CARDS WITH REAL SHOP IMAGES ──
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous markers
    markersRef.current.forEach(({ marker }) => map.removeLayer(marker));
    markersRef.current = [];

    locations.forEach((store) => {
      const isFlagship = store.id === "lxpro";
      const storeImage = BRANCH_IMAGES[store.id] || store.image;
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`;

      // Custom card attached directly to the pin
      const popupCardHTML = `
        <div class="custom-pin-card">
          <div class="pin-card-img-wrap">
            <img src="${storeImage}" alt="${store.name}" />
            ${isFlagship ? '<span class="pin-card-badge">★ FLAGSHIP</span>' : ''}
          </div>
          <div class="pin-card-body">
            <h4 class="pin-card-title">${store.name}</h4>
            <p class="pin-card-address">📍 ${store.address}</p>
            <div class="pin-card-footer">
              <span class="pin-card-area">${store.area}</span>
              <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" class="pin-card-btn">
                INDICATIONS &rarr;
              </a>
            </div>
          </div>
        </div>
      `;

      // Custom pin marker matching user's reference
      const pinHtml = `
        <div class="gmap-teardrop-pin ${isFlagship ? 'is-flagship' : ''} ${activeStoreId === store.id ? 'is-active' : ''}">
          <div class="gmap-pin-shape">
            <span class="gmap-pin-dot"></span>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: pinHtml,
        className: "custom-gmap-pin-wrapper",
        iconSize: [28, 36],
        iconAnchor: [14, 36],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([store.lat, store.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(popupCardHTML, {
          maxWidth: 280,
          className: "clean-pin-popup",
          autoPan: true,
          autoPanPaddingTopLeft: [20, 80],
          autoPanPaddingBottomRight: [20, 20],
        });

      marker.on("click", () => {
        handleStoreClick(store);
      });

      markersRef.current.push({ id: store.id, marker, lat: store.lat, lng: store.lng });
    });

    // Automatically open card attached to currently active store pin with vertical offset
    const activeMarkerObj = markersRef.current.find((m) => m.id === activeStoreId);
    if (activeMarkerObj) {
      setTimeout(() => {
        try {
          const targetPoint = map.project([activeMarkerObj.lat, activeMarkerObj.lng], 14).subtract([0, 95]);
          const targetLatLng = map.unproject(targetPoint, 14);
          map.setView(targetLatLng, 14);
        } catch {
          // fallback if map not yet sized
        }
        activeMarkerObj.marker.openPopup();
      }, 200);
    }
  }, [locations, activeStoreId, onSelectLocation]);

  // Click store in right-side list or pin on map
  const handleStoreClick = (store) => {
    setActiveStoreId(store.id);
    if (onSelectLocation) onSelectLocation(store.id);

    const map = mapInstanceRef.current;
    if (map) {
      // Offset center upwards by 105px so the pin sits in the lower portion of the viewport,
      // giving the attached card above it plenty of breathing room so it is NEVER cut off!
      try {
        const targetPoint = map.project([store.lat, store.lng], 15).subtract([0, 105]);
        const targetLatLng = map.unproject(targetPoint, 15);
        map.flyTo(targetLatLng, 15, { duration: 0.7 });
      } catch {
        map.flyTo([store.lat, store.lng], 15, { duration: 0.7 });
      }
    }

    const markerObj = markersRef.current.find((m) => m.id === store.id);
    if (markerObj) {
      setTimeout(() => {
        markerObj.marker.openPopup();
      }, 350);
    }
  };

  // Surat overview button
  const handleOverview = () => {
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo(SURAT_CENTER, 12.5, { duration: 0.8 });
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] rounded-2xl sm:rounded-3xl border border-[#EAE3D7] p-4 sm:p-6 lg:p-7 shadow-xs">
      {/* ── HEADER & SEARCH BAR ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-5 border-b border-[#F0EBE1]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-serif text-[#1F1714] font-medium m-0">
              Surat Atelier Locator
            </h3>
            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#F4EFE6] text-[#8A5528] border border-[#EAE3D7]">
              {locations.length} Locations
            </span>
          </div>
          <p className="text-xs text-[#7A6E65] mt-1 m-0">
            Click any pin on the map or select an atelier from the list to view details and indications.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <IconSearch className="w-4 h-4 text-[#9A8F85] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search area (Varachha, Katargam...)"
            className="w-full bg-[#FAF7F2] border border-[#EAE3D7] focus:border-[#9A6233] focus:bg-white rounded-full pl-9 pr-8 py-2 text-xs text-[#1F1714] placeholder-[#9A8F85] outline-none transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9A8F85] hover:text-[#1F1714] cursor-pointer"
              title="Clear search"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* ── SPLIT VIEW: FREE GOOGLE MAP ON LEFT & CLEAN LIST ON RIGHT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:h-[480px]">
        {/* ── MAP CONTAINER (7 cols on desktop) ── */}
        <div className="lg:col-span-7 relative h-[340px] sm:h-[400px] lg:h-full rounded-2xl overflow-hidden border border-[#EAE3D7] bg-[#F4EFE6] shadow-2xs">
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Surat Overview button */}
          <div className="absolute top-3 left-3 z-20">
            <button
              onClick={handleOverview}
              className="px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-[#1F1714] text-xs font-semibold shadow-md border border-[#EAE3D7] transition-all cursor-pointer"
            >
              Surat Overview
            </button>
          </div>
        </div>

        {/* ── STORE LIST (5 cols on desktop) ── */}
        <div className="lg:col-span-5 overflow-y-auto flex flex-col gap-2.5 pr-1 max-h-[320px] sm:max-h-[400px] lg:max-h-[480px] scrollbar-thin scrollbar-thumb-[#EAE3D7]">
          {filteredStores.map((store) => {
            const isSelected = activeStoreId === store.id;
            const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`;

            return (
              <div
                key={store.id}
                onClick={() => handleStoreClick(store)}
                className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? "bg-[#FAF7F2] border-[#9A6233] shadow-xs ring-1 ring-[#9A6233]/40"
                    : "bg-[#FFFFFF] border-[#EAE3D7] hover:border-[#9A6233]/50 hover:bg-[#FAF7F2]/60"
                }`}
              >
                {/* Store Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`text-sm font-semibold truncate ${
                        isSelected ? "text-[#8A5528]" : "text-[#1F1714]"
                      }`}
                    >
                      {store.name}
                    </span>
                    {store.featured && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#F4EFE6] text-[#8A5528] uppercase tracking-wide shrink-0">
                        Flagship
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#7A6E65] line-clamp-1 m-0">
                    📍 {store.address}
                  </p>

                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-[#8A7E75]">
                    <span>{store.area}</span>
                    <span>&bull;</span>
                    <a
                      href={`tel:${store.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:underline text-[#8A5528] font-medium flex items-center gap-0.5"
                    >
                      <IconPhone className="w-3 h-3" />
                      <span>{store.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Indications Button */}
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`shrink-0 flex flex-col items-center gap-1 p-2 rounded-lg transition-colors no-underline ${
                    isSelected
                      ? "text-[#8A5528] bg-[#F4EFE6]"
                      : "text-[#7A6E65] hover:text-[#8A5528] hover:bg-[#F4EFE6]/60"
                  }`}
                  title="Open turn-by-turn navigation in Google Maps"
                >
                  <IconDirections className="w-4 h-4" />
                  <span className="text-[9px] font-bold uppercase tracking-wider whitespace-nowrap">
                    INDICATIONS
                  </span>
                </a>
              </div>
            );
          })}

          {filteredStores.length === 0 && (
            <div className="p-8 text-center bg-[#FAF7F2] rounded-xl border border-dashed border-[#EAE3D7]">
              <p className="text-xs text-[#7A6E65] m-0">
                No stores found matching &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-2 text-xs font-semibold text-[#8A5528] hover:underline cursor-pointer"
              >
                Clear search & show all stores
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── CUSTOM POPUP & PIN STYLES ── */}
      <style>{`
        /* Pin styling matching reference */
        .custom-gmap-pin-wrapper {
          background: transparent !important;
          border: none !important;
        }

        .gmap-teardrop-pin {
          width: 28px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.28));
          transition: transform 0.2s ease;
        }

        .gmap-teardrop-pin:hover {
          transform: scale(1.15);
        }

        .gmap-pin-shape {
          width: 26px;
          height: 26px;
          border-radius: 50% 50% 50% 0;
          background: #0077b6;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .gmap-teardrop-pin.is-flagship .gmap-pin-shape {
          background: #9A6233;
        }

        .gmap-teardrop-pin.is-active .gmap-pin-shape {
          background: #1F1714;
          box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #1F1714;
        }

        .gmap-pin-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #FFFFFF;
        }

        /* Leaflet Popup: Attached directly to pin */
        .clean-pin-popup .leaflet-popup-content-wrapper {
          border-radius: 16px !important;
          padding: 0 !important;
          overflow: hidden !important;
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.2) !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          background: #FFFFFF !important;
        }

        .clean-pin-popup .leaflet-popup-content {
          margin: 0 !important;
          width: 255px !important;
          max-width: calc(100vw - 80px) !important;
          line-height: 1.35 !important;
        }

        .clean-pin-popup .leaflet-popup-tip {
          background: #FFFFFF !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }

        /* Card attached to pin with real image & info */
        .custom-pin-card {
          padding: 0;
          background: #FFFFFF;
        }

        .pin-card-img-wrap {
          position: relative;
          width: 100%;
          height: 110px;
          overflow: hidden;
          background: #F4EFE6;
        }

        .pin-card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .pin-card-badge {
          position: absolute;
          top: 7px;
          left: 7px;
          padding: 2px 7px;
          border-radius: 10px;
          background: rgba(31, 23, 20, 0.88);
          color: #FAF7F2;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.05em;
          backdrop-filter: blur(4px);
        }

        .pin-card-body {
          padding: 10px 12px 12px 12px;
        }

        .pin-card-title {
          margin: 0 0 3px 0;
          font-size: 14px;
          font-weight: 700;
          color: #111827;
          line-height: 1.25;
        }

        .pin-card-address {
          margin: 0 0 8px 0;
          font-size: 11px;
          color: #6B7280;
          line-height: 1.35;
        }

        .pin-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 8px;
          border-top: 1px solid #F3F4F6;
        }

        .pin-card-area {
          font-size: 11px;
          font-weight: 600;
          color: #8A5528;
        }

        .pin-card-btn {
          border: 1px solid #111827;
          border-radius: 20px;
          padding: 5px 14px;
          font-size: 10px;
          font-weight: 700;
          text-decoration: none;
          color: #111827;
          letter-spacing: 0.04em;
          white-space: nowrap;
          transition: all 0.2s ease;
          background: #FFFFFF;
        }

        .pin-card-btn:hover {
          background: #111827;
          color: #FFFFFF;
        }
      `}</style>
    </div>
  );
}

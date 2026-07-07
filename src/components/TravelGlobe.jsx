import { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

const TRAVEL_COUNTRIES = [
  {
    code: "IN",
    flag: "🇮🇳",
    name: "India",
    period: "2000–Present",
    placeCount: 12,
    lat: 22.5937,
    lng: 78.9629,
    cities: [
      {
        name: "Nagpur",
        year: "∞",
        description:
          "The Orange City at the geographical heart of India — home to VNIT Nagpur where I earned my B.Tech, the Ashlesha Astronomy Club, and four years of building things that mattered.",
      },
      {
        name: "Mumbai",
        year: "2023–2025",
        description:
          "The city that never sleeps and never stops moving — where I spent two years as a Manager at HDFC Bank, leading API integrations and data pipelines processing €1.5M+ daily.",
      },
      {
        name: "Delhi",
        year: "2022",
        description:
          "Eight cities layered on top of each other, all pretending to be one — where Mughal grandeur meets the chaos of Connaught Place and the calm of Lodhi Garden.",
      },
      {
        name: "Agra",
        year: "2022",
        description:
          "Where the Taj Mahal stops you cold — a monument to love so perfect it feels like it couldn't possibly be real, and then it is.",
      },
      {
        name: "Rajasthan",
        year: "2021",
        description:
          "Forts that look like they grew out of the desert, palaces that glow amber at dusk, and camels that have absolutely seen it all — Rajasthan is India at its most cinematic.",
      },
      {
        name: "Pune",
        year: "2024",
        description:
          "The Oxford of the East — a city with a university on every corner, a café on every lane, and the kind of energy that makes you feel like something interesting is always about to happen.",
      },
      {
        name: "Bangalore",
        year: "2023",
        description:
          "India's Silicon Valley, where every other person is building something — the tech capital that still somehow manages to be a garden city.",
      },
      {
        name: "Bhopal",
        year: "2020",
        description:
          "The City of Lakes, where the Upper and Lower Lakes shimmer at golden hour and Van Vihar National Park sits at the edge of the water.",
      },
      {
        name: "Indore",
        year: "2020",
        description:
          "India's cleanest city six years running — and the food capital of Madhya Pradesh, where Sarafa Bazaar comes alive after midnight with poha, jalebi, and chaat that redefine street food.",
      },
      {
        name: "Sagar",
        year: "2019",
        description:
          "A quieter city in the heart of Madhya Pradesh, home to Sagar Lake and one of central India's oldest universities — a place where the pace slows and the history runs deep.",
      },
      {
        name: "Bihar",
        year: "2018",
        description:
          "The cradle of civilisations — where Bodh Gaya saw the Buddha attain enlightenment, Nalanda housed one of the ancient world's greatest universities, and every stone whispers a different era.",
      },
      {
        name: "Jharkhand",
        year: "2018",
        description:
          "Where waterfalls cascade through dense sal forests and tribal culture runs unbroken — Jharkhand is India's wild heart, centred on the bustling energy of Ranchi.",
      },
    ],
  },
  {
    code: "IE",
    flag: "🇮🇪",
    name: "Ireland",
    period: "2025–Present",
    placeCount: 5,
    lat: 53.1424,
    lng: -7.6921,
    cities: [
      {
        name: "Maynooth",
        year: "∞",
        description:
          "A small university town west of Dublin where Maynooth University sits — currently home while I complete my MSc in Data Science & Analytics. The kind of place where the library is always open and the campus café knows your order.",
      },
      {
        name: "Dublin",
        year: "2025",
        description:
          "Where Georgian doorways, Temple Bar, and Trinity College's Long Room make every walk feel like stumbling into a film set — Ireland's capital has the energy of a city that punches far above its size.",
      },
      {
        name: "Cork",
        year: "2025",
        description:
          "The Real Capital (locals are very clear about this) — a city of bridges, the English Market, and a food culture taken seriously, where the River Lee divides the city like a slow heartbeat.",
      },
      {
        name: "Limerick",
        year: "2025",
        description:
          "King John's Castle stands over the Shannon and the city is quietly reinventing itself — Limerick has a creative energy that surprises you the moment you stop expecting it.",
      },
      {
        name: "Kerry",
        year: "2025",
        description:
          "The Ring of Kerry made me understand why people come to Ireland and never entirely leave — mountains that drop straight into the Atlantic, lakes so still they look painted, and light that changes every ten minutes.",
      },
    ],
  },
  {
    code: "NL",
    flag: "🇳🇱",
    name: "Netherlands",
    period: "2025",
    placeCount: 1,
    lat: 52.3676,
    lng: 4.9041,
    cities: [
      {
        name: "Amsterdam",
        year: "2025",
        description:
          "Where every street is a canal and every canal has a story — the Rijksmuseum, the Van Gogh Museum, and a city that fits more art and history per square metre than almost anywhere on earth.",
      },
    ],
  },
  {
    code: "GB",
    flag: "🇬🇧",
    name: "United Kingdom",
    period: "2026",
    placeCount: 1,
    lat: 55.3781,
    lng: -3.4360,
    cities: [
      {
        name: "London",
        year: "2026",
        description:
          "The city that contains multitudes — from the Tower of London to the Tate Modern, the Tube to the Thames, London rewards every walk with something you didn't expect.",
      },
    ],
  },
  {
    code: "QA",
    flag: "🇶🇦",
    name: "Qatar",
    period: "2025",
    placeCount: 1,
    lat: 25.3548,
    lng: 51.1839,
    cities: [
      {
        name: "Doha",
        year: "2025",
        description:
          "Where the Museum of Islamic Art rises out of the bay and the Corniche stretches along a skyline designed to be photographed at sunset — Doha moves fast and doesn't apologise for it.",
      },
    ],
  },
  {
    code: "EG",
    flag: "🇪🇬",
    name: "Egypt",
    period: "2026",
    placeCount: 1,
    lat: 26.8206,
    lng: 30.8025,
    cities: [
      {
        name: "Cairo",
        year: "2026",
        description:
          "Standing in front of the Pyramids of Giza is one of those moments where you genuinely cannot believe what you're looking at — 4,500 years old, still standing, still making humans feel small in the best possible way.",
      },
    ],
  },
];

const CITY_COORDS = {
  // 🇮🇳 India
  "Nagpur":     [21.1458,  79.0882],
  "Mumbai":     [19.0760,  72.8777],
  "Delhi":      [28.6139,  77.2090],
  "Agra":       [27.1767,  78.0081],
  "Rajasthan":  [26.9124,  75.7873],  // Jaipur centroid
  "Pune":       [18.5204,  73.8567],
  "Bangalore":  [12.9716,  77.5946],
  "Bhopal":     [23.2599,  77.4126],
  "Indore":     [22.7196,  75.8577],
  "Sagar":      [23.8388,  78.7378],
  "Bihar":      [25.5941,  85.1376],  // Patna
  "Jharkhand":  [23.3441,  85.3096],  // Ranchi
  // 🇮🇪 Ireland
  "Maynooth":   [53.3826,  -6.5933],
  "Dublin":     [53.3498,  -6.2603],
  "Cork":       [51.8985,  -8.4756],
  "Limerick":   [52.6638,  -8.6267],
  "Kerry":      [52.1545,  -9.5669],
  // 🇳🇱 Netherlands
  "Amsterdam":  [52.3676,   4.9041],
  // 🇬🇧 United Kingdom
  "London":     [51.5074,  -0.1278],
  // 🇶🇦 Qatar
  "Doha":       [25.2854,  51.5310],
  // 🇪🇬 Egypt
  "Cairo":      [30.0444,  31.2357],
};

function sortCitiesByYear(cities) {
  const score = (year) => {
    if (year === "∞") return Infinity;
    const years = String(year).match(/\d{4}/g);
    if (!years) return -Infinity;
    return Math.max(...years.map(Number));
  };
  return [...cities].sort((a, b) => {
    const diff = score(b.year) - score(a.year);
    if (diff !== 0) return diff;
    return a.name.localeCompare(b.name);
  });
}

const CITY_PINS = TRAVEL_COUNTRIES.flatMap((country) =>
  country.cities
    .map((city) => {
      const coords = CITY_COORDS[city.name];
      if (!coords) return null;
      return {
        name: city.name,
        country: country.name,
        flag: country.flag,
        lat: coords[0],
        lng: coords[1],
      };
    })
    .filter(Boolean)
);

const COUNTRIES_GEOJSON =
  "https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson";

function readTheme() {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

const GLOBE_PALETTE = {
  dark:  { atmosphere: "#22d3ee", poly: "rgba(255, 255, 255, 0.85)", sphere: "#000000", pin: "#ff7a3d" },
  light: { atmosphere: "#6366f1", poly: "rgba(40, 40, 55, 0.85)", sphere: "#f8f8f5", pin: "#dc2626" },
};

export default function TravelGlobe() {
  const stageRef = useRef(null);
  const globeRef = useRef(null);
  const chipsRef = useRef(null);
  const [countries, setCountries] = useState({ features: [] });
  const [dims, setDims] = useState({ w: 600, h: 600 });
  const [openIdx, setOpenIdx] = useState(null);
  const [selectedCityIdx, setSelectedCityIdx] = useState(0);
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    const obs = new MutationObserver(() => setTheme(readTheme()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  const palette = GLOBE_PALETTE[theme];
  const globeMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ color: palette.sphere }),
    [palette.sphere]
  );

  useEffect(() => {
    let cancelled = false;
    fetch(COUNTRIES_GEOJSON)
      .then((r) => r.json())
      .then((json) => { if (!cancelled) setCountries(json); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!stageRef.current) return;
    const measure = () => {
      const rect = stageRef.current.getBoundingClientRect();
      setDims({ w: Math.max(320, rect.width), h: Math.max(320, rect.height) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const g = globeRef.current;
    const stage = stageRef.current;
    if (!g || !stage) return;
    const controls = g.controls?.();
    if (controls) {
      controls.autoRotateSpeed = 0.875;
      controls.enableZoom = false;
    }

    let isVisible = false;
    let isIntro = document.body.classList.contains("intro-active");

    const apply = () => {
      const shouldRun = isVisible && !isIntro;
      if (controls) controls.autoRotate = shouldRun;
      if (shouldRun) g.resumeAnimation?.();
      else g.pauseAnimation?.();
    };
    apply();

    const io = new IntersectionObserver(
      (entries) => { isVisible = entries[0]?.isIntersecting ?? false; apply(); },
      { rootMargin: "200px 0px" }
    );
    io.observe(stage);

    const mo = new MutationObserver(() => {
      isIntro = document.body.classList.contains("intro-active");
      apply();
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => { io.disconnect(); mo.disconnect(); };
  }, []);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e) => { if (e.key === "Escape") setOpenIdx(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIdx]);

  useEffect(() => {
    if (openIdx === null) return;
    const el = chipsRef.current;
    if (!el) return;

    let isDown = false, dragging = false, startX = 0, startScroll = 0;

    const onMove = (e) => {
      if (!isDown) return;
      const delta = e.pageX - startX;
      if (!dragging && Math.abs(delta) > 4) { dragging = true; el.classList.add("dragging"); }
      if (dragging) { el.scrollLeft = startScroll - delta; e.preventDefault(); }
    };
    const onUp = () => {
      if (!isDown) return;
      isDown = false;
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      if (dragging) {
        el.classList.remove("dragging");
        const block = (ev) => { ev.stopPropagation(); ev.preventDefault(); el.removeEventListener("click", block, true); };
        el.addEventListener("click", block, true);
      }
      dragging = false;
    };
    const onDown = (e) => {
      isDown = true; dragging = false; startX = e.pageX; startScroll = el.scrollLeft;
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    };

    el.addEventListener("pointerdown", onDown);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };
  }, [openIdx]);

  const openCountry = openIdx !== null ? TRAVEL_COUNTRIES[openIdx] : null;
  const sortedCities = useMemo(
    () => (openCountry ? sortCitiesByYear(openCountry.cities) : []),
    [openCountry]
  );
  const selectedCity = openCountry && sortedCities[selectedCityIdx];

  const openRow = (i) => {
    if (openIdx === i) { setOpenIdx(null); return; }
    setSelectedCityIdx(0);
    setOpenIdx(i);
  };
  const closeModal = () => setOpenIdx(null);

  return (
    <section className="travel-globe-section">
      <h2 className="travel-globe-title">
        <span aria-hidden="true">✈️</span> Places I've Traveled
      </h2>

      <div className="travel-globe-grid">
        <div className="travel-globe-stage" ref={stageRef}>
          <Globe
            ref={globeRef}
            width={dims.w}
            height={dims.h}
            backgroundColor="rgba(0,0,0,0)"
            showGlobe={true}
            globeImageUrl={null}
            showGraticules={false}
            showAtmosphere={false}
            globeMaterial={globeMaterial}
            hexPolygonsData={countries.features}
            hexPolygonResolution={3}
            hexPolygonMargin={0.35}
            hexPolygonUseDots={true}
            hexPolygonColor={() => palette.poly}
            htmlElementsData={CITY_PINS}
            htmlLat={(d) => d.lat}
            htmlLng={(d) => d.lng}
            htmlAltitude={0.01}
            htmlElement={(d) => {
              const el = document.createElement("div");
              el.className = "globe-city-pin";
              el.title = `${d.flag} ${d.name}, ${d.country}`;
              return el;
            }}
          />
          <span
            className="travel-globe-rim"
            aria-hidden="true"
            style={{
              width:  Math.min(dims.w, dims.h) * 0.68,
              height: Math.min(dims.w, dims.h) * 0.68,
            }}
          />
        </div>

        <ul className="travel-dashboard">
          {TRAVEL_COUNTRIES.map((c, i) => {
            const expandable = c.cities && c.cities.length > 0;
            const isOpen = openIdx === i;
            return (
              <li
                key={c.code}
                className={`travel-row${isOpen ? " open" : ""}${expandable ? " expandable" : ""}`}
              >
                <button
                  type="button"
                  className="travel-row-head"
                  onClick={() => expandable && openRow(i)}
                  aria-expanded={isOpen}
                  aria-haspopup="dialog"
                >
                  <span className="travel-flag" aria-hidden="true">{c.flag}</span>
                  <span className="travel-info">
                    <span className="travel-country">{c.name}</span>
                    <span className="travel-period">{c.period}</span>
                  </span>
                  <span className="travel-count">
                    {c.placeCount} {c.placeCount === 1 ? "place" : "places"}
                  </span>
                  <span className="travel-chevron" aria-hidden="true">▼</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {openCountry ? (
        <div
          className="travel-modal"
          role="region"
          aria-label={`Places visited in ${openCountry.name}`}
        >
          <header className="travel-modal-header">
            <span className="travel-modal-flag" aria-hidden="true">{openCountry.flag}</span>
            <h3 className="travel-modal-country">{openCountry.name}</h3>
            <span className="travel-modal-count">
              {openCountry.placeCount} {openCountry.placeCount === 1 ? "place" : "places"} visited
            </span>
            <button
              type="button"
              className="travel-modal-close"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
          </header>

          <div className="travel-modal-chips" ref={chipsRef}>
            {sortedCities.map((city, i) => (
              <button
                type="button"
                key={city.name}
                className={`travel-chip${i === selectedCityIdx ? " active" : ""}`}
                onClick={() => setSelectedCityIdx(i)}
              >
                <span className="travel-chip-dot" aria-hidden="true">•</span>
                {city.name}
                <span className="travel-chip-year">{city.year}</span>
              </button>
            ))}
          </div>

          {selectedCity ? (
            <div className="travel-modal-detail">
              <div className="travel-modal-detail-info">
                <h4 className="travel-modal-detail-name">
                  {selectedCity.name}
                  <span className="travel-modal-detail-year">{selectedCity.year}</span>
                </h4>
                <p className="travel-modal-detail-desc">{selectedCity.description}</p>
              </div>
              {selectedCity.image ? (
                <img
                  src={selectedCity.image}
                  alt={selectedCity.name}
                  className="travel-modal-detail-img"
                />
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

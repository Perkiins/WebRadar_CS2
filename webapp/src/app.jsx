import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import "./App.css";
import PlayerCard from "./components/PlayerCard";
import Radar from "./components/Radar";
import { getLatency, Latency } from "./components/latency";
import MaskedIcon from "./components/maskedicon";

const CONNECTION_TIMEOUT = 5000;
const USE_LOCALHOST = 0;
const PORT = 22006;

// LAN FIX
const EFFECTIVE_IP = USE_LOCALHOST ? "localhost" : window.location.hostname;

// DEFAULT SETTINGS FINALES
const DEFAULT_SETTINGS = {
  uiAccentColor: "#84c8ed",
  backgroundColor: "",
  showTOnMap: true,
  showCTOnMap: true,
  showTOnSidebar: true,
  showCTOnSidebar: true,
  customTColor: "#ff0000",
  bombColor: "#ff0000",
  mapRotation: 0,
  mapZoom: 1,
  dotSize: 1,
  showAllNames: false,
  showEnemyNames: true,
  showViewCones: false,
};

// Carga settings pero SIEMPRE mergea con defaults
const loadSettings = () => {
  try {
    const saved = localStorage.getItem("radarSettings");
    if (!saved) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(saved);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch (e) {
    console.error("Error loading settings, using defaults", e);
    return DEFAULT_SETTINGS;
  }
};

const App = () => {
  const [averageLatency, setAverageLatency] = useState(0);
  const [playerArray, setPlayerArray] = useState([]);
  const [mapData, setMapData] = useState();
  const [localTeam, setLocalTeam] = useState();
  const [bombData, setBombData] = useState();
  const [settings, setSettings] = useState(loadSettings());
  const [bannerOpened, setBannerOpened] = useState(false);

  // Persist settings
  useEffect(() => {
    localStorage.setItem("radarSettings", JSON.stringify(settings));
  }, [settings]);

  // Background controller
  useEffect(() => {
    if (!mapData) return;

    if (settings.backgroundColor) {
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundColor = settings.backgroundColor;
    } else {
      document.body.style.backgroundImage = `url(./data/${mapData.name}/background.png)`;
      document.body.style.backgroundColor = "";
    }
  }, [settings.backgroundColor, mapData]);

  // WebSocket
  useEffect(() => {
    let ws;
    let timeout;

    const start = async () => {
      try {
        const url = USE_LOCALHOST
          ? `ws://localhost:${PORT}/cs2_webradar`
          : `ws://${EFFECTIVE_IP}:${PORT}/cs2_webradar`;

        ws = new WebSocket(url);

        timeout = setTimeout(() => ws?.close(), CONNECTION_TIMEOUT);

        ws.onopen = () => {
          clearTimeout(timeout);
        };

        ws.onclose = () => {
          clearTimeout(timeout);
        };

        ws.onerror = (err) => {
          clearTimeout(timeout);
          console.error("WebSocket error:", err);
        };

        ws.onmessage = async (event) => {
          setAverageLatency(getLatency());
          const data = JSON.parse(await event.data.text());

          setPlayerArray(data.m_players || []);
          setLocalTeam(data.m_local_team);
          setBombData(data.m_bomb || null);

          const map = data.m_map;
          if (map && map !== "invalid") {
            try {
              const json = await (await fetch(`data/${map}/data.json`)).json();
              setMapData({ ...json, name: map });
            } catch (e) {
              console.error("Error loading map data", e);
            }
          }
        };
      } catch (e) {
        console.error("WebSocket start failed:", e);
      }
    };

    start();

    return () => {
      clearTimeout(timeout);
      if (ws && ws.readyState === WebSocket.OPEN) ws.close();
    };
  }, []);

  // Valores seguros para la bomba arriba
  const hasBombTimer =
    bombData && bombData.m_blow_time > 0 && !bombData.m_is_defused;

  let safeBlow = 0;
  let safeDefuse = null;

  if (hasBombTimer) {
    safeBlow = Number(bombData.m_blow_time ?? 0);
    if (
      bombData.m_is_defusing &&
      bombData.m_defuse_time !== undefined &&
      bombData.m_defuse_time !== null
    ) {
      safeDefuse = Number(bombData.m_defuse_time);
    }
  }

  return (
    <div
      className="w-screen h-screen flex flex-col"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(20,40,55,0.95), rgba(7,20,30,0.95))",
        backdropFilter: "blur(7.5px)",
      }}
    >
      {bannerOpened && (
        <section className="w-full flex items-center justify-between p-2 bg-radar-primary">
          <span className="w-full text-center text-[#1E3A54]">
            <span className="font-medium">𒉭 - MAAX𒉭 - Si no veo no vale</span>
          </span>

          <button
            onClick={() => setBannerOpened(false)}
            className="hover:bg-[#9BC5E4]"
          >
            <svg width="16" height="16" viewBox="0 0 32 32">
              <path
                fill="#4E799F"
                d="M 7.2 5.8 L 5.8 7.2 L 14.6 16 L 5.8 24.8 L 7.2 26.2 L 16 17.4 L 24.8 26.2 L 26.2 24.8 L 17.4 16 L 26.2 7.2 L 24.8 5.8 L 16 14.6 Z"
              />
            </svg>
          </button>
        </section>
      )}

      <div className="w-full h-full flex flex-col justify-center overflow-hidden relative">
        {/* MAAX label */}
        <div className="absolute top-3 left-3 z-40 text-radar-primary tracking-[0.25em] text-sm md:text-base">
          MAAX𒉭
        </div>

        {/* Bomb countdown HUD (seguro) */}
        {hasBombTimer && (
          <div className="absolute left-1/2 top-4 -translate-x-1/2 flex flex-col items-center z-50">
            <div className="flex items-center gap-1">
              <MaskedIcon
                path="./assets/icons/c4.svg"
                height={32}
                color={settings.bombColor || "#ff0000"}
              />
              <span>
                {safeBlow.toFixed(1)}s{" "}
                {bombData.m_is_defusing && safeDefuse !== null
                  ? `(${safeDefuse.toFixed(1)}s)`
                  : ""}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-evenly">
          <Latency
            value={averageLatency}
            settings={settings}
            setSettings={setSettings}
          />

          {/* Sidebar T */}
          <ul className="lg:flex hidden flex-col gap-7">
            {playerArray
              .filter((p) => p.m_team === 2 && settings.showTOnSidebar)
              .map((p) => (
                <PlayerCard
                  key={p.m_idx}
                  playerData={p}
                  isOnRightSide={false}
                  settings={settings}
                />
              ))}
          </ul>

          {/* Radar */}
          {playerArray.length > 0 && mapData ? (
            <Radar
              playerArray={playerArray}
              radarImage={`./data/${mapData.name}/radar.png`}
              mapData={mapData}
              localTeam={localTeam}
              averageLatency={averageLatency}
              bombData={bombData}
              settings={settings}
            />
          ) : (
            <div id="radar" className="relative overflow-hidden origin-center">
              <h1 className="radar_message">
                Connected! Waiting for data from usermode
              </h1>
            </div>
          )}

          {/* Sidebar CT */}
          <ul className="lg:flex hidden flex-col gap-7">
            {playerArray
              .filter((p) => p.m_team === 3 && settings.showCTOnSidebar)
              .map((p) => (
                <PlayerCard
                  key={p.m_idx}
                  playerData={p}
                  isOnRightSide={true}
                  settings={settings}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;

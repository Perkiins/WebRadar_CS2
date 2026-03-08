import { useRef } from "react";
import Player from "./player";
import Bomb from "./bomb";

const Radar = ({
  playerArray,
  radarImage,
  mapData,
  localTeam,
  averageLatency,
  bombData,
  settings,
}) => {
  const radarImageRef = useRef();

  return (
    <div id="radar" className="relative overflow-hidden origin-center">
      <img ref={radarImageRef} className="w-full h-auto" src={radarImage} />

      {playerArray
        .filter((player) => {
          // 2 = T, 3 = CT
          if (player.m_team === 2 && !settings.showTOnMap) return false;
          if (player.m_team === 3 && !settings.showCTOnMap) return false;
          return true;
        })
        .map((player) => (
          <Player
            key={player.m_idx}
            playerData={player}
            mapData={mapData}
            radarImage={radarImageRef.current}
            localTeam={localTeam}
            averageLatency={averageLatency}
            settings={settings}
          />
        ))}

      {bombData && (
        <Bomb
          bombData={bombData}
          mapData={mapData}
          radarImage={radarImageRef.current}
          localTeam={localTeam}
          averageLatency={averageLatency}
          settings={settings}
        />
      )}
    </div>
  );
};

export default Radar;
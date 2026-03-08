import { useRef, useState, useEffect } from "react";
import { getRadarPosition, playerColors } from "../utilities/utilities";

let playerRotations = [];
const calculatePlayerRotation = (playerData) => {
  const playerViewAngle = 270 - playerData.m_eye_angle;
  const idx = playerData.m_idx;

  playerRotations[idx] = (playerRotations[idx] || 0) % 360;
  playerRotations[idx] +=
    ((playerViewAngle - playerRotations[idx] + 540) % 360) - 180;

  return playerRotations[idx];
};

const Player = ({
  playerData,
  mapData,
  radarImage, // ya no se usa, pero lo dejamos por compatibilidad
  localTeam,
  averageLatency,
  settings,
}) => {
  const [lastKnownPosition, setLastKnownPosition] = useState(null);

  const radarPosition =
    getRadarPosition(mapData, playerData.m_position) || { x: 0, y: 0 };

  const invalidPosition = radarPosition.x <= 0 && radarPosition.y <= 0;
  const scaledSize = 0.7 * settings.dotSize;

  // Guardar última posición al morir
  useEffect(() => {
    if (playerData.m_is_dead) {
      if (!lastKnownPosition) setLastKnownPosition(radarPosition);
    } else {
      setLastKnownPosition(null);
    }
  }, [playerData.m_is_dead, radarPosition, lastKnownPosition]);

  const effectivePosition = playerData.m_is_dead
    ? lastKnownPosition || { x: 0, y: 0 }
    : radarPosition;

  const playerRotation = calculatePlayerRotation(playerData);

  return (
    <div
      className="absolute origin-center"
      style={{
        width: `${scaledSize}vw`,
        height: `${scaledSize}vw`,
        left: `${effectivePosition.x * 100}%`,
        top: `${effectivePosition.y * 100}%`,
        transform: "translate(-50%, -50%)",
        transition: `left ${averageLatency}ms linear, top ${averageLatency}ms linear`,
        zIndex: playerData.m_is_dead ? 0 : 1,
      }}
    >
      {/* Nombre – se corrige la rotación del mapa */}
      {(settings.showAllNames && playerData.m_team === localTeam) ||
      (settings.showEnemyNames && playerData.m_team !== localTeam) ? (
        <div
          className="absolute bottom-full text-center"
          style={{
            left: "50%",
            transform: `translate(-50%, -0.25rem) rotate(${-settings.mapRotation}deg)`,
            transformOrigin: "center bottom",
          }}
        >
          <span className="text-xs text-white whitespace-nowrap max-w-[80px] inline-block text-ellipsis overflow-hidden">
            {playerData.m_name}
          </span>
        </div>
      ) : null}

      {/* Cruceta de muerte – no rota con el mapa */}
      {playerData.m_is_dead && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            WebkitMask: `url('./assets/icons/icon-enemy-death_png.png') no-repeat center / contain`,
            mask: `url('./assets/icons/icon-enemy-death_png.png') no-repeat center / contain`,
            backgroundColor: "white",
            opacity: 0.8,
            transform: `rotate(${-settings.mapRotation}deg)`,
            transformOrigin: "center center",
          }}
        />
      )}

      {/* Contenedor rotatorio: flecha + viewcone */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `rotate(${playerData.m_is_dead ? 0 : playerRotation}deg)`,
          transition: `transform ${averageLatency}ms linear`,
          opacity: invalidPosition ? 0 : playerData.m_is_dead ? 0.8 : 1,
        }}
      >
        {/* DOT — solo si está vivo */}
        {!playerData.m_is_dead && (
          <div
            className="w-full h-full rounded-[50%_50%_50%_0%] rotate-[315deg]"
            style={{
              backgroundColor:
                playerData.m_team === localTeam
                  ? playerColors[playerData.m_color]
                  : settings.customEnemyColor || "red",
            }}
          />
        )}

        {/* View cone – igual que antes, dentro de la rotación del jugador */}
        {settings.showViewCones && !playerData.m_is_dead && (
          <div
            className="absolute left-1/2 top-1/2 w-[1.5vw] h-[3vw] bg-white opacity-30"
            style={{
              transform: `translate(-50%, 5%) rotate(0deg)`,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Player;

import { getRadarPosition } from "../utilities/utilities";

const Bomb = ({
  bombData,
  mapData,
  radarImage, // ya no se usa, pero lo dejamos por compatibilidad
  localTeam,
  averageLatency,
  settings,
}) => {
  const radarPosition = getRadarPosition(mapData, bombData) || { x: 0, y: 0 };

  // Tamaño bomba
  const baseSize = 1.5; // vw
  const scaledSize = baseSize * settings.bombSize;

  return (
    <div
      className="absolute origin-center"
      style={{
        width: `${scaledSize}vw`,
        height: `${scaledSize}vw`,
        left: `${radarPosition.x * 100}%`,
        top: `${radarPosition.y * 100}%`,
        transform: "translate(-50%, -50%)",
        transition: `left ${averageLatency}ms linear, top ${averageLatency}ms linear`,
        zIndex: 1,
      }}
    >
      {/* Icono bomba – no rota con el mapa */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: bombData.m_is_defused
            ? "#50904c"
            : settings.bombColor || "#c90b0b",
          WebkitMask: `url('./assets/icons/c4_sml.png') no-repeat center / contain`,
          mask: `url('./assets/icons/c4_sml.png') no-repeat center / contain`,
          transform: `rotate(${-settings.mapRotation}deg)`,
          transformOrigin: "center center",
          transition: `transform ${averageLatency}ms linear`,
        }}
      />
    </div>
  );
};

export default Bomb;

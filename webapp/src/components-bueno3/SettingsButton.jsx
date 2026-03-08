import { useState } from "react";

const SettingsButton = ({ settings, onSettingsChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 transition-all rounded-xl"
      >
        <img className="w-[1.3rem]" src="./assets/icons/cog.svg" />
        <span className="text-radar-primary">Settings</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-radar-panel/90 backdrop-blur-lg rounded-xl p-4 shadow-xl border border-radar-secondary/20">
          <h3 className="text-radar-primary text-lg font-semibold mb-4">
            Radar Settings
          </h3>

          <div className="space-y-3">
            {/* Dot Size */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-radar-secondary text-sm">Dot Size</span>
                <span className="text-radar-primary text-sm font-mono">
                  {settings.dotSize}x
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={settings.dotSize}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    dotSize: parseFloat(e.target.value),
                  })
                }
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-radar-primary"
                style={{
                  background: `linear-gradient(to right, #b1d0e7 ${
                    ((settings.dotSize - 0.5) / 1.5) * 100
                  }%, rgba(59, 130, 246, 0.2) ${
                    ((settings.dotSize - 0.5) / 1.5) * 100
                  }%)`,
                }}
              />
            </div>

            {/* Bomb Size */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-radar-secondary text-sm">Bomb Size</span>
                <span className="text-radar-primary text-sm font-mono">
                  {settings.bombSize}x
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={settings.bombSize}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    bombSize: parseFloat(e.target.value),
                  })
                }
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-radar-primary"
                style={{
                  background: `linear-gradient(to right, #b1d0e7 ${
                    ((settings.bombSize - 0.1) / 1.9) * 100
                  }%, rgba(59, 130, 246, 0.2) ${
                    ((settings.bombSize - 0.1) / 1.9) * 100
                  }%)`,
                }}
              />
            </div>

            {/* Colores */}
            <div className="pt-2 border-t border-radar-secondary/20 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-radar-secondary text-sm">
                  Color UI (armas/vida)
                </span>
                <input
                  type="color"
                  value={settings.uiAccentColor}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      uiAccentColor: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-radar-secondary text-sm">
                  Color de fondo
                </span>
                <input
                  type="color"
                  value={settings.backgroundColor || "#000000"}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      backgroundColor: e.target.value,
                    })
                  }
                  className="w-8 h-5 rounded-md border border-radar-secondary/40 bg-transparent p-0"
                />
              </div>

              <div className="flex justify-between items-center">
                  <span className="text-radar-secondary text-sm">Color enemigos</span>
                  <input
                    type="color"
                    value={settings.customEnemyColor}
                    onChange={(e) =>
                      onSettingsChange({
                        ...settings,
                        customEnemyColor: e.target.value,
                      })
                    }
                  />
               </div>
               <div className="flex justify-between items-center">
  <span className="text-radar-secondary text-sm">Color bomba</span>
  <input
    type="color"
    value={settings.bombColor}
    onChange={(e) =>
      onSettingsChange({
        ...settings,
        bombColor: e.target.value,
      })
    }
  />
</div>


            </div>

            {/* Toggles */}
            <div className="space-y-1">
              {/* Ally Names */}
              <label className="flex items-center justify-between p-3 rounded-lg hover:bg-radar-secondary/20 transition-colors cursor-pointer">
                <span className="text-radar-secondary text-sm">Ally Names</span>
                <input
                  type="checkbox"
                  checked={settings.showAllNames}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      showAllNames: e.target.checked,
                    })
                  }
                  className="relative h-5 w-9 rounded-full shadow-sm bg-radar-secondary/30 checked:bg-radar-secondary transition-colors duration-200 appearance-none before:absolute before:h-4 before:w-4 before:top-0.5 before:left-0.5 before:bg-white before:rounded-full before:transition-transform before:duration-200 checked:before:translate-x-4"
                />
              </label>

              {/* Enemy Names */}
              <label className="flex items-center justify-between p-3 rounded-lg hover:bg-radar-secondary/20 transition-colors cursor-pointer">
                <span className="text-radar-secondary text-sm">Enemy Names</span>
                <input
                  type="checkbox"
                  checked={settings.showEnemyNames}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      showEnemyNames: e.target.checked,
                    })
                  }
                  className="relative h-5 w-9 rounded-full shadow-sm bg-radar-secondary/30 checked:bg-radar-secondary transition-colors duration-200 appearance-none before:absolute before:h-4 before:w-4 before:top-0.5 before:left-0.5 before:bg-white before:rounded-full before:transition-transform before:duration-200 checked:before:translate-x-4"
                />
              </label>

              {/* View Cones */}
              <label className="flex items-center justify-between p-3 rounded-lg hover:bg-radar-secondary/20 transition-colors cursor-pointer">
                <span className="text-radar-secondary text-sm">View Cones</span>
                <input
                  type="checkbox"
                  checked={settings.showViewCones}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      showViewCones: e.target.checked,
                    })
                  }
                  className="relative h-5 w-9 rounded-full shadow-sm bg-radar-secondary/30 checked:bg-radar-secondary transition-colors duration-200 appearance-none before:absolute before:h-4 before:w-4 before:top-0.5 before:left-0.5 before:bg-white before:rounded-full before:transition-transform before:duration-200 checked:before:translate-x-4"
                />
              </label>

              {/* Equipos visibles en el MAPA */}
              <div className="pt-2 border-t border-radar-secondary/20 space-y-1">
                <span className="text-[11px] uppercase tracking-wide text-radar-secondary">
                  Equipos en MAPA
                </span>

                <label className="flex items-center justify-between p-3 rounded-lg hover:bg-radar-secondary/20 transition-colors cursor-pointer">
                  <span className="text-radar-secondary text-sm">
                    Mostrar Terroristas
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.showTOnMap}
                    onChange={(e) =>
                      onSettingsChange({
                        ...settings,
                        showTOnMap: e.target.checked,
                      })
                    }
                    className="relative h-5 w-9 rounded-full shadow-sm bg-radar-secondary/30 checked:bg-radar-secondary transition-colors duration-200 appearance-none before:absolute before:h-4 before:w-4 before:top-0.5 before:left-0.5 before:bg-white before:rounded-full before:transition-transform before:duration-200 checked:before:translate-x-4"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg hover:bg-radar-secondary/20 transition-colors cursor-pointer">
                  <span className="text-radar-secondary text-sm">
                    Mostrar CTs
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.showCTOnMap}
                    onChange={(e) =>
                      onSettingsChange({
                        ...settings,
                        showCTOnMap: e.target.checked,
                      })
                    }
                    className="relative h-5 w-9 rounded-full shadow-sm bg-radar-secondary/30 checked:bg-radar-secondary transition-colors duration-200 appearance-none before:absolute before:h-4 before:w-4 before:top-0.5 before:left-0.5 before:bg-white before:rounded-full before:transition-transform before:duration-200 checked:before:translate-x-4"
                  />
                </label>
              </div>

              {/* Equipos visibles en el LATERAL */}
              <div className="pt-2 border-t border-radar-secondary/20 space-y-1">
                <span className="text-[11px] uppercase tracking-wide text-radar-secondary">
                  Equipos en LATERAL
                </span>

                <label className="flex items-center justify-between p-3 rounded-lg hover:bg-radar-secondary/20 transition-colors cursor-pointer">
                  <span className="text-radar-secondary text-sm">
                    Mostrar Terroristas
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.showTOnSidebar}
                    onChange={(e) =>
                      onSettingsChange({
                        ...settings,
                        showTOnSidebar: e.target.checked,
                      })
                    }
                    className="relative h-5 w-9 rounded-full shadow-sm bg-radar-secondary/30 checked:bg-radar-secondary transition-colors duration-200 appearance-none before:absolute before:h-4 before:w-4 before:top-0.5 before:left-0.5 before:bg-white before:rounded-full before:transition-transform before:duration-200 checked:before:translate-x-4"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg hover:bg-radar-secondary/20 transition-colors cursor-pointer">
                  <span className="text-radar-secondary text-sm">
                    Mostrar CTs
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.showCTOnSidebar}
                    onChange={(e) =>
                      onSettingsChange({
                        ...settings,
                        showCTOnSidebar: e.target.checked,
                      })
                    }
                    className="relative h-5 w-9 rounded-full shadow-sm bg-radar-secondary/30 checked:bg-radar-secondary transition-colors duration-200 appearance-none before:absolute before:h-4 before:w-4 before:top-0.5 before:left-0.5 before:bg-white before:rounded-full before:transition-transform before:duration-200 checked:before:translate-x-4"
                  />
                </label>
              </div>
              {/* Zoom del mapa */}
<div>
  <div className="flex justify-between items-center mb-2">
    <span className="text-radar-secondary text-sm">Map Zoom</span>
    <span className="text-radar-primary text-sm font-mono">
      {settings.mapZoom.toFixed(1)}x
    </span>
  </div>
  <input
    type="range"
    min="0.5"
    max="2.5"
    step="0.1"
    value={settings.mapZoom}
    onChange={(e) =>
      onSettingsChange({
        ...settings,
        mapZoom: parseFloat(e.target.value),
      })
    }
    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-radar-primary"
    style={{
      background: `linear-gradient(to right, #b1d0e7 ${
        ((settings.mapZoom - 0.5) / 2) * 100
      }%, rgba(59, 130, 246, 0.2) ${
        ((settings.mapZoom - 0.5) / 2) * 100
      }%)`,
    }}
  />
</div>

                          {/* Rotación del mapa */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-radar-secondary text-sm">Rotación mapa</span>
                <span className="text-radar-primary text-sm font-mono">
                  {settings.mapRotation}°
                </span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                step="5"
                value={settings.mapRotation}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    mapRotation: parseInt(e.target.value, 10),
                  })
                }
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-radar-primary"
                style={{
                  background: `linear-gradient(to right, #b1d0e7 ${
                    ((settings.mapRotation + 180) / 360) * 100
                  }%, rgba(59, 130, 246, 0.2) ${
                    ((settings.mapRotation + 180) / 360) * 100
                  }%)`,
                }}
              />
            </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsButton;
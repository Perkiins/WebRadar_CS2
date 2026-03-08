import { useState, useEffect } from "react";
import MaskedIcon from "./maskedicon";
import { playerColors, teamEnum } from "../utilities/utilities";

const PlayerCard = ({ playerData, isOnRightSide, settings }) => {
  const [modelName, setModelName] = useState(playerData.m_model_name);

  // Solo actualizamos el modelo mientras el jugador está vivo
  useEffect(() => {
    if (!playerData.m_is_dead && playerData.m_model_name) {
      setModelName(playerData.m_model_name);
    }
  }, [playerData.m_model_name, playerData.m_is_dead]);

  const isDead = !!playerData.m_is_dead;

  return (
    <li
      style={{ opacity: isDead ? "0.5" : "1" }}
      className={`flex ${isOnRightSide ? "flex-row-reverse" : ""}`}
    >
      {/* Columna izquierda: nombre + color + personaje */}
      <div className="flex flex-col gap-[0.375rem] justify-center items-center">
        <div
          className="hover:cursor-pointer"
          onClick={() =>
            window.open(
              `https://steamcommunity.com/profiles/${playerData.m_steam_id}`,
              "_blank",
              "noopener,noreferrer"
            )
          }
        >
          {playerData.m_name}
        </div>

        <div
          className="w-0 h-0 border-solid border-t-[12px] border-r-[8px] border-b-[12px] border-l-[8px]"
          style={{
            borderColor: `${
              playerColors[playerData.m_color]
            } transparent transparent transparent`,
          }}
        ></div>

        <img
          className={`h-[8rem] ${
            isOnRightSide ? "scale-x-[-1]" : ""
          } ${isDead ? "grayscale opacity-70" : ""}`}
          src={`./assets/characters/${modelName}.png`}
          onError={(e) => {
            // Si el modelo no existe, usamos un fallback según el equipo
            const fallbackPath =
              playerData.m_team === teamEnum.counterTerrorist
                ? "./assets/characters/ctm_sas.png"
                : "./assets/characters/tm_phoenix.png";

            if (e.currentTarget.dataset.fallback !== "1") {
              e.currentTarget.dataset.fallback = "1";
              e.currentTarget.src = fallbackPath;
            }
          }}
        />
      </div>

      {/* Columna derecha: info, vida/armadura, armas y utilidades */}
      <div
        className={`flex flex-col ${
          isOnRightSide ? "flex-row-reverse" : ""
        } justify-center gap-2`}
      >
        <span
          className={`${
            isOnRightSide ? "flex justify-end" : ""
          } text-radar-green`}
        >
          ${playerData.m_money}
        </span>

        {/* Vida + armadura */}
        <div
          className={`flex ${
            isOnRightSide ? "flex-row-reverse" : ""
          } gap-2`}
        >
          <div className="flex gap-[4px] items-center">
            <MaskedIcon
              path={`./assets/icons/health.svg`}
              height={16}
              color={settings.uiAccentColor}
            />
            <span className="text-radar-primary">
              {playerData.m_health}
            </span>
          </div>

          <div className="flex gap-[4px] items-center">
            <MaskedIcon
              path={`./assets/icons/${
                (playerData.m_has_helmet && `kevlar_helmet`) || `kevlar`
              }.svg`}
              height={16}
              color={settings.uiAccentColor}
            />
            <span className="text-radar-primary">
              {playerData.m_armor}
            </span>
          </div>
        </div>

        {/* Armas: primaria / secundaria / melee */}
        <div
          className={`flex ${
            isOnRightSide ? "flex-row-reverse" : ""
          } gap-3`}
        >
          {playerData.m_weapons && playerData.m_weapons.m_primary && (
            <MaskedIcon
              path={`./assets/icons/${playerData.m_weapons.m_primary}.svg`}
              height={28}
              color={
                (playerData.m_weapons &&
                  playerData.m_weapons.m_active === "c4" &&
                  "bg-radar-primary") || settings.uiAccentColor
              }
            />
          )}

          {playerData.m_weapons && playerData.m_weapons.m_secondary && (
            <MaskedIcon
              path={`./assets/icons/${playerData.m_weapons.m_secondary}.svg`}
              height={28}
              color={
                (playerData.m_weapons &&
                  playerData.m_weapons.m_active === "c4" &&
                  "bg-radar-primary") || settings.uiAccentColor
              }
            />
          )}

          {playerData.m_weapons &&
            playerData.m_weapons.m_melee &&
            playerData.m_weapons.m_melee.map((melee) => (
              <MaskedIcon
                key={melee}
                path={`./assets/icons/${melee}.svg`}
                height={28}
                color={
                  (playerData.m_weapons &&
                    playerData.m_weapons.m_active === "c4" &&
                    "bg-radar-primary") || settings.uiAccentColor
                }
              />
            ))}
        </div>

        {/* Utilidades + slots + defuser/bomba */}
        <div className="flex flex-col relative">
          <div
            className={`flex ${
              isOnRightSide ? "flex-row-reverse" : ""
            } gap-9 mt-3 items-center`}
          >
            {playerData.m_weapons &&
              playerData.m_weapons.m_utilities &&
              playerData.m_weapons.m_utilities.map((utility) => (
                <MaskedIcon
                  key={utility}
                  path={`./assets/icons/${utility}.svg`}
                  height={28}
                  color={
                    (playerData.m_weapons &&
                      playerData.m_weapons.m_active === "c4" &&
                      "bg-radar-primary") || settings.uiAccentColor
                  }
                />
              ))}

            {[
              ...Array(
                Math.max(
                  4 -
                    ((playerData.m_weapons &&
                      playerData.m_weapons.m_utilities &&
                      playerData.m_weapons.m_utilities.length) ||
                      0),
                  0
                )
              ),
            ].map((_, i) => (
              <div
                key={i}
                className="rounded-full w-[6px] h-[6px] bg-radar-primary"
              ></div>
            ))}

            {(playerData.m_team == teamEnum.counterTerrorist &&
              playerData.m_has_defuser && (
                <MaskedIcon
                  path={`./assets/icons/defuser.svg`}
                  height={28}
                  color={settings.uiAccentColor}
                />
              )) ||
              (playerData.m_team == teamEnum.terrorist &&
                playerData.m_has_bomb && (
                  <MaskedIcon
                    path={`./assets/icons/c4.svg`}
                    height={28}
                    color={
                      (playerData.m_weapons &&
                        playerData.m_weapons.m_active === "c4" &&
                        "bg-radar-primary") || settings.uiAccentColor
                    }
                  />
                ))}
          </div>
        </div>
      </div>
    </li>
  );
};

export default PlayerCard;
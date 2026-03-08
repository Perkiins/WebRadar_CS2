const MaskedIcon = ({ path, height, color }) => {
  return (
    <div
      style={{
        WebkitMask: `url(${path}) no-repeat center / contain`,
        mask: `url(${path}) no-repeat center / contain`,
        width: "auto",
        height: height,
        backgroundColor: color || "#ffffff", // color de relleno
      }}
    >
      {/* Imagen fantasma solo para mantener proporciones */}
      <img className="w-full h-full opacity-0" src={path} alt="" />
    </div>
  );
};

export default MaskedIcon;

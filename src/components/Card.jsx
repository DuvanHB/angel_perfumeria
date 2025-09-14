export default function Card({ item }) {
  const handleClick = () => {
    const message = `Buen día, estoy interesado en obtener más información del perfume ${item.Nombre}`;
    const url = `https://wa.me/573132755194?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        textAlign: "center",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        background: "#fff",
        minWidth: "200px",
        maxWidth: "100%",
        maxHeight: "200px",
        cursor: "pointer"
      }}
      onClick={handleClick}
      title={`Solicitar información de ${item.Nombre}`}
    >
      {item.Imagen && (
        <img
          src={item.Imagen}
          alt={item.Nombre}
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
        />
      )}
      <h4
        style={{
          fontSize: "1.1rem",
          fontWeight: "bold",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          margin: "0.5em 0"
        }}
        title={item.Nombre}
      >
        {item.Nombre}
      </h4>
      <p>
        {item.Marca} | {item.Genero} | {item.Cantidad}ml
      </p>
    </div>
  );
}

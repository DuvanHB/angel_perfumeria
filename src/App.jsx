import { useEffect, useState } from "react";
import Papa from "papaparse";

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState(""); // 👈 new state

  useEffect(() => {
    const fetchSheet = async () => {
      const url =
        "https://docs.google.com/spreadsheets/d/1eUiLXYR69TgmIr9TYs0CPvVcsyukjtp3tVTVTrFdMKQ/export?format=csv&gid=0";

      const response = await fetch(url);
      const text = await response.text();

      const result = Papa.parse(text, { header: true });
      setData(result.data);
    };

    fetchSheet();
  }, []);

  // Filtered data by genero + search
  const filteredData = data.filter((item) => {
    const matchesGenero =
      filter === "all" || item.Genero?.toLowerCase() === filter;
    const matchesSearch = item.Nombre?.toLowerCase().includes(search.toLowerCase());
    return matchesGenero && matchesSearch;
  });

  // Function for WhatsApp link
  const getWhatsappLink = (nombre) => {
    const phone = "573001112233"; // replace with your WhatsApp number
    const message = encodeURIComponent(`Hola, estoy interesado en el perfume ${nombre}`);
    return `https://wa.me/${phone}?text=${message}`;
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "30% 70%",
        gap: "20px",
        flexGrow: 1,
        padding: "20px",
      }}
    >
      {/* Sidebar Filters */}
      <div>
        <h3>Filtrar por género</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><button onClick={() => setFilter("all")}>Todos</button></li>
          <li><button onClick={() => setFilter("masculino")}>Hombre</button></li>
          <li><button onClick={() => setFilter("femenino")}>Mujer</button></li>
          <li><button onClick={() => setFilter("unisex")}>Unisex</button></li>
        </ul>

        <h3>Buscar por nombre</h3>
        <input
          type="text"
          placeholder="Escribe un nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          flexGrow: 1,
        }}
      >
        {filteredData.map((item, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            {item.Imagen && (
              <img
                src={item.Imagen}
                alt={item.Nombre}
                style={{ width: "100px", height: "100px", objectFit: "contain" }}
              />
            )}
            <h4>{item.Nombre}</h4>
            <p>
              {item.Marca} | {item.Genero}
            </p>
            <a
              href={getWhatsappLink(item.Nombre)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "8px 12px",
                backgroundColor: "#25D366",
                color: "white",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              WhatsApp
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

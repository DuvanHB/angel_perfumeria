import { useEffect, useState } from "react";
import Papa from "papaparse";
import hombreIcon from "./assets/img/male.png";
import mujerIcon from "./assets/img/female.png";
import unisexIcon from "./assets/img/unisex.png";
import whatsappIcon from "./assets/img/whatsapp.png";

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

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

  const filteredData = data.filter((item) => {
    const matchesGenero =
      filter === "all" || item.Genero?.toLowerCase() === filter;
    const matchesSearch = item.Nombre?.toLowerCase().includes(search.toLowerCase());
    return matchesGenero && matchesSearch;
  });

  const getWhatsappLink = (nombre) => {
    const phone = "573195769790";
    const message = encodeURIComponent(`Hola, estoy interesado en el perfume ${nombre}`);
    return `https://wa.me/${phone}?text=${message}`;
  };

  return (
    <>
      {/* Responsive styles */}
      <style>
        {`
          body, #root {
            width: 100vw;
            min-height: 100vh;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          .main-grid {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 20px;
            width: 100vw;
            max-width: 100vw;
            min-height: 100vh;
            padding: 20px;
            box-sizing: border-box;
          }
          .sidebar {
            min-width: 0;
          }
          .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            width: 95%;
            margin: 0 auto;
            padding-top: 1rem;
          }
          @media (max-width: 900px) {
            .main-grid {
              grid-template-columns: 1fr;
              grid-template-rows: auto 1fr;
              padding: 10px;
            }
            .sidebar {
              margin-bottom: 20px;
            }
          }
          @media (max-width: 600px) {
            .cards-grid {
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 10px;
            }
            .main-grid {
              padding: 5px;
            }
          }
        `}
      </style>
      <div className="main-grid">
        {/* Sidebar Filters */}
        <div className="sidebar">
          <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Filtros</div>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "20px",
            }}
          >
            <button
              onClick={() => setFilter("hombre")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <img src={hombreIcon} alt="Hombre" style={{ width: "40px", height: "40px" }} />
              <div>Hombre</div>
            </button>
            <button
              onClick={() => setFilter("mujer")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <img src={mujerIcon} alt="Mujer" style={{ width: "40px", height: "40px" }} />
              <div>Mujer</div>
            </button>
            <button
              onClick={() => setFilter("unisex")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <img src={unisexIcon} alt="Unisex" style={{ width: "40px", height: "40px" }} />
              <div>Unisex</div>
            </button>
          </div>
        </div>
        {/* Cards */}
        <div className="cards-grid">
          {filteredData.map((item, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                background: "#fff",
                maxWidth: "100%",
                minWidth: "300px",
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
                {item.Marca} | {item.Genero} |{" "}
                <a
                  href={getWhatsappLink(item.Nombre)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={whatsappIcon}
                    alt="WhatsApp"
                    style={{ width: "24px", height: "24px", verticalAlign: "middle" }}
                  />
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
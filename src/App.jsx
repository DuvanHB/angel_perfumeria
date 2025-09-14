import { useEffect, useState } from "react";
import { useRef } from "react";

import Papa from "papaparse";
import hombreIcon from "./assets/img/male.png";
import mujerIcon from "./assets/img/female.png";
import unisexIcon from "./assets/img/unisex.png";
import whatsappIcon from "./assets/img/whatsapp.png";
import callIcon from "./assets/img/phone2.png";
import instagramIcon from "./assets/img/instagram.png";
import resetIcon from "./assets/img/reset24.png";

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showSidebar, setShowSidebar] = useState(false); // For mobile burger
  const [selectedMarca, setSelectedMarca] = useState("all");
  const [selectedCantidad, setSelectedCantidad] = useState("all");
  const sidebarRef = useRef(null);

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

  // Get distinct marcas
  const marcas = Array.from(new Set(data.map(item => item.Marca).filter(Boolean)));
  // Get distinct cantidades
  const cantidades = Array.from(new Set(data.map(item => item.Cantidad).filter(Boolean)));
  // Filter data
  const filteredData = data.filter((item) => {
    const matchesGenero =
      filter === "all" || item.Genero?.toLowerCase() === filter;
    const matchesSearch = item.Nombre?.toLowerCase().includes(search.toLowerCase());
    const matchesMarca =
      selectedMarca === "all" || item.Marca === selectedMarca;
    const matchesCantidad =
      selectedCantidad === "all" || String(item.Cantidad) === String(selectedCantidad);
    return matchesGenero && matchesSearch && matchesMarca && matchesCantidad;
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
          header {
            position: sticky;
            top: 0;
            z-index: 100;
            background: linear-gradient(180deg, #0D0D0D, #1C1C1C, #000000);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 60px;
            width: 100vw;
          }
          .header-title {
            font-size: 4.5rem;
            font-family: 'Palace Script MT', 'Brush Script MT', cursive, sans-serif;
            background: linear-gradient(45deg, #FFD700, #FFA500, #DAA520, #FFD700);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: 1px;
            text-align: center;
            flex: 1;
          }
          .header-icons {
            display: flex;
            gap: 16px;
            position: absolute;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
          }
          .header-icons img {
            width: 40px;
            height: 40px;
            cursor: pointer;
          }
          @media (max-width: 600px) {
            .header-icons {
              display: none !important;
            }
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
            position: sticky;
            top: 120px;
            align-self: start;
            z-index: 10;
            background: #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
            border-radius: 10px;
            padding-bottom: 20px;
            height: calc(100vh - 155px);
            margin-bottom: 2rem;
            box-sizing: border-box;
            overflow-y: auto;
          }
          .burger {
            display: none;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            margin-right: 10px;
          }
          .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
            gap: 20px;
            width: 96%;
            margin: 0 auto;
          }
          @media (max-width: 900px) {
            .main-grid {
              grid-template-columns: 1fr;
              grid-template-rows: auto 1fr;
              padding: 10px;
            }
            .sidebar {
              position: static;
              margin-bottom: 20px;
              box-shadow: none;
            }
          }
          @media (max-width: 600px) {
            .main-grid {
              padding: 5px;
            }
            .cards-grid {
              grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
              gap: 10px;
            }
            .burger {
              display: block;
            }
            .sidebar {
              display: ${showSidebar ? "block" : "none"};
              position: fixed;
              top: 60px;
              left: 0;
              width: 80vw;
              max-width: 350px;
              height: 100vh;
              overflow-y: auto;
              background: #fff;
              box-shadow: 2px 0 8px rgba(0,0,0,0.08);
              z-index: 200;
              margin-bottom: 0;
            }
            .sidebar-close {
              display: block;
              text-align: right;
              padding: 10px;
              font-size: 1.5rem;
              cursor: pointer;
            }
          }
        `}
      </style>
      {/* Sticky Header */}
      <header className="header" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <button className="burger" style={{ position: 'absolute', left: 30, top: '50%', transform: 'translateY(-50%)' }} onClick={() => setShowSidebar(true)}>
          &#9776;
        </button>
        <span className="header-title">Ángel<span style={{paddingLeft: "1.5rem"}}>perfumería</span></span>
        <div className="header-icons">
          <a href="https://wa.me/573195769790" target="_blank" rel="noopener noreferrer">
            <img src={whatsappIcon} alt="WhatsApp" />
          </a>
          <a href="https://www.instagram.com/fragancias_de_angel?igsh=MWt3ZXN1dXNnbDI5bQ==" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" />
          </a>
        </div>
      </header>
      <div className="main-grid">
        {/* Sidebar Filters */}
  <div className="sidebar" ref={sidebarRef} style={{ position: 'sticky', top: 120 }}>
          {/* Mobile close button */}
          <span className="sidebar-close" style={{ display: window.innerWidth <= 600 ? "block" : "none" }} onClick={() => setShowSidebar(false)}>&times;</span>
          <div  style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            fontSize: "1.5rem", 
            fontWeight: "bold", 
            padding: "1rem",
            borderBottom: "1px solid rgb(221, 221, 221)"
          }}>
            <span> Filtros</span>
            <img
              src={resetIcon}
              alt="Reset Filters"
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
              onClick={() => {
                setFilter("all");
                setSelectedMarca("all");
                setSelectedCantidad("all");
                setSearch("");
              }}
            />
          </div>
          <div style={{fontSize: "1.2rem", fontWeight: "bold", padding: "1rem"}}>Género</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "5px",
            }}
          >
            <button
              onClick={() => setFilter("hombre")}
              style={{
                background: filter === "hombre" ? "#e0f7fa" : "none",
                border: filter === "hombre" ? "2px solid #0097a7" : "none",
                cursor: "pointer",
                textAlign: "center",
                borderRadius: "8px",
                boxShadow: filter === "hombre" ? "0 0 8px #0097a733" : "none",
                fontWeight: filter === "hombre" ? "bold" : "normal"
              }}
            >
              <img src={hombreIcon} alt="Hombre" style={{ width: "40px", height: "40px" }} />
              <div>Hombre</div>
            </button>
            <button
              onClick={() => setFilter("mujer")}
              style={{
                background: filter === "mujer" ? "#fce4ec" : "none",
                border: filter === "mujer" ? "2px solid #d81b60" : "none",
                cursor: "pointer",
                textAlign: "center",
                borderRadius: "8px",
                boxShadow: filter === "mujer" ? "0 0 8px #d81b6033" : "none",
                fontWeight: filter === "mujer" ? "bold" : "normal"
              }}
            >
              <img src={mujerIcon} alt="Mujer" style={{ width: "40px", height: "40px" }} />
              <div>Mujer</div>
            </button>
            <button
              onClick={() => setFilter("unisex")}
              style={{
                background: filter === "unisex" ? "#f3e5f5" : "none",
                border: filter === "unisex" ? "2px solid #7c4dff" : "none",
                cursor: "pointer",
                textAlign: "center",
                borderRadius: "8px",
                boxShadow: filter === "unisex" ? "0 0 8px #7c4dff33" : "none",
                fontWeight: filter === "unisex" ? "bold" : "normal"
              }}
            >
              <img src={unisexIcon} alt="Unisex" style={{ width: "40px", height: "40px" }} />
              <div>Unisex</div>
            </button>
            
          </div>

          <div style={{fontSize: "1.2rem", fontWeight: "bold", padding: "0 1rem 0.5rem"}}>Marca</div>
          <select
            value={selectedMarca}
            onChange={e => setSelectedMarca(e.target.value)}
            style={{
              width: "calc(100% - 2rem)",
              padding: "10px",
              margin: "0 1rem 10px 1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              height: "40px",
              boxSizing: "border-box"
            }}
          >
            <option value="all">Todas las marcas</option>
            {marcas.map((marca, idx) => (
              <option key={idx} value={marca}>{marca}</option>
            ))}
          </select>

          <div style={{fontSize: "1.2rem", fontWeight: "bold", padding: "0 1rem 0.5rem"}}>Cantidad</div>
          <select
            value={selectedCantidad}
            onChange={e => setSelectedCantidad(e.target.value)}
            style={{
              width: "calc(100% - 2rem)",
              padding: "10px",
              margin: "0 1rem 10px 1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              height: "40px",
              boxSizing: "border-box"
            }}
          >
            <option value="all">Todas las cantidades</option>
            {cantidades.map((cantidad, idx) => (
              <option key={idx} value={cantidad}>{cantidad}ml</option>
            ))}
          </select>

          <div style={{fontSize: "1.2rem", fontWeight: "bold", padding: "0 1rem 0.5rem"}}>Nombre</div>
          <div style={{ width: '100%', boxSizing: 'border-box', padding: 0, margin: 0 }}>
            <input
              type="text"
              placeholder="Nombre"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: 'calc(100% - 2rem)',
                boxSizing: 'border-box',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                margin: '0 1rem 10px 1rem',
                height: '40px'
              }}
            />
          </div>
          {/* Social icons at bottom for mobile */}
          <div className="sidebar-social" style={{ display: 'none', marginTop: '2rem', textAlign: 'center' }}>
            <a href="https://wa.me/573195769790" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
              <img src={whatsappIcon} alt="WhatsApp" style={{ width: '40px', height: '40px' }} />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
              <img src={instagramIcon} alt="Instagram" style={{ width: '40px', height: '40px' }} />
            </a>
          </div>
        </div>
        <style>{`
          @media (max-width: 600px) {
            .sidebar-social {
              display: block !important;
            }
          }
        `}</style>
        {/* Cards */}
        <div className="cards-grid">
          {filteredData.length === 0 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%", // or 100% if parent has height
                gridColumn: "1/-1",
                color: "#888",
                fontSize: "1.2rem",
                textAlign: "center",
              }}
            >
              No encontramos perfumes que coincidan con tu selección.
            </div>
          ) : (
            filteredData.map((item, i) => (
              <div
                key={i}
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
                }}
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
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
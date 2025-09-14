import { useEffect, useState } from "react";

import Papa from "papaparse";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CardsGrid from "./components/CardsGrid";

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showSidebar, setShowSidebar] = useState(false); // For mobile burger
  const [selectedMarca, setSelectedMarca] = useState("all");
  const [selectedCantidad, setSelectedCantidad] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

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
  // Filter and sort data
  let filteredData = data.filter((item) => {
    const matchesGenero =
      filter === "all" || item.Genero?.toLowerCase() === filter;
    const matchesSearch = item.Nombre?.toLowerCase().includes(search.toLowerCase());
    const matchesMarca =
      selectedMarca === "all" || item.Marca === selectedMarca;
    const matchesCantidad =
      selectedCantidad === "all" || String(item.Cantidad) === String(selectedCantidad);
    return matchesGenero && matchesSearch && matchesMarca && matchesCantidad;
  });
  if (sortOrder === "asc") {
    filteredData = [...filteredData].sort((a, b) => a.Nombre.localeCompare(b.Nombre));
  } else if (sortOrder === "desc") {
    filteredData = [...filteredData].sort((a, b) => b.Nombre.localeCompare(a.Nombre));
  }

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

            background: linear-gradient(45deg, #FFD700, #FFA500, #DAA520, #FFD700);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;

            padding: 0;
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
              justify-content: center;
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
              padding: 0 10px;
              font-size: 2rem;
              cursor: pointer;
            }
          }
        `}
      </style>
      <Header onBurgerClick={() => setShowSidebar(true)} />
      <div className="main-grid">
        <Sidebar
          filter={filter}
          setFilter={setFilter}
          selectedMarca={selectedMarca}
          setSelectedMarca={setSelectedMarca}
          marcas={marcas}
          selectedCantidad={selectedCantidad}
          setSelectedCantidad={setSelectedCantidad}
          cantidades={cantidades}
          search={search}
          setSearch={setSearch}
          onReset={() => {
            setFilter("all");
            setSelectedMarca("all");
            setSelectedCantidad("all");
            setSearch("");
            setSortOrder("asc");
          }}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        <style>{`
          @media (max-width: 600px) {
            .sidebar-social {
              display: block !important;
            }
          }
        `}</style>
        <CardsGrid filteredData={filteredData} />
      </div>
    </>
  );
}

export default App;
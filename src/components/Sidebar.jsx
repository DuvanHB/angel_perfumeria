import resetIcon from "../assets/img/reset24.png";
import hombreIcon from "../assets/img/male.png";
import mujerIcon from "../assets/img/female.png";
import unisexIcon from "../assets/img/unisex.png";
import whatsappIcon from "../assets/img/whatsapp.png";
import instagramIcon from "../assets/img/instagram.png";

export default function Sidebar({
  filter,
  setFilter,
  selectedMarca,
  setSelectedMarca,
  marcas,
  selectedCantidad,
  setSelectedCantidad,
  cantidades,
  search,
  setSearch,
  onReset,
  setShowSidebar,
  sortOrder,
  setSortOrder
}) {
  return (
  <div className="sidebar" style={{ position: 'sticky', top: 120 }}>
      <span className="sidebar-close" style={{ display: window.innerWidth <= 600 ? "block" : "none" }} onClick={() => setShowSidebar(false)}>&times;</span>
  <div className="sidebar-filter-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "1.5rem", fontWeight: "bold", padding: "1rem", borderBottom: "1px solid rgb(221, 221, 221)" }}>
        <span> Filtros</span>
        <img src={resetIcon} alt="Reset Filters" style={{ width: "20px", height: "20px", cursor: "pointer" }} onClick={onReset} />
      </div>
      <style>{`
        @media (max-width: 600px) {
          .sidebar {
            top: 110px !important;
          }
          .sidebar-filter-header {
            padding: 0rem 1rem 1rem !important;
          }
        }
      `}</style>
      <div style={{fontSize: "1.2rem", fontWeight: "bold", padding: "1rem"}}>Ordenar por nombre</div>
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "10px" }}>
        <button
          onClick={() => setSortOrder && setSortOrder("asc")}
          style={{
            background: typeof sortOrder !== 'undefined' && sortOrder === "asc" ? "#e3f2fd" : "none",
            border: typeof sortOrder !== 'undefined' && sortOrder === "asc" ? "2px solid #1976d2" : "1px solid black",
            cursor: "pointer",
            textAlign: "center",
            borderRadius: "8px",
            boxShadow: typeof sortOrder !== 'undefined' && sortOrder === "asc" ? "0 0 8px #1976d233" : "none",
            fontWeight: typeof sortOrder !== 'undefined' && sortOrder === "asc" ? "bold" : "normal",
            padding: "8px 16px"
          }}
        >A-Z</button>
        <button
          onClick={() => setSortOrder && setSortOrder("desc")}
          style={{
            background: typeof sortOrder !== 'undefined' && sortOrder === "desc" ? "#fbe9e7" : "none",
            border: typeof sortOrder !== 'undefined' && sortOrder === "desc" ? "2px solid #d84315" : "1px solid black",
            cursor: "pointer",
            textAlign: "center",
            borderRadius: "8px",
            boxShadow: typeof sortOrder !== 'undefined' && sortOrder === "desc" ? "0 0 8px #d8431533" : "none",
            fontWeight: typeof sortOrder !== 'undefined' && sortOrder === "desc" ? "bold" : "normal",
            padding: "8px 16px"
          }}
        >Z-A</button>
      </div>
      <div style={{fontSize: "1.2rem", fontWeight: "bold", padding: "0 1rem 0.5rem"}}>Género</div>
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "5px" }}>
        <button onClick={() => setFilter("hombre")} style={{ background: filter === "hombre" ? "#e0f7fa" : "none", border: filter === "hombre" ? "2px solid #0097a7" : "none", cursor: "pointer", textAlign: "center", borderRadius: "8px", boxShadow: filter === "hombre" ? "0 0 8px #0097a733" : "none", fontWeight: filter === "hombre" ? "bold" : "normal" }}>
          <img src={hombreIcon} alt="Hombre" style={{ width: "40px", height: "40px" }} />
          <div>Hombre</div>
        </button>
        <button onClick={() => setFilter("mujer")} style={{ background: filter === "mujer" ? "#fce4ec" : "none", border: filter === "mujer" ? "2px solid #d81b60" : "none", cursor: "pointer", textAlign: "center", borderRadius: "8px", boxShadow: filter === "mujer" ? "0 0 8px #d81b6033" : "none", fontWeight: filter === "mujer" ? "bold" : "normal" }}>
          <img src={mujerIcon} alt="Mujer" style={{ width: "40px", height: "40px" }} />
          <div>Mujer</div>
        </button>
        <button onClick={() => setFilter("unisex")} style={{ background: filter === "unisex" ? "#f3e5f5" : "none", border: filter === "unisex" ? "2px solid #7c4dff" : "none", cursor: "pointer", textAlign: "center", borderRadius: "8px", boxShadow: filter === "unisex" ? "0 0 8px #7c4dff33" : "none", fontWeight: filter === "unisex" ? "bold" : "normal" }}>
          <img src={unisexIcon} alt="Unisex" style={{ width: "40px", height: "40px" }} />
          <div>Unisex</div>
        </button>
      </div>
      
      <div style={{fontSize: "1.2rem", fontWeight: "bold", padding: "0 1rem 0.5rem"}}>Marca</div>
      <select value={selectedMarca} onChange={e => setSelectedMarca(e.target.value)} style={{ width: "calc(100% - 2rem)", padding: "10px", margin: "0 1rem 10px 1rem", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1rem", height: "40px", boxSizing: "border-box" }}>
        <option value="all">Todas las marcas</option>
        {[...marcas].sort((a, b) => a.localeCompare(b)).map((marca, idx) => (
          <option key={idx} value={marca}>{marca}</option>
        ))}
      </select>
      <div style={{fontSize: "1.2rem", fontWeight: "bold", padding: "0 1rem 0.5rem"}}>Cantidad</div>
      <select value={selectedCantidad} onChange={e => setSelectedCantidad(e.target.value)} style={{ width: "calc(100% - 2rem)", padding: "10px", margin: "0 1rem 10px 1rem", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1rem", height: "40px", boxSizing: "border-box" }}>
        <option value="all">Todas las cantidades</option>
        {[...cantidades].sort((a, b) => Number(a) - Number(b)).map((cantidad, idx) => (
          <option key={idx} value={cantidad}>{cantidad}ml</option>
        ))}
      </select>
      <div style={{fontSize: "1.2rem", fontWeight: "bold", padding: "0 1rem 0.5rem"}}>Nombre</div>
      <div style={{ width: '100%', boxSizing: 'border-box', padding: 0, margin: 0 }}>
        <input type="text" placeholder="Nombre" value={search} onChange={e => setSearch(e.target.value)} style={{ width: 'calc(100% - 2rem)', boxSizing: 'border-box', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', margin: '0 1rem 10px 1rem', height: '40px' }} />
      </div>
      <div className="sidebar-social" style={{ display: 'none', marginTop: '0', textAlign: 'center' }}>
        <a href="https://wa.me/573132755194" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
          <img src={whatsappIcon} alt="WhatsApp" style={{ width: '50px', height: '50px' }} />
        </a>
        <a href="https://www.instagram.com/fragancias_de_angel?igsh=MWt3ZXN1dXNnbDI5bQ==" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
          <img src={instagramIcon} alt="Instagram" style={{ width: '50px', height: '50px' }} />
        </a>
      </div>
    </div>
  );
}

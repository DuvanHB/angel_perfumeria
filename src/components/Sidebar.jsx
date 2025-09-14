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
  setShowSidebar
}) {
  return (
    <div className="sidebar" style={{ position: 'sticky', top: 120 }}>
      <span className="sidebar-close" style={{ display: window.innerWidth <= 600 ? "block" : "none" }} onClick={() => setShowSidebar(false)}>&times;</span>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "1.5rem", fontWeight: "bold", padding: "1rem", borderBottom: "1px solid rgb(221, 221, 221)" }}>
        <span> Filtros</span>
        <img src={resetIcon} alt="Reset Filters" style={{ width: "20px", height: "20px", cursor: "pointer" }} onClick={onReset} />
      </div>
      <div style={{fontSize: "1.2rem", fontWeight: "bold", padding: "1rem"}}>Género</div>
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
        {marcas.map((marca, idx) => (
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
      <div className="sidebar-social" style={{ display: 'none', marginTop: '2rem', textAlign: 'center' }}>
        <a href="https://wa.me/573195769790" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
          <img src={whatsappIcon} alt="WhatsApp" style={{ width: '50px', height: '50px' }} />
        </a>
        <a href="https://www.instagram.com/fragancias_de_angel?igsh=MWt3ZXN1dXNnbDI5bQ==" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
          <img src={instagramIcon} alt="Instagram" style={{ width: '50px', height: '50px' }} />
        </a>
      </div>
    </div>
  );
}

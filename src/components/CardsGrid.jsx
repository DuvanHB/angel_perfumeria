import Card from "./Card";

export default function CardsGrid({ filteredData }) {
  return (
    <div className="cards-grid">
      {filteredData.length === 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gridColumn: "1/-1",
            color: "#888",
            fontSize: "1.2rem",
            textAlign: "center",
            minHeight: "300px"
          }}
          className="no-items-message"
        >
          No encontramos perfumes que coincidan con tu selección.
        </div>
      ) : (
        filteredData.map((item, i) => <Card key={i} item={item} />)
      )}
    </div>
  );
}

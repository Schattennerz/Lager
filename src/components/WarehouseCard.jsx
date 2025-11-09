function WarehouseCard({ title, items, capacity }) {
  return (
    <div className="warehouse-card">
      <h3>{title}</h3>
      <p>📦 Artikel: {items}</p>
      <p>🏗️ Kapazität: {capacity}</p>
    </div>
  );
}

export default WarehouseCard;

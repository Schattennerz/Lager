import { useState } from "react";
import { useInventory } from "../context/InventoryContext";

function Inventory() {
  const { artikel, addArtikel } = useInventory();
  const [form, setForm] = useState({
    artikelNr: "",
    lagerNr: "",
    bestand: "",
    lagerorte: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLagerortChange = (index, value) => {
    const neueOrte = [...form.lagerorte];
    neueOrte[index] = value;
    setForm({ ...form, lagerorte: neueOrte });
  };

  const addLagerort = () => {
    setForm({ ...form, lagerorte: [...form.lagerorte, ""] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.artikelNr || !form.lagerNr || !form.bestand) {
      alert("Bitte alle Pflichtfelder ausfüllen!");
      return;
    }

    addArtikel(form);
    setForm({
      artikelNr: "",
      lagerNr: "",
      bestand: "",
      lagerorte: [""],
    });
  };

  return (
    <div className="inventory">
      <h2>📦 Inventarverwaltung</h2>

      <form className="inventory-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Artikelnummer:</label>
          <input
            type="text"
            name="artikelNr"
            value={form.artikelNr}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Strichcode:</label>
          <input
            type="text"
            name="lagerNr"
            value={form.lagerNr}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Bestand:</label>
          <input
            type="number"
            name="bestand"
            value={form.bestand}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Lagerorte:</label>
          {form.lagerorte.map((ort, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Ort ${index + 1} (z. B. 01.01.01.01)`}
              value={ort}
              onChange={(e) => handleLagerortChange(index, e.target.value)}
            />
          ))}
          <button type="button" onClick={addLagerort} className="add-ort-btn">
            ➕ Lagerort hinzufügen
          </button>
        </div>

        <button type="submit" className="save-btn">
          ✅ Artikel speichern
        </button>
      </form>

      <div className="inventory-table">
        <h3>📋 Aktuelle Artikel</h3>
        {artikel.length === 0 ? (
          <p>Keine Artikel vorhanden.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Artikelnummer</th>
                <th>Strichcode</th>
                <th>Bestand</th>
                <th>Lagerorte</th>
              </tr>
            </thead>
            <tbody>
              {artikel.map((a, i) => (
                <tr key={i}>
                  <td>{a.artikelNr}</td>
                  <td>{a.lagerNr}</td>
                  <td>{a.bestand}</td>
                  <td>{a.lagerorte.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Inventory;

import { useMemo, useState } from "react";
import { useInventory } from "../context/InventoryContext";

function Dashboard() {
  const { artikel } = useInventory();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("ort");
  const [sortDir, setSortDir] = useState("asc"); // 'asc' | 'desc'
  const [showFree, setShowFree] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 25;

  // Lagerstruktur (nur Info-Anzeige)
  const reihen = 5;
  const regale = 10;
  const hoehen = 10;
  const spalten = 10;

  // Belegte Plätze als flache Liste für die Tabelle aufbereiten
  const belegtePlaetze = useMemo(() => {
    const rows = [];
    for (const a of artikel) {
      if (Array.isArray(a.lagerorte)) {
        for (const ort of a.lagerorte) {
          rows.push({
            ort,
            artikelNr: a.artikelNr ?? "",
            lagerNr: a.lagerNr ?? "",
            bestand: a.bestand ?? "",
          });
        }
      }
    }
    return rows;
  }, [artikel]);

  // Filter anwenden
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return belegtePlaetze;
    return belegtePlaetze.filter((r) =>
      (r.ort || "").toLowerCase().includes(q) ||
      (r.artikelNr || "").toLowerCase().includes(q) ||
      (r.lagerNr || "").toLowerCase().includes(q)
    );
  }, [belegtePlaetze, query]);

  // Sortierung anwenden
  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      const va = (a[sortBy] ?? "").toString();
      const vb = (b[sortBy] ?? "").toString();
      if (va < vb) return -1 * dir;
      if (va > vb) return 1 * dir;
      return 0;
    });
    return copy;
  }, [filtered, sortBy, sortDir]);

  // Pagination
  const total = sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage]);

  const toggleSort = (key) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  // Freie Lagerorte berechnen (optional sichtbar)
  const freeSlots = useMemo(() => {
    if (!showFree) return [];
    const belegtSet = new Set(belegtePlaetze.map((r) => r.ort));
    const freie = [];
    for (let r = 1; r <= reihen; r++) {
      for (let g = 1; g <= regale; g++) {
        for (let h = 1; h <= hoehen; h++) {
          for (let s = 1; s <= spalten; s++) {
            const code = `${String(r).padStart(2, "0")}.${String(g).padStart(2, "0")}.${String(h).padStart(2, "0")}.${String(s).padStart(2, "0")}`;
            if (!belegtSet.has(code)) freie.push(code);
          }
        }
      }
    }
    return freie;
  }, [showFree, belegtePlaetze, reihen, regale, hoehen, spalten]);

  return (
    <div className="dashboard">
      <h2>🏗️ Lagerübersicht</h2>
      <p>
        Reihen: {reihen} · Regale: {regale} · Höhe: {hoehen} · Spalten: {spalten}
      </p>

      <div className="dashboard-table">
        <h3>📋 Belegte Lagerorte</h3>
        <div className="table-toolbar">
          <input
            type="text"
            placeholder="Suche (Lagerort, Artikel, Strichcode)"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          />
        </div>
        {sorted.length === 0 ? (
          <p>Keine belegten Lagerorte vorhanden.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th role="button" onClick={() => toggleSort("ort")}>
                  Lagerort {sortBy === "ort" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th role="button" onClick={() => toggleSort("artikelNr")}>
                  Artikelnummer {sortBy === "artikelNr" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th role="button" onClick={() => toggleSort("lagerNr")}>
                  Strichcode {sortBy === "lagerNr" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th role="button" onClick={() => toggleSort("bestand")}>
                  Bestand {sortBy === "bestand" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row, idx) => (
                <tr key={`${row.ort}-${row.artikelNr}-${idx}`}>
                  <td>{row.ort}</td>
                  <td>{row.artikelNr}</td>
                  <td>{row.lagerNr}</td>
                  <td>{row.bestand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="table-footer">
          <span>
            Gesamt: {total} · Seite {currentPage} / {pageCount}
          </span>
          <div className="pager">
            <button disabled={currentPage <= 1} onClick={() => setPage(1)}>{"<<"}</button>
            <button disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)}>{"<"}</button>
            <button disabled={currentPage >= pageCount} onClick={() => setPage(currentPage + 1)}>{">"}</button>
            <button disabled={currentPage >= pageCount} onClick={() => setPage(pageCount)}>{">>"}</button>
          </div>
        </div>
      </div>

      <div className="free-slots">
        <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" checked={showFree} onChange={(e) => setShowFree(e.target.checked)} />
          Freie Lagerplätze anzeigen
        </label>
        {showFree && (
          <div className="free-slots-table">
            <h3>🟩 Freie Lagerorte</h3>
            <p>Insgesamt frei: {freeSlots.length}</p>
            <div className="scroll">
              <table>
                <thead>
                  <tr>
                    <th>Lagerort</th>
                  </tr>
                </thead>
                <tbody>
                  {freeSlots.slice(0, 200).map((code) => (
                    <tr key={code}><td>{code}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            {freeSlots.length > 200 && (
              <p style={{ color: "#666" }}>Anzeige begrenzt auf 200 Einträge – bitte Suche/Filter nutzen, wenn nötig.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

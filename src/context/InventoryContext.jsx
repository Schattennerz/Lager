import { createContext, useContext, useEffect, useState } from "react";
import demoData from "../data/demoData.json";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [artikel, setArtikel] = useState([]);

  // 🧩 Beim Laden des Projekts: aus localStorage oder JSON laden
  useEffect(() => {
    const saved = localStorage.getItem("lagerDaten");
    if (saved) {
      setArtikel(JSON.parse(saved));
    } else {
      setArtikel(demoData);
      localStorage.setItem("lagerDaten", JSON.stringify(demoData));
    }
  }, []);

  // 🧩 Änderungen immer in localStorage speichern
  useEffect(() => {
    localStorage.setItem("lagerDaten", JSON.stringify(artikel));
  }, [artikel]);

  const addArtikel = (neu) => {
    setArtikel((prev) => [...prev, neu]);
  };

  return (
    <InventoryContext.Provider value={{ artikel, addArtikel }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);

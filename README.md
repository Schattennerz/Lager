# Lager — kleines Inventar-/Lagerverwaltungs-Frontend

Dieses Repository enthält eine kleine React-Anwendung (Vite) zur Darstellung und Verwaltung von Lager- bzw. Inventar-Daten.

Kurz: Eine übersichtliche Single-Page-App mit React, Vite und Context-API für lokale Demo-Daten.

## Was ist enthalten

- React + Vite (schnelles Dev-Setup mit HMR)
- Context-basiertes State-Management (`src/context/InventoryContext.jsx`)
- Beispiel-Daten unter `src/data/demoData.json`
- Seiten: `Dashboard`, `Inventory`, `Settings` (`src/pages/`)
- Wiederverwendbare Komponenten in `src/components/` (z. B. `WarehouseCard`, `Navbar`)

## Features

- Übersichtliches Dashboard mit Lagerbeständen
- Anzeige und Verwaltung (lesen/anpassen) von Demo-Daten
- Kleine, gut strukturierte Codebasis — ideal zum Erweitern

## Voraussetzungen

- Node.js (empfohlen Version 16 oder neuer)
- npm (oder yarn / pnpm)

Hinweis: Dieses Projekt nutzt die üblichen Vite-Scripts (`dev`, `build`, `preview`).

## Lokal starten

1. Abhängigkeiten installieren

```powershell
npm install
```

2. Dev-Server starten

```powershell
npm run dev
```

Der Dev-Server läuft standardmäßig auf http://localhost:5173 — Vite zeigt die genaue URL nach dem Start an.

3. Produktions-Build

```powershell
npm run build
npm run preview
```

## Wichtige Dateien / Ordner

- `index.html` — App-Entry
- `src/main.jsx` — React-Einstiegspunkt
- `src/App.jsx` — App-Komponente / Router
- `src/pages/` — Seiten (`Dashboard.jsx`, `Inventory.jsx`, `settings.jsx`)
- `src/components/` — UI-Komponenten (`navbar.jsx`, `WarehouseCard.jsx`, ...)
- `src/context/InventoryContext.jsx` — zentraler Context für Inventar-Daten
- `src/context/server.js` — (kleine Hilfsfunktionen / Mock-Server-Logik)
- `src/data/demoData.json` — Beispiel-Daten zum schnellen Testen

Wenn du die Daten anpassen willst, bearbeite `src/data/demoData.json` oder erweitere den Context in `src/context/InventoryContext.jsx`.

## Entwicklung & Erweiterung

- Neue Seiten in `src/pages/` anlegen und im Router in `src/App.jsx` registrieren.
- Komponenten in `src/components/` ablegen und wiederverwenden.
- Für persistenten Zustand oder externen API-Zugriff kann `src/context/InventoryContext.jsx` erweitert werden.

## Hinweise / Annahmen

- Dieses README wurde auf Basis der Projektstruktur im Repo erstellt. Falls ihr Backend-APIs oder Auth benötigt, muss der Context angepasst werden.
- Lizenz: Keine Lizenz-Datei im Repo erkannt. Falls benötigt, legt eine `LICENSE`-Datei an (z. B. MIT).

## Unterstützung / Kontakt

Wenn du Fragen hast oder Hilfe beim Erweitern brauchst, öffne ein Issue oder kontaktiere den Projektverantwortlichen.

Viel Erfolg beim Weiterentwickeln des Lager-Projekts!

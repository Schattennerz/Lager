function Navbar({ setPage }) {
  return (
    <nav className="navbar">
      <h1 className="logo">📦 Lagersystem</h1>
      <div className="nav-links">
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("inventory")}>Inventar</button>
        <button onClick={() => setPage("settings")}>Einstellungen</button>
      </div>
    </nav>
  );
}

export default Navbar;

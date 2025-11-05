import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import DetailView from "./components/DetailView";

/**
 * App.jsx
 * Main entry for Project 6 (Data Dashboard Part 2)
 * Handles navigation between Dashboard and DetailView pages.
 * 
 * 🏠 "/"  → Dashboard (main recipe list, favorites, charts)
 * 📄 "/recipe/:id" → DetailView (individual recipe details)
 */

function App() {
  return (
    <Routes>
      {/* 🏠 Dashboard Page */}
      <Route path="/" element={<Dashboard />} />

      {/* 📄 Individual Recipe Page */}
      <Route path="/recipe/:id" element={<DetailView />} />
    </Routes>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Fabricantes } from "./components/fabricantes/Fabricantes";
import Productos from './components/productos/Productos';
import { Menu } from "./components/Menu";

function App() {
  return (
    <>
      <Menu />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/fabricantes" element={<Fabricantes />} />
          <Route path="/productos" element={<Productos />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  { Dashboard }  from "./components/Dashboard";
import  { Fabricantes } from "./components/fabricantes/Fabricantes";
import { Productos } from './components/productos/Productos';
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
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

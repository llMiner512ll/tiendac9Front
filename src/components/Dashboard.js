import React, { useEffect, useState } from 'react';

function HomePage() {
  const [numProductos, setNumProductos] = useState(0);
  const [numFabricantes, setNumFabricantes] = useState(0);

  useEffect(() => {
    // Obtener el número de productos mediante Fetch
    fetch('https://localhost:7299/api/Producto')
        .then(response => response.json())
        .then(data => {
          setNumProductos(data.length);
        })
        .catch(error => {
          console.error('Error al obtener los productos:', error);
        });

    // Obtener el número de fabricantes mediante Fetch
    fetch('https://localhost:7299/api/Fabricante')
        .then(response => response.json())
        .then(data => {
          setNumFabricantes(data.length);
        })
        .catch(error => {
          console.error('Error al obtener los fabricantes:', error);
        });
  }, []);

  return (
      <div className="container">
        <div className="square red" id="productos">
          <h2>Productos</h2>
          <svg className="icon" viewBox="0 0 24 24">
            {/* Aquí iría el código SVG del icono */}
          </svg>
          <p>{numProductos} productos</p>
        </div>
        <div className="square green"></div>
        <div className="square yellow" id="fabricantes">
          <h2>Fabricantes</h2>
          <svg className="icon" viewBox="0 0 24 24">
            {/* Aquí iría el código SVG del icono */}
          </svg>
          <p>{numFabricantes} fabricantes</p>
        </div>
        <div className="square blue"></div>
      </div>
  );
}

export default HomePage;

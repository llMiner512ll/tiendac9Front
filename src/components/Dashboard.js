import React, { useEffect, useState } from 'react';

export function Dashboard() {
    const [numProductos, setNumProductos] = useState(0);
    const [numFabricantes, setNumFabricantes] = useState(0);
    const endPoint = 'https://localhost:7299/api';

    useEffect(() => {
        // Obtener el número de productos mediante Fetch
        fetch(endPoint+'/Producto')
            .then(response => response.json())
            .then(data => {
                setNumProductos(data.length);
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });

        // Obtener el número de fabricantes mediante Fetch
        fetch(endPoint+'/Fabricante')
            .then(response => response.json())
            .then(data => {
                setNumFabricantes(data.length);
            })
            .catch(error => {
                console.error('Error al obtener los fabricantes:', error);
            });
    }, []);

    return (
        <>
            <div className="container p-5 col-md-6" style={{ display: 'flex', height: '90vh', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="row">
                <div className="col-md-6">
                    <div className="card bg-danger text-white">
                        <div className="card-body">
                            <h5 className="card-title">Productos</h5>
                            <p className="card-text">{numProductos} productos</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card bg-success text-white  ">
                        <div className="card-body">
                            {/* Contenido del segundo cuadrado */}
                            <h5 className="card-title">&nbsp;</h5>
                            <p className="card-text">&nbsp;</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card bg-warning text-white">
                        <div className="card-body">
                            {/* Contenido del tercer cuadrado */}
                                <h5 className="card-title">&nbsp;</h5>
                                <p className="card-text">&nbsp;</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card bg-primary text-white">
                        <div className="card-body">
                            {/* Contenido del cuarto cuadrado */}
                            <h5 className="card-title">Fabricantes</h5>
                            <p className="card-text">{numFabricantes} fabricantes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

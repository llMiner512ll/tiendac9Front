import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [fabricantes, setFabricantes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    codigo: 0,
    nombre: '',
    precio: 0,
    codigoFabricante: 0
  });

  useEffect(() => {
    fetchFabricantes();
    fetchProductos();
  }, []);

  const fetchFabricantes = async () => {
    try {
      const response = await fetch('https://localhost:7299/api/Fabricante');
      const data = await response.json();
      setFabricantes(data);
    } catch (error) {
      console.error('Error fetching fabricantes:', error);
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await fetch('https://localhost:7299/api/Producto');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching productos:', error);
    }
  };

  const handleAddProduct = () => {
    setModalOpen(true);
    setSelectedProduct({
      codigo: 0,
      nombre: '',
      precio: 0,
      codigoFabricante: 0
    });
  };

  const handleEditProduct = (product) => {
    setModalOpen(true);
    setSelectedProduct(product);
  };

  const handleDeleteProduct = (codigo) => {
    // Open confirmation modal and handle delete if confirmed
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este producto?');
    if (confirmDelete) {
      deleteProduct(codigo);
    }
  };

  const deleteProduct = async (codigo) => {
    try {
      await fetch(`https://localhost:7299/api/Producto/${codigo}`, {
        method: 'DELETE'
      });
      fetchProductos(); // Refetch the updated list of products
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (selectedProduct.codigo === 0) {
      addProduct(selectedProduct);
    } else {
      updateProduct(selectedProduct);
    }
  };

  const addProduct = async (product) => {
    try {
      await fetch('https://localhost:7299/api/Producto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      fetchProductos(); // Refetch the updated list of products
      setModalOpen(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = async (product) => {
    try {
      await fetch(`https://localhost:7299/api/Producto`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      fetchProductos(); // Refetch the updated list of products
      setModalOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const columns = [
    {
      name: '#',
      selector: (_, index) => index + 1,
      sortable: false,
    },
    {
      name: 'Nombre',
      selector: 'nombre',
      sortable: true,
    },
    {
      name: 'Precio',
      selector: 'precio',
      sortable: true,
    },
    {
      name: 'Fabricante',
      selector: 'codigoFabricanteNavigation.nombre',
      sortable: true,
    },
    {
      name: 'Actualizar',
      cell: (row) => (
          <Button variant="outline-warning" onClick={() => handleEditProduct(row)}>
            Actualizar
          </Button>
      ),
    },
    {
      name: 'Eliminar',
      cell: (row) => (
          <Button variant="outline-danger" onClick={() => handleDeleteProduct(row.codigo)}>
            Eliminar
          </Button>
      ),
    },
  ];

  return (
      <Container>
        <Row>
          <Col xs={12} className="mt-2">
            <Button variant="primary" onClick={handleAddProduct} className="mb-2">
              Agregar Producto
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mt-2">
            <DataTable
                columns={columns}
                data={products}
                pagination
                paginationPerPage={10}
            />
          </Col>
          <Col className="mt-2">
            <Modal show={modalOpen} onHide={handleModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>{selectedProduct.codigo === 0 ? 'Agregar Producto' : 'Editar Producto'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleModalSubmit}>
                  <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        value={selectedProduct.nombre}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, nombre: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        type="number"
                        value={selectedProduct.precio}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, precio: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Fabricante</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedProduct.codigoFabricante}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, codigoFabricante: e.target.value })}
                    >
                      {fabricantes.map((fabricante) => (
                          <option key={fabricante.codigo} value={fabricante.codigo}>
                            {fabricante.nombre}
                          </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Guardar
                  </Button>
                  <Button variant="secondary" onClick={handleModalClose}>
                    Cancelar
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </Container>
  );
};

export default Productos;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";

const Fabricantes = () => {
  const [fabricantes, setFabricantes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFabricante, setSelectedFabricante] = useState({
    codigo: 0,
    nombre: '',
    productos: []
  });

  useEffect(() => {
    fetchFabricantes();
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

  const handleAddFabricante = () => {
    setModalOpen(true);
    setSelectedFabricante({
      codigo: 0,
      nombre: '',
      productos: []
    });
  };

  const handleEditFabricante = (fabricante) => {
    setModalOpen(true);
    setSelectedFabricante(fabricante);
  };

  const handleDeleteFabricante = (codigo) => {
    // Open confirmation modal and handle delete if confirmed
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este fabricante?');
    if (confirmDelete) {
      deleteFabricante(codigo);
    }
  };

  const deleteFabricante = async (codigo) => {
    try {
      await fetch(`https://localhost:7299/api/Fabricante/${codigo}`, {
        method: 'DELETE'
      });
      fetchFabricantes(); // Refetch the updated list of fabricantes
    } catch (error) {
      console.error('Error deleting fabricante:', error);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (selectedFabricante.codigo === 0) {
      addFabricante(selectedFabricante);
    } else {
      updateFabricante(selectedFabricante);
    }
  };

  const addFabricante = async (fabricante) => {
    try {
      await fetch('https://localhost:7299/api/Fabricante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fabricante)
      });
      fetchFabricantes(); // Refetch the updated list of fabricantes
      setModalOpen(false);
    } catch (error) {
      console.error('Error adding fabricante:', error);
    }
  };

  const updateFabricante = async (fabricante) => {
    try {
      await fetch(`https://localhost:7299/api/Fabricante`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fabricante)
      });
      fetchFabricantes(); // Refetch the updated list of fabricantes
      setModalOpen(false);
    } catch (error) {
      console.error('Error updating fabricante:', error);
    }
  };

  const columns = [
    {
      name: '#',
      selector: (_, index) => index + 1,
      sortable: false
    },
    {
      name: 'Nombre',
      selector: 'nombre',
      sortable: true
    },
    {
      name: 'Productos',
      selector: (row) => row.productos.length,
      sortable: false
    },
    {
      name: 'Actualizar',
      cell: (row) => (
          <Button variant="outline-warning" onClick={() => handleEditFabricante(row)}>
            Actualizar
          </Button>
      ),
      sortable: false
    },
    {
      name: 'Eliminar',
      cell: (row) => (
          <Button variant="outline-danger" onClick={() => handleDeleteFabricante(row.codigo)}>
            Eliminar
          </Button>
      ),
      sortable: false
    }
  ];

  return (
      <Container>
        <Row>
          <Col xs={12} className="mt-2">
            <Button variant="primary" onClick={handleAddFabricante} className="mb-2">
              Agregar Fabricante
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mt-2">
            <DataTableExtensions
                columns={columns}
                data={fabricantes}
                print={false}
                export={false}
            >
            <DataTable
                columns={columns}
                data={fabricantes}
                pagination
                paginationPerPage={10}
                noHeader
                striped
                dense
            />
            </DataTableExtensions>
          </Col>
          <Col className="mt-2">
            <Modal show={modalOpen} onHide={handleModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {selectedFabricante.codigo === 0 ? 'Agregar Fabricante' : 'Editar Fabricante'}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleModalSubmit}>
                  <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        value={selectedFabricante.nombre}
                        onChange={(e) => setSelectedFabricante({ ...selectedFabricante, nombre: e.target.value })}
                    />
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

export default Fabricantes;

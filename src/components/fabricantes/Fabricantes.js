import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

export const Fabricantes = () => {
  const [fabricantes, setFabricantes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [fabricanteSeleccionado, setFabricanteSeleccionado] = useState({});
  const url = "https://localhost:7299/api/Fabricante/";

  // Función para obtener los fabricantes desde la API
  const obtenerFabricantes = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setFabricantes(data);
      } else {
        console.error("Error al obtener los fabricantes");
      }
    } catch (error) {
      console.error("Error al comunicarse con la API", error);
    }
  };

  // Llamada a obtenerFabricantes cuando el componente se monta
  useEffect(() => {
    obtenerFabricantes();
  }, []);

  const handleAgregarFabricante = async () => {
    try {
      // Envía una solicitud POST a la API para agregar un nuevo fabricante
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fabricanteSeleccionado),
      });
      if (response.ok) {
        // Si la solicitud fue exitosa, actualiza el estado de los fabricantes
        setFabricantes([...fabricantes, fabricanteSeleccionado]);
        setFabricanteSeleccionado({});
        await obtenerFabricantes();
      } else {
        // Maneja el caso en que la solicitud no sea exitosa
        console.error("Error al agregar el fabricante");
      }
    } catch (error) {
      console.error("Error al comunicarse con la API", error);
    }
  };

  const handleEliminarFabricante = async (fabricante) => {
    try {
      // Envía una solicitud DELETE a la API para eliminar el fabricante
      const response = await fetch(
        `${url}${fabricante.codigo}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Si la solicitud fue exitosa, actualiza el estado de los fabricantes sin el fabricante eliminado
        const fabricantesActualizados = fabricantes.filter(
          (f) => f.codigo !== fabricante.codigo
        );
        setFabricantes(fabricantesActualizados);
      } else {
        // Maneja el caso en que la solicitud no sea exitosa
        console.error("Error al eliminar el fabricante");
      }
    } catch (error) {
      console.error("Error al comunicarse con la API", error);
    }
  };

  const handleAbrirModalEditar = (fabricante) => {
    setFabricanteSeleccionado(fabricante);
    setShowModal(true);
  };

  const handleGuardarCambios = async () => {
    try {
      // Envía una solicitud PUT a la API para actualizar el fabricante
      const response = await fetch(
        `${url}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fabricanteSeleccionado),
        }
      );

      if (response.ok) {
        // Si la solicitud fue exitosa, actualiza el estado de los fabricantes con los cambios guardados
        const fabricantesActualizados = fabricantes.map((f) =>
          f.codigo === fabricanteSeleccionado.codigo
            ? fabricanteSeleccionado
            : f
        );
        setFabricantes(fabricantesActualizados);
        setShowModal(false);
        setFabricanteSeleccionado({});
      } else {
        // Maneja el caso en que la solicitud no sea exitosa
        console.error("Error al guardar los cambios del fabricante");
      }
    } catch (error) {
      console.error("Error al comunicarse con la API", error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs lg="4" className="mt-2">
            <Form>
              <Form.Group className="mb-3" controlId="formFabricante">
                <Form.Label>Fabricante</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre fabricante"
                  value={fabricanteSeleccionado.nombre || ""}
                  onChange={(e) =>
                    setFabricanteSeleccionado({
                      ...fabricanteSeleccionado,
                      nombre: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Button
                variant="outline-primary"
                type="button"
                onClick={handleAgregarFabricante}
              >
                Registrar
              </Button>
            </Form>
          </Col>
          <Col xs lg="8" className="mt-2">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Actualizar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {fabricantes.map((fabricante, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{fabricante.nombre}</td>
                    <td>
                      <Button
                        variant="outline-warning"
                        onClick={() => handleAbrirModalEditar(fabricante)}
                      >
                        Actualizar
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleEliminarFabricante(fabricante)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      {/* Modal de edición */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Fabricante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formFabricanteModal">
              <Form.Label>Fabricante</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre fabricante"
                value={fabricanteSeleccionado.nombre || ""}
                onChange={(e) =>
                  setFabricanteSeleccionado({
                    ...fabricanteSeleccionado,
                    nombre: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarCambios}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

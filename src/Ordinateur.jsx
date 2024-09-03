import React, { useState } from 'react';
import { Container, Card, Button, Row, Col, Form, Table, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Ordinateur = () => {
  const [computers, setComputers] = useState([
    { id: 1, marque: 'Dell', type: 'Laptop', processeur: 'Intel i7', disqueDur: '1TB SSD', memoire: '16GB', dateAchat: '2023-01-15', numSerie: 'ABC123' },
    { id: 2, marque: 'HP', type: 'Desktop', processeur: 'AMD Ryzen 5', disqueDur: '2TB HDD', memoire: '32GB', dateAchat: '2022-11-30', numSerie: 'DEF456' },
    { id: 3, marque: 'Lenovo', type: 'Laptop', processeur: 'Intel i5', disqueDur: '512GB SSD', memoire: '8GB', dateAchat: '2023-03-22', numSerie: 'GHI789' },
  ]);
  
  const [newComputer, setNewComputer] = useState({
    marque: '',
    type: '',
    processeur: '',
    disqueDur: '',
    memoire: '',
    dateAchat: '',
    numSerie: ''
  });

  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComputer({ ...newComputer, [name]: value });
  };

  const addComputer = () => {
    if (newComputer.marque && newComputer.type && newComputer.processeur && newComputer.disqueDur && newComputer.memoire && newComputer.dateAchat && newComputer.numSerie) {
      const newId = computers.length ? computers[computers.length - 1].id + 1 : 1;
      setComputers([...computers, { id: newId, ...newComputer }]);
      setNewComputer({ marque: '', type: '', processeur: '', disqueDur: '', memoire: '', dateAchat: '', numSerie: '' });
      setShowModal(false);
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const exportToExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(computers);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, 'ordinateurs' + fileExtension);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">IDENTIFICATION DES ORDINATEURS</h1>
      <Row>
        <Col>
          <h2>Liste des ordinateurs</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Marque</th>
                <th>Type</th>
                <th>Processeur</th>
                <th>Disque Dur</th>
                <th>Mémoire</th>
                <th>Date d'achat</th>
                <th>N° Série</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {computers.map((computer) => (
                <tr key={computer.id}>
                  <td>{computer.id}</td>
                  <td>{computer.marque}</td>
                  <td>{computer.type}</td>
                  <td>{computer.processeur}</td>
                  <td>{computer.disqueDur}</td>
                  <td>{computer.memoire}</td>
                  <td>{computer.dateAchat}</td>
                  <td>{computer.numSerie}</td>
                  <td>
                    <Button variant="info" size="sm" className="me-2">Modifier</Button>
                    <Button variant="danger" size="sm">Supprimer</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="success" onClick={handleShowModal} className="me-2">Ajouter un ordinateur</Button>
          <Button variant="primary" onClick={exportToExcel}>Exporter vers Excel</Button>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un ordinateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Marque</Form.Label>
                  <Form.Control type="text" name="marque" value={newComputer.marque} onChange={handleInputChange} placeholder="Entrez la marque" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Control type="text" name="type" value={newComputer.type} onChange={handleInputChange} placeholder="Entrez le type" />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Processeur</Form.Label>
                  <Form.Control type="text" name="processeur" value={newComputer.processeur} onChange={handleInputChange} placeholder="Entrez le processeur" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Disque Dur</Form.Label>
                  <Form.Control type="text" name="disqueDur" value={newComputer.disqueDur} onChange={handleInputChange} placeholder="Entrez le disque dur" />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Mémoire</Form.Label>
                  <Form.Control type="text" name="memoire" value={newComputer.memoire} onChange={handleInputChange} placeholder="Entrez la mémoire" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Date d'achat</Form.Label>
                  <Form.Control type="date" name="dateAchat" value={newComputer.dateAchat} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>N° Série</Form.Label>
                  <Form.Control type="text" name="numSerie" value={newComputer.numSerie} onChange={handleInputChange} placeholder="Entrez le numéro de série" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="success" onClick={addComputer}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Ordinateur;
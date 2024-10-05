import React, { useState, useEffect } from 'react';
import { Container, Button, Table, Modal, Form, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';  

const Mouvement = () => {
  const [movements, setMovements] = useState([]);
  const [newMovement, setNewMovement] = useState({
    date: '',
    designation: '',
    equipmentType: '',
    entite: '',
    secteurReseau: '',
    centreEspace: '',
    action: '', // Ajout d'un champ pour l'action
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovements();
  }, []);

  const fetchMovements = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api-ango.vercel.app/api/v1/movements');
      setMovements(response.data.data);
    } catch (error) {
      console.error('Error fetching movements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovement({ ...newMovement, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`https://api-ango.vercel.app/api/v1/movements/${editingId}`, newMovement);
      } else {
        await axios.post('https://api-ango.vercel.app/api/v1/movements', newMovement);
      }
      fetchMovements();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving movement:', error);
    }
  };

  const handleEdit = (id) => {
    const movementToEdit = movements.find((movement) => movement.id === id);
    setNewMovement(movementToEdit);
    setIsEditing(true);
    setEditingId(id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api-ango.vercel.app/api/v1/movements/${id}`);
      fetchMovements();
    } catch (error) {
      console.error('Error deleting movement:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewMovement({
      date: '',
      designation: '',
      equipmentType: '',
      entite: '',
      secteurReseau: '',
      centreEspace: '',
      action: '', // Remise à zéro de l'action
    });
    setIsEditing(false);
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(movements);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Mouvements');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'mouvements.xlsx');
  };

  return (
    <Container>
      <h1>Mouvement des Ordinateurs</h1>
      <Button onClick={() => setShowModal(true)}>Ajouter Mouvement</Button>
      <Button variant="success" onClick={handleExportToExcel}>Exporter en Excel</Button>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Désignation</th>
              <th>Type d'équipement</th>
              <th>Entité</th>
              <th>Secteur Réseau</th>
              <th>Centre/Espace</th>
              <th>Action</th> {/* Nouvelle colonne pour l'action */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <tr key={movement.id}>
                <td>{movement.date}</td>
                <td>{movement.designation}</td>
                <td>{movement.equipmentType}</td>
                <td>{movement.entite}</td>
                <td>{movement.secteurReseau}</td>
                <td>{movement.centreEspace}</td>
                <td>{movement.action}</td> {/* Affichage de l'action */}
                <td>
                  <Button variant="warning" onClick={() => handleEdit(movement.id)}>
                    <FaEdit />
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(movement.id)}>
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Modifier Mouvement' : 'Ajouter Mouvement'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" value={newMovement.date} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Désignation</Form.Label>
              <Form.Control type="text" name="designation" value={newMovement.designation} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Type d'équipement</Form.Label>
              <Form.Control type="text" name="equipmentType" value={newMovement.equipmentType} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Action</Form.Label> {/* Ajout d'un champ pour l'action */}
              <Form.Control type="text" name="action" value={newMovement.action} onChange={handleInputChange} required />
            </Form.Group>
            <Button type="submit">{isEditing ? 'Modifier' : 'Ajouter'}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Mouvement;

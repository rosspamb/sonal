

import React, { useState } from 'react';
import { Container, Card, Button, Row, Col, Form, Table, Modal } from 'react-bootstrap';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const equipmentOptions = [
  { value: 'Ordinateur', label: 'Ordinateur' },
  { value: 'Imprimante', label: 'Imprimante' },
  { value: 'Routeur', label: 'Routeur' },
  { value: 'Modem', label: 'Modem' },
  { value: 'Onduleur', label: 'Onduleur' },
  { value: 'Antivirus', label: 'Antivirus' },
  { value: 'Autres terminaux', label: 'Autres terminaux' },
];

const entityOptions = [
  { value: 'Kinshasa', label: 'Kinshasa' },
  { value: 'Kongo central', label: 'Kongo central' },
];

const directionOptions = [
  { value: 'Technique', label: 'Technique' },
  { value: 'Commerciale', label: 'Commerciale' },
];

const secteurReseauOptions = [
  { value: 'Funa', label: 'Funa' },
  { value: 'Lukunga', label: 'Lukunga' },
  { value: 'Mont-Amba', label: 'Mont-Amba' },
  { value: 'Tshangu', label: 'Tshangu' },
];

const centresEspacesOptions = [
  { value: 'Agence Barumbu (30)', label: 'Agence Barumbu (30)' },
  { value: 'Agence Bumbu-Selembao (31)', label: 'Agence Bumbu-Selembao (31)' },
  { value: 'Agence Cité-Verte (32)', label: 'Agence Cité-Verte (32)' },
  { value: 'Agence Gombe (33)', label: 'Agence Gombe (33)' },
  { value: 'Agence Ngiri-Ngiri (34)', label: 'Agence Ngiri-Ngiri (34)' },
  { value: 'Agence Intendance (35)', label: 'Agence Intendance (35)' },
  { value: 'Agence Jamaïque (36)', label: 'Agence Jamaïque (36)' },
  { value: 'Agence Kimbanseke (37)', label: 'Agence Kimbanseke (37)' },
  { value: 'Agence Kalamu (38)', label: 'Agence Kalamu (38)' },
  { value: 'Agence Lemba (39)', label: 'Agence Lemba (39)' },
  { value: 'Agence Limete-Kingabwa (40)', label: 'Agence Limete-Kingabwa (40)' },
  { value: 'Agence Masina (41)', label: 'Agence Masina (41)' },
  { value: 'Agence Makala (42)', label: 'Agence Makala (42)' },
  { value: 'Agence Matete (43)', label: 'Agence Matete (43)' },
  { value: 'Agence Ndjili (44)', label: 'Agence Ndjili (44)' },
  { value: 'Agence Ngaliema', label: 'Agence Ngaliema' },
  { value: 'Agence Pétro-Congo', label: 'Agence Pétro-Congo' },
  { value: 'Agence Pompage (47)', label: 'Agence Pompage (47)' },
  { value: 'Agence Rond-Point Ngaba (48)', label: 'Agence Rond-Point Ngaba (48)' },
  { value: 'Agence Yolo-Kapela (49)', label: 'Agence Yolo-Kapela (49)' },
  { value: 'Agence Mikondo', label: 'Agence Mikondo' },
  { value: 'Espace Principal (51)', label: 'Espace Principal (51)' },
  { value: 'Espace Victoire (52)', label: 'Espace Victoire (52)' },
  { value: 'Espace Ndjili (53)', label: 'Espace Ndjili (53)' },
  { value: 'Espace Lemba (54)', label: 'Espace Lemba (54)' },
  { value: 'Espace Delvaux (55)', label: 'Espace Delvaux (55)' },
  { value: 'Espace Masina (56)', label: 'Espace Masina (56)' },
  { value: 'Espace Limete (57)', label: 'Espace Limete (57)' },
  { value: 'Espace Bandal (58)', label: 'Espace Bandal (58)' },
  { value: 'Espace Cité-Verte (59)', label: 'Espace Cité-Verte (59)' },
  { value: 'Espace Pompage 1 (60)', label: 'Espace Pompage 1 (60)' },
  { value: 'Espace Matete Ngilima (61)', label: 'Espace Matete Ngilima (61)' },
  { value: 'Espace Kasaï (62)', label: 'Espace Kasaï (62)' },
  { value: 'Espace Jamaïque (63)', label: 'Espace Jamaïque (63)' },
  { value: 'Espace Zoo (64)', label: 'Espace Zoo (64)' },
  { value: 'Espace Ngufu (65)', label: 'Espace Ngufu (65)' },
  { value: 'Espace Pascal (66)', label: 'Espace Pascal (66)' },
  { value: 'Espace Ngiri-Ngiri (67)', label: 'Espace Ngiri-Ngiri (67)' },
  { value: 'Espace Bosobolo (68)', label: 'Espace Bosobolo (68)' },
  { value: 'Espace Mpudi (69)', label: 'Espace Mpudi (69)' },
  { value: 'Espace Mikondo (70)', label: 'Espace Mikondo (70)' },
  { value: 'Espace Pétro-Congo', label: 'Espace Pétro-Congo' },
  { value: 'Espace Super-Lemba (72)', label: 'Espace Super-Lemba (72)' },
  { value: 'Espace Salongo (73)', label: 'Espace Salongo (73)' },
  { value: 'Espace PLR Matadi 2 (74)', label: 'Espace PLR Matadi 2 (74)' },
  { value: 'Espace UPN (75)', label: 'Espace UPN (75)' },
  { value: 'Espace M-Liberté (76)', label: 'Espace M-Liberté (76)' },
  { value: 'Espace PLR Lubumbashi (77)', label: 'Espace PLR Lubumbashi (77)' },
  { value: 'Espace Mokali (78)', label: 'Espace Mokali (78)' },
  { value: 'Espace Bumbu 2 (79)', label: 'Espace Bumbu 2 (79)' },
  { value: 'Espace Bandal 2 (80)', label: 'Espace Bandal 2 (80)' },
  { value: 'Espace Bumbu-S (81)', label: 'Espace Bumbu-S (81)' },
  { value: 'Espace Assossa (82)', label: 'Espace Assossa (82)' },
  { value: 'Espace PLR Matadi 1 (83)', label: 'Espace PLR Matadi 1 (83)' },
  { value: 'Espace M-Liberté 2 (84)', label: 'Espace M-Liberté 2 (84)' },
  { value: 'Espace PLR Kisangani 1 (85)', label: 'Espace PLR Kisangani 1 (85)' },
  { value: 'Espace Kianza (86)', label: 'Espace Kianza (86)' },
  { value: 'Espace Makala (87)', label: 'Espace Makala (87)' },
  { value: 'Espace Bandal 3 (Gulf) (88)', label: 'Espace Bandal 3 (Gulf) (88)' },
  { value: 'Espace 24 Novembre (89)', label: 'Espace 24 Novembre (89)' },
  { value: 'Espace PLR Ngaliema (90)', label: 'Espace PLR Ngaliema (90)' },
  { value: 'Espace Kintambo-Mag (91)', label: 'Espace Kintambo-Mag (91)' },
  { value: 'Espace Matadi-Kibala', label: 'Espace Matadi-Kibala' },
  { value: 'Espace Ndjili Q/8 (93)', label: 'Espace Ndjili Q/8 (93)' },
  { value: 'Espace PLR Boma (94)', label: 'Espace PLR Boma (94)' },
  { value: 'Espace PLR Kasaï 1 (95)', label: 'Espace PLR Kasaï 1 (95)' },
  { value: 'Espace PLR Kimbanseke 2 (96)', label: 'Espace PLR Kimbanseke 2 (96)' },
  { value: 'Espace Ezo (97)', label: 'Espace Ezo (97)' },
  { value: 'Espace PLR Bongolo (98)', label: 'Espace PLR Bongolo (98)' },
  { value: 'Espace Barumbu 2 (99)', label: 'Espace Barumbu 2 (99)' },
  { value: 'Espace Gombe VIP 2 (100)', label: 'Espace Gombe VIP 2 (100)' },
  { value: 'Espace Yolo-Kapela 2 (101)', label: 'Espace Yolo-Kapela 2 (101)' },
  { value: 'Espace Fikin 2 (102)', label: 'Espace Fikin 2 (102)' },
  { value: 'Espace Ngaba 2 (103)', label: 'Espace Ngaba 2 (103)' },
  { value: 'Espace PLR Badiadingi (104)', label: 'Espace PLR Badiadingi (104)' },
  { value: 'Espace Mokali 2 (105)', label: 'Espace Mokali 2 (105)' },
  { value: 'Espace PLR Sola (106)', label: 'Espace PLR Sola (106)' },
  { value: 'Espace PLR UPN 2 (107)', label: 'Espace PLR UPN 2 (107)' },
  { value: 'Espace PLR Huileries (108)', label: 'Espace PLR Huileries (108)' },
  { value: 'Espace PLR Bld Luemba (109)', label: 'Espace PLR Bld Luemba (109)' },
  { value: 'Espace PLR Oshwe (110)', label: 'Espace PLR Oshwe (110)' },
  { value: 'Espace MBJ Kananga (111)', label: 'Espace MBJ Kananga (111)' },
  { value: 'Espace PLR Indépendance (112)', label: 'Espace PLR Indépendance (112)' },
  { value: 'Espace PLR Intendance (113)', label: 'Espace PLR Intendance (113)' },
  { value: 'Espace PLR Moanda', label: 'Espace PLR Moanda' },
  { value: 'Espace PLR Mbudi (115)', label: 'Espace PLR Mbudi (115)' },
  { value: 'Espace PLR Mont-Ngafula (116)', label: 'Espace PLR Mont-Ngafula (116)' },
  { value: 'Espace PLR Kasa-Vubu (117)', label: 'Espace PLR Kasa-Vubu (117)' },
  { value: 'Espace PLR Likasi (118)', label: 'Espace PLR Likasi (118)' },
  { value: 'Espace PLR Katuba (119)', label: 'Espace PLR Katuba (119)' },
  { value: 'Espace PLR Matshikisha (120)', label: 'Espace PLR Matshikisha (120)' },
  { value: 'Espace PLR Bakwadianga (121)', label: 'Espace PLR Bakwadianga (121)' },
  { value: 'Espace PLR Bandal 4 (122)', label: 'Espace PLR Bandal 4 (122)' },
  { value: 'Journal Sport-Turf (144)', label: 'Journal Sport-Turf (144)' },
  { value: 'Chargé des Provinces (145)', label: 'Chargé des Provinces (145)' },
  { value: 'Coordination ALR (152)', label: 'Coordination ALR (152)' },
  { value: 'Coordination PLR (153)', label: 'Coordination PLR (153)' },
  { value: 'Coordination Pari Sportif (154)', label: 'Coordination Pari Sportif (154)' },
  { value: 'Coordination Grattage (155)', label: 'Coordination Grattage (155)' },
  { value: 'Coordination Autre Produit (156)', label: 'Coordination Autre Produit (156)' },
  { value: 'Télex (161)', label: 'Télex (161)' },
  { value: 'Bureau D.C.M. (163)', label: 'Bureau D.C.M. (163)' },
  { value: 'Espace PLR Mapela (168)', label: 'Espace PLR Mapela (168)' },
  { value: 'Espace PLR Kinseso 3', label: 'Espace PLR Kinseso 3' },
  { value: 'Espace PLR Maluku / Makala 3', label: 'Espace PLR Maluku / Makala 3' },
  { value: 'Espace Camp Luka (174)', label: 'Espace Camp Luka (174)' },
  { value: 'Espace PLR Abattoir (178)', label: 'Espace PLR Abattoir (178)' },
  { value: 'Espace PLR Kimbuta (179)', label: 'Espace PLR Kimbuta (179)' },
  { value: 'Espace PLR Bibwa (180)', label: 'Espace PLR Bibwa (180)' },
  { value: 'Espace PLR Maluku (181)', label: 'Espace PLR Maluku (181)' },
  { value: 'Espace PLR Plazza (182)', label: 'Espace PLR Plazza (182)' },
  { value: 'Espace PLR Suzanela (183)', label: 'Espace PLR Suzanela (183)' },
  { value: 'Espace PLR Mombele (184)', label: 'Espace PLR Mombele (184)' },
  { value: 'Espace PLR Malweka', label: 'Espace PLR Malweka' },
  { value: 'Agence Kinkole', label: 'Agence Kinkole' },
];

const Ordinateur = () => {
  const [computers, setComputers] = useState([
    { id: 1, marque: 'Dell', type: 'Laptop', processeur: 'Intel i7', disqueDur: '1TB SSD', memoire: '16GB', dateAchat: '2023-01-15', numSerie: 'ABC123', entite: 'Kinshasa', direction: 'Technique', secteurReseau: 'Funa', centreEspace: 'Agence Barumbu (30)' },
    { id: 2, marque: 'HP', type: 'Desktop', processeur: 'AMD Ryzen 5', disqueDur: '2TB HDD', memoire: '32GB', dateAchat: '2022-11-30', numSerie: 'DEF456', entite: 'Kongo central', direction: 'Commerciale', secteurReseau: 'Lukunga', centreEspace: 'Agence Gombe (33)' },
    { id: 3, marque: 'Lenovo', type: 'Laptop', processeur: 'Intel i5', disqueDur: '512GB SSD', memoire: '8GB', dateAchat: '2023-03-22', numSerie: 'GHI789', entite: 'Kinshasa', direction: 'Technique', secteurReseau: 'Mont-Amba', centreEspace: 'Agence Lemba (39)' },
  ]);
  
  const [newComputer, setNewComputer] = useState({
    marque: '',
    type: '',
    processeur: '',
    disqueDur: '',
    memoire: '',
    dateAchat: '',
    numSerie: '',
    equipmentType: null,
    entite: null,
    direction: null,
    secteurReseau: null,
    centreEspace: null
  });

  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComputer({ ...newComputer, [name]: value });
  };

  const handleEquipmentTypeChange = (selectedOption) => {
    setNewComputer({ ...newComputer, equipmentType: selectedOption });
  };

  const handleEntityChange = (selectedOption) => {
    setNewComputer({ ...newComputer, entite: selectedOption });
  };

  const handleDirectionChange = (selectedOption) => {
    setNewComputer({ ...newComputer, direction: selectedOption });
  };

  const handleSecteurReseauChange = (selectedOption) => {
    setNewComputer({ ...newComputer, secteurReseau: selectedOption });
  };

  const handleCentreEspaceChange = (selectedOption) => {
    setNewComputer({ ...newComputer, centreEspace: selectedOption });
  };

  const addComputer = () => {
    if (newComputer.marque && newComputer.dateAchat && newComputer.numSerie && newComputer.equipmentType && newComputer.entite && newComputer.direction && newComputer.secteurReseau && newComputer.centreEspace) {
      const newId = computers.length ? computers[computers.length - 1].id + 1 : 1;
      setComputers([...computers, { 
        id: newId, 
        ...newComputer, 
        equipmentType: newComputer.equipmentType.value, 
        entite: newComputer.entite.value,
        direction: newComputer.direction.value,
        secteurReseau: newComputer.secteurReseau.value,
        centreEspace: newComputer.centreEspace.value
      }]);
      setNewComputer({ marque: '', type: '', processeur: '', disqueDur: '', memoire: '', dateAchat: '', numSerie: '', equipmentType: null, entite: null, direction: null, secteurReseau: null, centreEspace: null });
      setShowModal(false);
    } else {
      alert("Veuillez remplir tous les champs obligatoires (Marque, Date d'achat, N° Série, Type d'équipement, Entité, Direction, Secteur-Réseau, Centre/Espace).");
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
      <h1 className="text-center mb-4">Identification des équipements informatiques</h1>
      <Row>
        <Col>
          {/* <h2>Liste des équipements informatiques</h2> */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className='text-xs'>ID</th>
                <th className='text-xs'>Marque</th>
                <th className='text-xs'>Type</th>
                <th className='text-xs'>Processeur</th>
                <th className='text-xs'>Disque Dur</th>
                <th className='text-xs'>Mémoire</th>
                <th className='text-xs'>Date d'achat</th>
                <th className='text-xs'>N° Série</th>
                <th className='text-xs'>Type d'équipement</th>
                <th className='text-xs'>Entité</th>
                <th className='text-xs'>Direction</th>
                <th className='text-xs'>Secteur-Réseau</th>
                <th className='text-xs'>Centre/Espace</th>
                <th className='text-xs'>Actions</th>
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
                  <td>{computer.equipmentType}</td>
                  <td>{computer.entite}</td>
                  <td>{computer.direction}</td>
                  <td>{computer.secteurReseau}</td>
                  <td>{computer.centreEspace}</td>
                  <td>
                  <Button variant="link" className="p-0 me-2" title="Modifier">
            <FaEdit className="text-primary" />
          </Button>
          <Button variant="link" className="p-0" title="Supprimer">
            <FaTrashAlt className="text-danger" />
          </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="success" onClick={handleShowModal} className="me-2">Ajouter un équipement</Button>
          <Button variant="primary" onClick={exportToExcel}>Exporter vers Excel</Button>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un équipement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Marque *</Form.Label>
                  <Form.Control type="text" name="marque" value={newComputer.marque} onChange={handleInputChange} placeholder="Entrez la marque" required />
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
                  <Form.Label>Date d'achat *</Form.Label>
                  <Form.Control type="date" name="dateAchat" value={newComputer.dateAchat} onChange={handleInputChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>N° Série *</Form.Label>
                  <Form.Control type="text" name="numSerie" value={newComputer.numSerie} onChange={handleInputChange} placeholder="Entrez le numéro de série" required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Type d'équipement *</Form.Label>
                  <Select
                    value={newComputer.equipmentType}
                    onChange={handleEquipmentTypeChange}
                    options={equipmentOptions}
                    placeholder="Sélectionnez un type d'équipement"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Entité *</Form.Label>
                  <Select
                    value={newComputer.entite}
                    onChange={handleEntityChange}
                    options={entityOptions}
                    placeholder="Sélectionnez une entité"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Direction *</Form.Label>
                  <Select
                    value={newComputer.direction}
                    onChange={handleDirectionChange}
                    options={directionOptions}
                    placeholder="Sélectionnez une direction"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Secteur-Réseau *</Form.Label>
                  <Select
                    value={newComputer.secteurReseau}
                    onChange={handleSecteurReseauChange}
                    options={secteurReseauOptions}
                    placeholder="Sélectionnez un secteur-réseau"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Centre/Espace *</Form.Label>
                  <Select
                    value={newComputer.centreEspace}
                    onChange={handleCentreEspaceChange}
                    options={centresEspacesOptions}
                    placeholder="Sélectionnez un centre/espace"
                  />
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
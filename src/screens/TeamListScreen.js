import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory, Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";

import {
  Table,
  Button,
  Row,
  Col,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  listTeams,
  deleteTeam,
  createTeam,
  listTeamDetails,
} from "../actions/teamActions";

const TeamListScreen = () => {
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const teamList = useSelector((state) => state.teamList);
  const { loading, error, teams } = teamList;

  const teamDelete = useSelector((state) => state.teamDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = teamDelete;

  const teamCreate = useSelector((state) => state.teamCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    team: createdTeam,
  } = teamCreate;

  useEffect(() => {
    dispatch(listTeams());
  }, [dispatch, successDelete, successCreate, createdTeam]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTeam(id));
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const createTeamHandler = () => {
    dispatch(
      createTeam({
        name,
        description,
      })
    );
  };

  const editTeams = (team) => {
    dispatch(listTeamDetails(team));
    history.push(`/teams/${team.id}/edit`);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col className="text-right">
          <h1>Teams</h1>
          <Button className="my-3" onClick={handleShowModal}>
            <i className="fas fa-plus"></i> Create Team
          </Button>
          <Modal
            backdrop="static"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModal}
            onHide={handleCloseModal}
          >
            {" "}
            <Modal.Header closeButton>
              <Modal.Title>Create Team</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required="true"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Enter team name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    placeholder="Enter team description"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={createTeamHandler}>
                Create
              </Button>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className="table-sm text-center"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Logo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id}>
                <td>{team.id}</td>
                <td>{team.name}</td>
                <td>{team.description}</td>
                <td>{team.created_at}</td>
                <td>{team.updated_at}</td>
                <td>{team.logo}</td>

                <td>
                  {/* <Link to={`/teams/${team.id}/edit`}> */}
                  <Button
                    onClick={() => editTeams(team)}
                    variant="light"
                    className="btn-sm"
                  >
                    <i className="fas fa-edit"></i>
                  </Button>
                  {/* </Link> */}

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(team.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default TeamListScreen;
